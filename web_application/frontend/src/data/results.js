export const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";
export const apiUrl = `${apiBaseUrl}/predict`;

export const models = [
  { name: "Basic CNN", accuracy: 0.84, pneumoniaRecall: 0.98, normalRecall: 0.60, size: "Small", best: false },
  { name: "ResNet-50", accuracy: 0.80, pneumoniaRecall: 0.99, normalRecall: 0.49, size: "Large", best: false },
  { name: "EfficientNet-B0", accuracy: 0.86, pneumoniaRecall: 0.95, normalRecall: 0.70, size: "Smallest", best: true }
];

export const tuning = [
  { name: "Basic CNN", before: 0.84, after: 0.84 },
  { name: "ResNet-50", before: 0.82, after: 0.80},
  { name: "EfficientNet-B0", before: 0.79, after: 0.86 }
];
