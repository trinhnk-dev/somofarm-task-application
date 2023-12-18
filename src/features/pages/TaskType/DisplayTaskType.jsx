import { useEffect, useState } from 'react'
import UpdateTaskType from './UpdateTaskType'
import { Badge, Button, Popconfirm, Skeleton, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useSelector } from 'react-redux'
import { getTaskTypeById } from 'features/slice/task/taskTypeByIdSlice'
import { useDispatch } from 'react-redux'
import DetailTaskType from './DetailTaskType'

const DisplayTaskType = ({
  taskType,
  onFinishUpdateTaskType,
  // loadData,
  onFinishDeleteTaskType,
  searchTerm,
  loading,
}) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

  const taskTypeById = useSelector((state) => state.taskTypeById.data)

  useEffect(() => {
    async function fetchData() {
      if (selectedData) {
        await dispatch(getTaskTypeById(selectedData.id))
        // loadData()
      }
    }

    fetchData()
  }, [selectedData, dispatch])

  const openModal = async (record) => {
    await dispatch(getTaskTypeById(record.id))
    setSelectedData(record)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setSelectedData(null)
    setIsModalOpen(false)
  }

  // Detail

  const openModalDetail = (record) => {
    setSelectedDataDetail(record)
    setIsModalDetailOpen(true)
  }
  const closeModalDetail = () => {
    setSelectedDataDetail(null)
    setIsModalDetailOpen(false)
  }

  const searchTaskType = taskType
    ? taskType?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Table dataSource={searchTaskType} rowKey="id">
            <Column
              title="Tên công việc"
              dataIndex="name"
              key="1"
              render={(text, record) => (
                <h4
                  onClick={() => openModalDetail(record)}
                  style={{ cursor: 'pointer' }}
                >
                  {text}
                </h4>
              )}
            />
            <Column title="Loại công việc" dataIndex="status" key="2" />

            <Column
              title="Xoá"
              key="4"
              dataIndex="id"
              render={(_, record) => (
                <Popconfirm
                  title="Xoá loại công việc"
                  description="Bạn có chắc muốn xoá loại công việc này?"
                  onConfirm={() => onFinishDeleteTaskType(record.id)}
                  okText="Xoá"
                  cancelText="Huỷ"
                >
                  <Button size="middle" danger>
                    Xoá
                  </Button>
                </Popconfirm>
              )}
            />

            <Column
              title="Cập nhật"
              key="5"
              dataIndex="id"
              render={(_, record) => (
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => openModal(record)}
                >
                  Cập nhật
                </Button>
              )}
            />
          </Table>

          <DetailTaskType
            key={selectedDataDetail ? selectedDataDetail.id : null}
            isModalDetailOpen={isModalDetailOpen}
            closeModalDetail={closeModalDetail}
            selectedDataDetail={selectedDataDetail}
          />
          <UpdateTaskType
            key={selectedData ? selectedData.id : null}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            selectedData={selectedData}
            taskTypeById={taskTypeById}
            onFinishUpdateTaskType={onFinishUpdateTaskType}
          />
        </>
      )}
    </>
  )
}
export default DisplayTaskType
