import { Select, Space } from 'antd'
import { getTaskMonth } from 'features/slice/task/taskMonthSlice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const DisplayByMonth = ({ farmId }) => {
  const dispatch = useDispatch()
  const taskMonth = useSelector((state) => state.taskMonth.data)
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  useEffect(() => {
    dispatch(
      getTaskMonth({
        farmId: farmId,
        month: selectedMonth,
      })
    )
  }, [dispatch, farmId, selectedMonth])

  const data = [
    {
      name: 'Chuẩn bị',
      total: taskMonth?.data?.totalTaskToDo,
    },
    {
      name: 'Đang làm',
      total: taskMonth?.data?.totalTaskDoing,
    },
    {
      name: 'Tạm hoãn',
      total: taskMonth?.data?.totalTaskPending,
    },
    {
      name: 'Đã đóng',
      total: taskMonth?.data?.totalTaskClose,
    },
  ]

  const handleChange = (value) => {
    setSelectedMonth(value)
  }

  const getMaxValue = (data) => {
    const maxVal = Math.max(...data.map((item) => item.total || 0))
    return maxVal + maxVal * 0.2 // Thêm 20%
  }

  const yAxisTickFormatter = (value) => {
    return Math.floor(value)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            padding: '10px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
            borderRadius: '5px',
          }}
        >
          <p style={{ color: '#666' }}>{`${label} : ${payload[0].value}`}</p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="admin-dashboardByMonth">
      <div className="dashboardByMonth-content">
        <h3>Công việc theo tháng của năm {currentYear}</h3>
        <Select
          defaultValue={currentMonth}
          style={{
            width: 100,
            marginTop: '5px',
            marginBottom: '25px',
          }}
          onChange={handleChange}
          options={[
            {
              value: 1,
              label: 'Tháng 1',
            },
            {
              value: 2,
              label: 'Tháng 2',
            },
            {
              value: 3,
              label: 'Tháng 3',
            },
            {
              value: 4,
              label: 'Tháng 4',
            },
            {
              value: 5,
              label: 'Tháng 5',
            },
            {
              value: 6,
              label: 'Tháng 6',
            },
            {
              value: 7,
              label: 'Tháng 7',
            },
            {
              value: 8,
              label: 'Tháng 8',
            },
            {
              value: 9,
              label: 'Tháng 9',
            },
            {
              value: 10,
              label: 'Tháng 10',
            },
            {
              value: 11,
              label: 'Tháng 11',
            },
            {
              value: 12,
              label: 'Tháng 12',
            },
          ]}
        />

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              domain={[0, getMaxValue(data)]}
              allowDataOverflow
              tickFormatter={yAxisTickFormatter}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
export default DisplayByMonth
