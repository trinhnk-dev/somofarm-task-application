import { Badge, List, Modal, Space } from 'antd'
import {
  getAllNotify,
  markAsRead,
} from 'features/slice/notification/notificationSlice'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authServices } from 'services/authServices'
import TaskDetailModal from './TaskDetailModal'
import { changeNotifyIsRead } from 'features/slice/notification/notificationReadSlice'

const NotificationAll = () => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // Load notify
  const notifyAll = useSelector((state) => state.notification.data)

  const [pageNumber, setPageNumber] = useState(1)
  const [selectedData, setSelectedData] = useState(null)

  const showModal = (item) => {
    setSelectedData(item.taskId)
    setIsModalOpen(true)
    changeStatusNotify(item.id)
  }

  const changeStatusNotify = (notificationId) => {
    const updatedNotifications = notifyAll.map((notification) =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    )

    dispatch(setNotifications(updatedNotifications))

    // Make the API call
    dispatch(changeNotifyIsRead(notificationId))
      .unwrap()
      .then((response) => {})
      .catch((error) => {
        dispatch(setNotifications(notifyAll))
        console.error('Failed to mark notification as read:', error)
      })
  }

  const setNotifications = (notifications) => ({
    type: 'notification/setNotifications',
    payload: notifications,
  })

  const showModalDetail = (id) => {
    setSelectedData(id)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedData(null)
  }

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await dispatch(
          getAllNotify({
            pageNumber: pageNumber,
            pageSize: 10,
            id: authServices.getUserId(),
          })
        ).unwrap()
        if (response && response.length === 0) {
          setHasMore(false)
        }
      } catch (error) {
        console.error('Failed to load notifications:', error)
      }
    }
    loadNotifications()
  }, [dispatch, pageNumber])

  const fetchMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }

  return (
    <>
      <InfiniteScroll
        dataLength={notifyAll ? notifyAll.length : null}
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
          locale={{ emptyText: 'Chưa có thông báo' }}
          dataSource={notifyAll ? notifyAll : []}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  item.isRead === false ? (
                    <Space>
                      <Badge
                        status="processing"
                        text={item.message}
                        onClick={() => showModal(item)}
                        style={{ cursor: 'pointer' }}
                      />
                    </Space>
                  ) : (
                    <a onClick={() => showModalDetail(item.taskId)}>
                      {item.message}
                    </a>
                  )
                }
                description={item.time}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <TaskDetailModal
        key={selectedData ? selectedData : null}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedData={selectedData}
      />
    </>
  )
}
export default NotificationAll
