import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BounceLoader from "react-spinners/BounceLoader";
const PieChartTaskWeek = ({ taskByWeek, selectedDay, loading }) => {
  const COLORS = ["#1a659e", "#02c39a", "#FFBB28"];

  const calculateTotalTasks = () => {
    if (selectedDay !== null) {
      const dayTask = taskByWeek?.data[selectedDay];
      return [
        { name: "Công việc chăn nuôi", value: dayTask.totalTaskOfLivestock },
        { name: "Công việc trồng trọt", value: dayTask.totalTaskOfPlant },
        { name: "Công việc khác", value: dayTask.totalTaskOfOther },
      ];
    } else {
      let totalLivestock = 0;
      let totalPlant = 0;
      let totalOther = 0;

      taskByWeek?.data?.forEach((task) => {
        totalLivestock += task.totalTaskOfLivestock;
        totalPlant += task.totalTaskOfPlant;
        totalOther += task.totalTaskOfOther;
      });

      return [
        { name: "Công việc chăn nuôi", value: totalLivestock },
        { name: "Công việc trồng trọt", value: totalPlant },
        { name: "Công việc khác", value: totalOther },
      ];
    }
  };

  const totalTaskCount =
    selectedDay !== null
      ? taskByWeek?.data[selectedDay].taskCount
      : taskByWeek?.data?.reduce((acc, task) => acc + task.taskCount, 0);

  // Lọc hoặc điều chỉnh dữ liệu dựa vào selectedDay
  let filteredData = taskByWeek?.data
    ? calculateTotalTasks(taskByWeek.data)
    : [];

  if (selectedDay !== null && taskByWeek?.data) {
    const selectedTasks = taskByWeek.data[selectedDay];
    filteredData = calculateTotalTasks([selectedTasks]);
  }

  const RADIAN = Math.PI / 180;

  const styles = {
    container: {
      width: "100%",
    },
    tooltip: {
      backgroundColor: "white",
      border: "1px solid #dddddd",
      padding: "10px",
      borderRadius: "5px",
      boxShadow: "0px 0px 5px #aaaaaa",
    },
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={styles.tooltip}>
          <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={styles.container}>
      <h3 style={{ marginBottom: 0 }}>Tổng số công việc theo loại </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "400px",
        }}
      >
        {loading ? (
          <BounceLoader color="#82ca9d" />
        ) : (
          <ResponsiveContainer height={400}>
            <PieChart width={400} height={200}>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                startAngle={360}
                endAngle={0}
                innerRadius={60}
                dataKey="value"
                // label={renderCustomizedLabel}
                labelLine={false}
              >
                {filteredData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PieChartTaskWeek;