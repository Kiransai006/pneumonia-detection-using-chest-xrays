import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Basic CNN", Normal: 0.60, Pneumonia: 0.98 },
  { name: "ResNet-50", Normal: 0.49, Pneumonia: 0.99 },
  { name: "EfficientNet-B0", Normal: 0.70, Pneumonia: 0.95 }
];

export default function RecallChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 1]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Normal" fill="#34c77b" radius={[6, 6, 0, 0]} />
        <Bar dataKey="Pneumonia" fill="#2563eb" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}