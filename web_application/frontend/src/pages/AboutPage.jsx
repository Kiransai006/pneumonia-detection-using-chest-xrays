export default function AboutPage() {
  return (
    <div>
      <div className="pageTitle">About This Project</div>
      <div className="pageSub">How the pneumonia detection system works.</div>

      <div className="card">
        <div className="sectionTitle">What it does</div>
        <p className="aboutText">
          This project uses deep learning to look at a chest X-ray image and predict whether it shows
          signs of pneumonia or looks normal. The goal is to support doctors by giving a fast first
          opinion, especially in places where there are not enough radiologists to check every X-ray quickly.
        </p>
      </div>

      <div className="card">
        <div className="sectionTitle">The dataset</div>
        <p className="aboutText">
          The models were trained on a public chest X-ray dataset based on the well known Kermany dataset,
          with 5,216 training images and 624 test images. Each image is labelled as either normal or pneumonia.
        </p>
      </div>

      <div className="card">
        <div className="sectionTitle">The models</div>
        <p className="aboutText">
          Three deep learning models were built and compared: a basic CNN made from scratch, ResNet-50,
          and EfficientNet-B0. The last two use transfer learning, which means they were first trained on
          millions of everyday images and then fine-tuned on chest X-rays. After fine-tuning, EfficientNet-B0
          gave the best accuracy while being the smallest and fastest model, so it is the one used in this app.
        </p>
      </div>

      <div className="card">
        <div className="sectionTitle">How a prediction is made</div>
        <ol className="steps">
          <li>The uploaded image is resized to 224 by 224 pixels.</li>
          <li>The pixels are prepared the same way the model was trained.</li>
          <li>The EfficientNet-B0 model gives a score between 0 and 1.</li>
          <li>A score above 0.5 is shown as pneumonia, otherwise it is shown as normal.</li>
        </ol>
      </div>

      <p className="note">This tool is for educational purposes only and is not a medical diagnosis.</p>
    </div>
  );
}