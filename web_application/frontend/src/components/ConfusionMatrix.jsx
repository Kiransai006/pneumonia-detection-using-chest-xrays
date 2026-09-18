const matrix = [
  { label: "True Negative", value: 163, sub: "Normal predicted Normal", type: "good" },
  { label: "False Positive", value: 71, sub: "Normal predicted Pneumonia", type: "bad" },
  { label: "False Negative", value: 18, sub: "Pneumonia predicted Normal", type: "bad" },
  { label: "True Positive", value: 372, sub: "Pneumonia predicted Pneumonia", type: "good" }
];

export default function ConfusionMatrix() {
  return (
    <div className="cmGrid">
      {matrix.map((cell, index) => (
        <div key={index} className={"cmCell " + (cell.type === "good" ? "cmGood" : "cmBad")}>
          <div className="cmValue">{cell.value}</div>
          <div className="cmLabel">{cell.label}</div>
          <div className="cmSub">{cell.sub}</div>
        </div>
      ))}
    </div>
  );
}