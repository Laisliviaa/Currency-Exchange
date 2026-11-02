import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

const tick = { fill: "var(--muted)", fontSize: 12 };

export default function RateChart({ t, data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={tick} stroke="var(--border)" />
        <YAxis domain={["auto", "auto"]} tick={tick} stroke="var(--border)" />
        <Tooltip
          contentStyle={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            color: "var(--text)",
          }}
          labelStyle={{ color: "var(--muted)" }}
        />
        <Line
          type="monotone"
          dataKey="rate"
          name={t.table.rate}
          stroke="var(--accent)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
