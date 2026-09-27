import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatINR, formatINRFull } from "../utils/analysis.js";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="tt-label">{label}</div>
      <div className="tt-value">{formatINRFull(payload[0].value)}</div>
    </div>
  );
}

export default function CostChart({ data, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="costFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c93ff" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#7c93ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 6" vertical={false} />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          minTickGap={28}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => formatINR(v)}
          width={54}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#232a3d" }} />
        <Area
          type="monotone"
          dataKey="cost"
          stroke="#7c93ff"
          strokeWidth={2.5}
          fill="url(#costFill)"
          activeDot={{ r: 5, fill: "#7c93ff", stroke: "#0a0d14", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
