import { useState } from "react";
import UploadCard from "../components/UploadCard.jsx";
import ResultCard from "../components/ResultCard.jsx";
import HistoryList from "../components/HistoryList.jsx";
import { apiUrl } from "../data/results.js";

export default function DetectPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  function handleAnalyze(file, previewUrl) {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    fetch(apiUrl, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error) { alert(data.error); return; }
        setResult(data);
        setHistory((prev) => [{ label: data.label, confidence: data.confidence, previewUrl }, ...prev]);
      })
      .catch(() => {
        setLoading(false);
        alert("Something went wrong. Is the backend running?");
      });
  }

  return (
    <div>
      <div className="hero">
        <h1>Chest X-ray Pneumonia Detection</h1>
        <p>Upload a chest X-ray and an AI model will check it for signs of pneumonia in a few seconds.</p>
      </div>

      <UploadCard onAnalyze={handleAnalyze} loading={loading} />
      {result && <ResultCard result={result} />}
      {history.length > 0 && <HistoryList history={history} />}
    </div>
  );
}