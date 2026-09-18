import StatCard from "../components/StatCard.jsx";
import AccuracyChart from "../components/AccuracyChart.jsx";
import TuningChart from "../components/TuningChart.jsx";
import ComparisonTable from "../components/ComparisonTable.jsx";

export default function PerformancePage() {
  return (
    <div>
      <div className="pageTitle">Model Performance</div>
      <div className="pageSub">Comparison of three deep learning models on the chest X-ray test set (624 images).</div>

      <div className="statGrid">
        <StatCard label="Best Model" value="EfficientNet-B0" small="after fine-tuning" />
        <StatCard label="Best Accuracy" value="86%" small="on 624 test images" />
        <StatCard label="Test Images" value="624" small="Normal + Pneumonia" />
      </div>

      <div className="card">
        <div className="sectionTitle">Final accuracy of each model</div>
        <AccuracyChart />
      </div>

      <div className="card">
        <div className="sectionTitle">Accuracy before and after fine-tuning</div>
        <TuningChart />
      </div>

      <div className="card">
        <div className="sectionTitle">Full results</div>
        <ComparisonTable />
      </div>

      <p className="note">EfficientNet-B0 gives the best overall accuracy while being the smallest and fastest model.</p>
    </div>
  );
}