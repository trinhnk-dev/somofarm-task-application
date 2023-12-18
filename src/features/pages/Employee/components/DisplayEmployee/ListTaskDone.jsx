import { Button, Card, List, Select } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  clearTaskDone,
  getTaskDoneByEmployeeId,
} from 'features/slice/task/taskDoneSlice'
import { useSelector } from 'react-redux'
import TaskDetail from './TaskDetail'
import { getTaskById } from 'features/slice/task/taskByIdSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import dayjs from 'dayjs'

const ListTaskDone = ({ toggleTaskList, selectedDataDetail }) => {
  const [hasMore, setHasMore] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const dispatch = useDispatch()
  const taskDone = useSelector((state) => state.taskDone.data)
  const taskById = useSelector((state) => state.taskById.data)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState()
  const [filterStatus, setFilterStatus] = useState('')

  const openModalDetail = async (record) => {
    const actionResult = await dispatch(getTaskById(record.id))
    const taskData = actionResult.payload
    setSelectedTask(taskData)
    setIsModalDetailOpen(true)
  }

  const closeModalDetail = () => {
    setSelectedTask(null)
    setIsModalDetailOpen(false)
  }

  const toggleTaskListBack = () => {
    toggleTaskList()
  }

  useEffect(() => {
    const loadListTaskDone = async () => {
      try {
        await dispatch(clearTaskDone())
        const response = await dispatch(
          getTaskDoneByEmployeeId({
            startDay: '',
            endDay: '',
            status: filterStatus,
            pageIndex: pageNumber,
            employeeId: selectedDataDetail.id,
          })
        ).unwrap()
        if (response && response.length === 0) {
          setHasMore(false)
        }
      } catch (error) {
        console.error('Failed to load listTaskDone:', error)
      }
    }
    loadListTaskDone()
  }, [dispatch, filterStatus])

  const fetchMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }

  const getPriorityColor = (priority) => {
    if (priority === 'Cao') {
      return '#f5222d'
    } else if (priority === 'Trung bình') {
      return '#faad14'
    } else if (priority === 'Thấp') {
      return '#52c41a'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${day}/${month}/${year} - ${hours}:${minutes}`
  }

  const handleFilterChange = (value) => {
    setFilterStatus(value)
    setPageNumber(1)
  }

  return (
    <>
      <div>
        <Button
          type="default"
          onClick={toggleTaskListBack}
          style={{ marginBottom: '10px' }}
        >
          <ArrowLeftOutlined />
        </Button>
      </div>

      <Select
        defaultValue=""
        style={{ width: 120 }}
        onChange={handleFilterChange}
      >
        <Select.Option value="">Tất cả</Select.Option>
        <Select.Option value={7}>Đã hủy</Select.Option>
        <Select.Option value={8}>Đã đóng</Select.Option>
      </Select>

      <InfiniteScroll
        dataLength={taskDone.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: 'center' }}>...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            Bạn đã xem hết tất cả thông báo.
          </p>
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={taskDone}
          renderItem={(item, index) => (
            <List.Item>
              <Card
                style={{
                  width: '100%',
                  margin: '0 auto',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  border: '1px solid #f0f0f0',
                  cursor: 'pointer',
                }}
                title={
                  <div
                    style={{
                      borderRadius: '8px 8px 0 0',
                    }}
                  >
                    <a style={{ fontSize: '18px', color: '#333' }}>
                      {item?.name}
                    </a>
                    {/* <p>#{item.codeTask}</p> */}
                  </div>
                }
                onClick={() => openModalDetail(item)}
                actions={[
                  <span style={{ color: '#52c41a' }}>{item.taskTypeName}</span>,
                  <span style={{ color: getPriorityColor(item.priority) }}>
                    {item.priority}
                  </span>,
                ]}
              >
                <p style={{ marginBottom: '10px' }}>
                  <strong>Bắt đầu:</strong> {formatDate(item.startDate)}
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Kết thúc:</strong> {formatDate(item.endDate)}
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Giờ làm dự kiến:</strong> {item.effortOfTask}
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Giờ làm thực tế (cá nhân):</strong>{' '}
                  {item.actualEffortHour} giờ {item.actualEfforMinutes} phút
                </p>
                <p>
                  <strong>Người làm:</strong> {item.totaslEmployee}
                </p>
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>

      <TaskDetail
        selectedTask={selectedTask}
        isModalDetailOpen={isModalDetailOpen}
        closeModalDetail={closeModalDetail}
      />
    </>
  )
}
export default ListTaskDone
