import React, { useEffect, useState } from 'react'
import { Badge, List, Space } from 'antd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { authServices } from 'services/authServices'
import { getNotifyIsNewById } from 'features/slice/notification/notificationIsNewSlice'
import { getTaskById } from 'features/slice/task/taskByIdSlice'
import TaskDetailModal from './TaskDetailModal'

const NotificationIsNew = ({ changeStatusNotify }) => {
  const dispatch = useDispatch()

  // Load notify
  const notifyNew = useSelector((state) => state.notificationIsNew.data)
  const [hasMore, setHasMore] = useState(true)

  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await dispatch(
          getNotifyIsNewById({
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

  const [selectedData, setSelectedData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = (item) => {
    setSelectedData(item.taskId)
    setIsModalOpen(true)
    changeStatusNotify(item.id)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedData(null)
  }

  return (
    <>
      <InfiniteScroll
        dataLength={notifyNew ? notifyNew.length : null}
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
          locale={{ emptyText: 'Không có thông báo chưa đọc' }}
          dataSource={notifyNew ? notifyNew : []}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Space>
                    <Badge
                      status="processing"
                      text={item.message}
                      style={{ cursor: 'pointer' }}
                      onClick={() => showModal(item)}
                    />
                  </Space>
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

export default NotificationIsNew
