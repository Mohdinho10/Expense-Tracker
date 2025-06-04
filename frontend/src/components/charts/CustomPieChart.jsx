import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

function CustomPieChart({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
  dataKey = "amount",
}) {
  return (
    <div style={{ position: "relative", width: "100%", height: 340 }}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            // dataKey="value ||amount""
            dataKey={dataKey}
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center content inside the donut */}
      {showTextAnchor && (
        <div
          style={{
            position: "absolute",
            top: "150px", // center of 300px height
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ fontSize: "14px", color: "#666" }}>{label}</div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
            {totalAmount}
          </div>
        </div>
      )}

      {/* Custom legend below the chart */}
      <div style={{ marginTop: 10 }}>
        <CustomLegend
          payload={data.map((entry, index) => ({
            color: colors[index % colors.length],
            value: entry.name,
          }))}
        />
      </div>
    </div>
  );
}

export default CustomPieChart;
