import { useEffect, useRef, useState } from 'react'
import ChartTaskWeek from './ChartTaskWeek'
import DashboardBox from './DashboardBox'
import PieChartTaskWeek from './PieChartTaskWeek'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getTaskFarm } from 'features/slice/task/taskFarmSlice'

const DisplayTask = ({ farmId }) => {
  const barChartRef = useRef(null)
  const dispatch = useDispatch()
  const taskByWeek = useSelector((state) => state.taskFarm.data)

  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    dispatch(getTaskFarm(farmId))
  }, [dispatch])

  const handleBarClick = (index) => {
    setSelectedDay(index)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (barChartRef.current && !barChartRef.current.contains(event.target)) {
        setSelectedDay(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [barChartRef])
  return (
    <div className="admin-dashboard">
      <h3>Tổng số công việc theo trạng thái trong tuần</h3>
      <div className="admin-dashboard-header">
        <DashboardBox taskByWeek={taskByWeek} selectedDay={selectedDay} />
      </div>
      <div className="admin-dashboard-footer">
        <div className="admin-dashboard-chart" ref={barChartRef}>
          <ChartTaskWeek taskByWeek={taskByWeek} onBarClick={handleBarClick} />
        </div>
        <div className="admin-dashboard-piechart">
          <PieChartTaskWeek taskByWeek={taskByWeek} selectedDay={selectedDay} />
        </div>
      </div>
    </div>
  )
}
export default DisplayTask
