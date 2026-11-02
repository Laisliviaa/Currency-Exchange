import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RateChart({ data }) {
  // Função para converter "YYYY-MM-DD" para "DD/MM/YY"
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    if (!year || !month || !day) return dateStr;
    return `${day}/${month}/${year.slice(-2)}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis 
          dataKey="date" 
          tickFormatter={formatDate}
          stroke="var(--text-muted, #64748b)"
          fontSize={12}
        />
        <YAxis 
          domain={["auto", "auto"]} 
          stroke="var(--text-muted, #64748b)"
          fontSize={12}
        />
        <Tooltip 
          labelFormatter={(label) => `Data: ${formatDate(label)}`}
          contentStyle={{ 
            background: "var(--card-bg, #ffffff)", 
            borderColor: "var(--border-color, #e2e8f0)",
            borderRadius: "10px",
            color: "var(--text-main, #0f172a)"
          }}
        />
        <Line 
          type="monotone" 
          dataKey="rate" 
          stroke="#ef4444" 
          strokeWidth={2} 
          dot={false} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}