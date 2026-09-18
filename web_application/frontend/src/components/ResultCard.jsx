export default function ResultCard({ result }) {
  const isPneumonia = result.label === "PNEUMONIA";
  const cardClass = "result " + (isPneumonia ? "pneumonia" : "normal");

  return (
    <div className={cardClass} style={{ display: "block", maxWidth: "460px", margin: "20px auto 0" }}>
      <h2>{isPneumonia ? "Pneumonia Detected" : "Normal"}</h2>
    {isPneumonia && (
  <>
    <div className="barOuter"><div className="barInner" style={{ width: result.confidence + "%" }}></div></div>
    <p className="conf">Confidence: {result.confidence}%</p>
  </>
)}

      {result.lowConfidence && (
        <p className="conf" style={{ color: "#d63b40" }}>
          The model is not very confident about this result, please check it carefully.
        </p>
      )}

      {result.heatmap && (
        <div className="heatmapBox">
          <p className="heatmapLabel">Grad-CAM: the red areas show where the model looked</p>
          <img src={result.heatmap} alt="grad-cam" />
        </div>
      )}
    </div>
  );
}