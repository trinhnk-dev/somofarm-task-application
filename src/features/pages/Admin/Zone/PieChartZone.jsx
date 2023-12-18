import { Card } from "antd";
import { useDesktopXLMediaQuery, useDesktopXXLMediaQuery, useMobileMediaQuery, useTabletMediaQuery } from "common/hooks/responsive";
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <Card title={payload[0].name}>
        <p>Số lượng: {payload[0].value}</p>
      </Card>
    );
  }
  return null;
};

const PieChartZone = ({
  activeAnimalZoneCount,
  activePlantZoneCount,
  activeOtherZoneCount,
}) => {
  const data = [
    { name: "Vùng chăn nuôi mở", value: activeAnimalZoneCount },
    { name: "Vùng trồng trọt mở", value: activePlantZoneCount },
    { name: "Vùng khác mở", value: activeOtherZoneCount },
  ];
  const colors = ["#1a659e", "#02c39a", "#FFBB28"];

  const isDesktopXXL = useDesktopXXLMediaQuery();
  const isMobile = useMobileMediaQuery()

  return (
    <ResponsiveContainer
    className="pie-chart-zone"
      width={isDesktopXXL ? "90%" : "40%"}
      height={470}
      style={{
        padding: "20px",
        boxShadow:
          "1px 1px 3px #0000001a, 1px 2px 3px #0000000f,1px 2px 3px #0000001a, 1px 2px 3px #0000000f",
        backgroundColor: "white",
        borderRadius: "8px",
      }}
    >
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="40%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend
          align="right"
          verticalAlign="middle"
          layout="vertical"
          iconSize={15}
          wrapperStyle={ isMobile ? {marginRight: "20px", top: "290px"} : isDesktopXXL ? {marginRight: "100px"} :  {marginRight: "50px"}}
        />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartZone;
