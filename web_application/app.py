import base64
import io
import os

import matplotlib.cm as cm
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from tensorflow.keras.applications.efficientnet import preprocess_input
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

cors_origins = os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",")
CORS(app, origins=[origin.strip() for origin in cors_origins])

client = MongoClient(os.environ.get("MONGODB_URI", "mongodb://localhost:27017"))
db = client["pneumoniaApp"]
usersCollection = db["users"]


pneumoniaModel = tf.keras.models.load_model("pneumoniaEfficientNet.keras")
baseModel = pneumoniaModel.layers[0]
convModel = tf.keras.models.Model(baseModel.input, baseModel.output)
headLayers = pneumoniaModel.layers[1:]



@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"success": False, "message": "Please fill all the fields"})
    if usersCollection.find_one({"username": username}):
        return jsonify({"success": False, "message": "Username already exists"})
    usersCollection.insert_one({"username": username, "password": generate_password_hash(password)})
    return jsonify({"success": True, "message": "Account created"})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = usersCollection.find_one({"username": username})
    if user and check_password_hash(user["password"], password):
        return jsonify({"success": True})
    return jsonify({"success": False, "message": "Wrong username or password"})


def makeHeatmap(imgArray):
    with tf.GradientTape() as tape:
        convOutput = convModel(imgArray)
        tape.watch(convOutput)
        x = convOutput
        for layer in headLayers:
            x = layer(x)
        loss = x[:, 0]
    grads = tape.gradient(loss, convOutput)
    pooledGrads = tf.reduce_mean(grads, axis=(0, 1, 2))
    heatmap = tf.reduce_sum(convOutput[0] * pooledGrads, axis=-1)
    heatmap = tf.maximum(heatmap, 0) / (tf.reduce_max(heatmap) + 1e-8)
    return heatmap.numpy()

def overlay(img, heatmap):
    heatmapImg = Image.fromarray((heatmap * 255).astype("uint8")).resize((224, 224))
    colored = cm.jet(np.array(heatmapImg) / 255.0)[..., :3]
    original = np.array(img).astype("float32") / 255.0
    mixed = ((0.5 * original + 0.5 * colored) * 255).astype("uint8")
    buf = io.BytesIO()
    Image.fromarray(mixed).save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"})

    imageFile = request.files["image"]
    img = Image.open(io.BytesIO(imageFile.read())).convert("RGB").resize((224, 224))
    imgArray = np.expand_dims(preprocess_input(np.array(img).astype("float32")), axis=0)

    prob = float(pneumoniaModel.predict(imgArray)[0][0])
    label = "PNEUMONIA" if prob > 0.5 else "NORMAL"
    confidence = prob if prob > 0.5 else 1 - prob
    lowConfidence = confidence < 0.6

    heatmap = None
    if label == "PNEUMONIA":
        heatmap = overlay(img, makeHeatmap(imgArray))

    return jsonify({
        "label": label,
        "confidence": round(confidence * 100, 2),
        "lowConfidence": lowConfidence,
        "heatmap": heatmap
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)