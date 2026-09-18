import { models } from "../data/results.js";

export default function ComparisonTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Model</th>
          <th>Accuracy</th>
          <th>Pneumonia recall</th>
          <th>Normal recall</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        {models.map((model) => (
          <tr key={model.name} className={model.best ? "best" : ""}>
            <td>{model.name}{model.best && <span className="tag">BEST</span>}</td>
            <td>{model.accuracy.toFixed(2)}</td>
            <td>{model.pneumoniaRecall.toFixed(2)}</td>
            <td>{model.normalRecall.toFixed(2)}</td>
            <td>{model.size}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
