# Pneumonia Detection Using Chest X-Rays

A React web application backed by a Flask API that classifies chest X-ray images as **PNEUMONIA** or **NORMAL** using an EfficientNet model. Pneumonia predictions include a Grad-CAM heatmap.

## Project layout

- `web_application/app.py` — Flask prediction and account API
- `web_application/frontend/` — React user interface
- `web_application/requirements.txt` — Python dependencies
- `implementation.ipynb` — model-development notebook
- `chest_xray/` — local dataset (not included in Git)

## Model file

The trained model is intentionally excluded from Git. Place the `pneumoniaEfficientNet.keras` model file at `web_application/pneumoniaEfficientNet.keras` before starting the API or Docker Compose. The dataset, local virtual environments, Node dependencies, and model weights are ignored by Git.

## Run with Docker Compose

Install Docker Desktop, add the model file described above, and run from the repository root:

```sh
docker compose up --build
```

Open the frontend at <http://localhost:3002>. The Flask API is available at <http://localhost:5001>; MongoDB data is persisted in the `mongodb_data` volume. These host ports avoid common local development server defaults. Stop the services with `docker compose down`.

## Run locally

### Backend

Use Python 3.11, install the model file, then from the repository root:

```sh
python -m venv web_application/.venv
# Activate the environment, then:
python -m pip install -r web_application/requirements.txt
cd web_application
python app.py
```

The API expects MongoDB at `mongodb://localhost:27017` by default. Override `MONGODB_URI` to use another MongoDB instance. `CORS_ORIGINS` accepts a comma-separated list of allowed browser origins. The frontend defaults to the API at `http://127.0.0.1:5000`; set `REACT_APP_API_BASE_URL` before starting it to change that URL.

### Frontend

In another terminal:

```sh
cd web_application/frontend
npm ci
npm start
```

The React development server runs at <http://localhost:3000> and connects to the API at `http://127.0.0.1:5000` by default. If those ports are in use, set `REACT_APP_API_BASE_URL` to the API's host URL and use the alternative port printed by the React development server.
