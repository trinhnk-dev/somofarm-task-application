import { Card, List, Skeleton } from 'antd'
import { format } from 'date-fns'
import { getEffortInWeek } from 'features/slice/effort/effortInWeekSlice'
import { getTaskCompleteRate } from 'features/slice/task/taskCompleteRateSlice'
import { getTopAreaTask } from 'features/slice/task/taskTopAreaSlice'
import { getTaskTopEmployee } from 'features/slice/task/taskTopEmployeeSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const DisplayByWeek = ({ farmId }) => {
  const dispatch = useDispatch()
  const effortInWeek = useSelector((state) => state.effortInWeek.data)
  const taskTopArea = useSelector((state) => state.taskTopArea.data)
  const taskCompleteRate = useSelector((state) => state.taskCompleteRate.data)
  const taskTopEmployee = useSelector((state) => state.taskTopEmployee.data)
  const loadingTaskTopEmployee = useSelector(
    (state) => state.taskTopEmployee.loading
  )
  const loadingTaskTopArea = useSelector((state) => state.taskTopArea.loading)

  useEffect(() => {
    dispatch(getEffortInWeek(farmId))
    dispatch(getTopAreaTask(farmId))
    dispatch(getTaskCompleteRate(farmId))
    dispatch(getTaskTopEmployee(farmId))
  }, [dispatch, farmId])

  return (
    <div className="admin-dashboard">
      <h3>Công việc tuần này</h3>
      <div className="admin-displayByWeek">
        <Card title="Tổng thời gian làm việc" style={{ marginTop: '25px' }}>
          {effortInWeek ? effortInWeek?.data : 0}
        </Card>
        <Card title={`Tỉ lệ hoàn thành`} style={{ marginTop: '25px' }}>
          {taskCompleteRate && taskCompleteRate?.data?.time !== 'NaN%'
            ? taskCompleteRate?.data?.time
            : 'Chưa có công việc nào được hoàn thành'}
        </Card>
        <Card
          title="Các loại công việc thực hiện nhiều nhất"
          style={{ marginTop: '25px' }}
          className="ant-card-bottom"
        >
          {loadingTaskTopArea ? (
            <Skeleton active />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={taskTopArea?.data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item?.name}
                    description={`Số lượng công việc: ${item?.total}`}
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
        <Card
          title="Danh sách nhân viên làm việc nhiều nhất"
          style={{ marginTop: '25px' }}
          className="ant-card-bottom"
        >
          {loadingTaskTopEmployee ? (
            <Skeleton active />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={taskTopEmployee?.data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item?.name}
                    description={`Mã nhân viên: ${item?.code}, 
                    Thời gian làm việc: ${item?.totalEffort.toFixed(1)} giờ`}
                    //   Diện tích  : ${item?.area?.fArea}m2,
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>
    </div>
  )
}
export default DisplayByWeek
