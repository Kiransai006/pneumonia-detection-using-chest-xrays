import { useState } from "react";

export default function UploadCard({ onAnalyze, loading }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  function handleChange(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  return (
    <div className="card detectCard">
      <label className="drop" htmlFor="fileInput">
        <div className="dropIcon">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16V4" />
            <path d="M7 9l5-5 5 5" />
            <path d="M4 20h16" />
          </svg>
        </div>
        <span>Click to choose a chest X-ray image</span>
        <input type="file" id="fileInput" accept="image/*" hidden onChange={handleChange} />
      </label>

      {previewUrl && <img id="preview" src={previewUrl} alt="preview" style={{ display: "block" }} />}

      <button className="btn" disabled={!selectedFile || loading} onClick={() => onAnalyze(selectedFile, previewUrl)}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <p className="note">Model: EfficientNet-B0 (fine-tuned)</p>
    </div>
  );
}