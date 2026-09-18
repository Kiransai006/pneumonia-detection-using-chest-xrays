import RecallChart from "../components/RecallChart.jsx";
import SizeChart from "../components/SizeChart.jsx";
import ConfusionMatrix from "../components/ConfusionMatrix.jsx";

export default function AnalysisPage() {
  return (
    <div>
      <div className="pageTitle">Analysis</div>
      <div className="pageSub">A deeper look at how the models performed.</div>

      <div className="card">
        <div className="sectionTitle">Recall for each class</div>
        <RecallChart />
        <p className="note">All models catch pneumonia well, but they are weaker on normal images.</p>
      </div>

      <div className="card">
        <div className="sectionTitle">Model size (million parameters)</div>
        <SizeChart />
        <p className="note">EfficientNet-B0 is the smallest model and still gives the best accuracy.</p>
      </div>

      <div className="card">
        <div className="sectionTitle">Confusion matrix (EfficientNet-B0)</div>
        <ConfusionMatrix />
        <p className="note">Out of 624 test images, the model was correct on 535 of them.</p>
      </div>
    </div>
  );
}