import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { tuning } from "../data/results.js";

export default function TuningChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={tuning}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 1]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="before" name="Before fine-tuning" fill="#c3cfe2" radius={[6, 6, 0, 0]} />
        <Bar dataKey="after" name="After fine-tuning" fill="#2563eb" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
