export default function StatCard({ label, value, small }) {
  return (
    <div className="statCard">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className="small">{small}</div>
    </div>
  );
}
