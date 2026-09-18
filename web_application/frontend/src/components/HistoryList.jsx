export default function HistoryList({ history }) {
  return (
    <div className="card historyCard">
      <div className="sectionTitle">Recent checks</div>
      <div className="historyList">
        {history.map((item, index) => (
          <div className="historyItem" key={index}>
            <img src={item.previewUrl} alt="x-ray" />
            <div className="historyInfo">
              <span className={"pill " + (item.label === "PNEUMONIA" ? "pillRed" : "pillGreen")}>
                {item.label === "PNEUMONIA" ? "Pneumonia" : "Normal"}
              </span>
              <span className="historyConf">{item.confidence}% confidence</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}