import { Area, AreaChart, ResponsiveContainer, Bar, BarChart } from "recharts";

const series = [12, 18, 14, 22, 28, 24, 32, 38, 34, 44, 52, 48, 58, 66, 62, 74].map(
  (v, i) => ({ i, v }),
);

export function MiniArea({ color = "var(--primary-glow)", height = 80 }: { color?: string; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={series} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`g-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.55} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#g-${color})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MiniBars({ color = "var(--silver)", height = 80 }: { color?: string; height?: number }) {
  const data = [40, 55, 30, 70, 50, 80, 60, 90, 75].map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey="v" fill={color} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
