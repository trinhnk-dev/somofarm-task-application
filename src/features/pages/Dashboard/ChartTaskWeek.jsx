// ChartTaskWeek.js

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import ScaleLoader from 'react-spinners/ScaleLoader'
const ChartTaskWeek = ({ taskByWeek, onBarClick, loading }) => {
  const dayNames = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ]

  const data = taskByWeek?.data?.map((task, index) => ({
    name: dayNames[index],
    uv: task.taskCount,
  }))

  const renderBarShape = (props) => {
    const { fill, x, y, width, height } = props
    return <rect x={x} y={y} width={width} height={height} rx={5} fill={fill} />
  }

  return (
    <>
      <h3>Tổng số công việc theo ngày</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '400px',
        }}
      >
        {loading ? (
          <ScaleLoader color="#82ca9d" />
        ) : (
          <ResponsiveContainer height="85%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 50, bottom: 5 }}
              barCategoryGap="5%"
              barGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="uv"
                name="Tổng nhiệm vụ"
                fill="#82ca9d"
                shape={renderBarShape}
                onClick={(entry, index) => onBarClick(index)}
                barSize={50}
              />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  )
}

export default ChartTaskWeek
