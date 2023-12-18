import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Image,
  Row,
  Skeleton,
  Space,
  Table,
} from 'antd'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import UpdateMaterial from './UpdateMaterial'
import { getMaterialById } from 'features/slice/material/materialById'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import DetailMaterial from './DetailMaterial'

const DisplayMaterial = ({
  material,
  onFinishDelete,
  onFinishUpdate,
  farmId,
  loadData,
  searchTerm,
  loading,
}) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const materialById = useSelector((state) => state.materialById.data)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

  useEffect(() => {
    if (selectedData) {
      dispatch(getMaterialById(selectedData.id))
    }
  }, [selectedData, dispatch])

  const openModal = async (record) => {
    await dispatch(getMaterialById(record.id))
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

  const searchMaterial = material
    ? material?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Table rowKey="id" dataSource={searchMaterial}>
            <Column
              title="Tên công cụ"
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
            <Column
              title="Hình ảnh"
              dataIndex="urlImage"
              key="2"
              render={(text, record) => (
                <Image width={50} height={40} src={record.urlImage} style={{objectFit: "cover", borderRadius: "8px"}}/>
              )}
            />
            <Column
              title="Trạng thái"
              dataIndex="status"
              key="3"
              filters={[
                { text: 'Hiện', value: 'Hiện' },
                { text: 'Ẩn', value: 'Ẩn' },
              ]}
              onFilter={(value, record) => record.status.indexOf(value) === 0}
              render={(status) =>
                status === 'Hiện' ? (
                  <Badge status="success" text="Hiện" />
                ) : (
                  <Badge status="error" text="Ẩn" />
                )
              }
            />
            <Column
              title="Đổi trạng thái"
              key="4"
              dataIndex="id"
              render={(_, record) => (
                <Button
                  size="middle"
                  danger
                  onClick={() => onFinishDelete(record.id)}
                >
                  Đổi
                </Button>
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

          <DetailMaterial
            key={selectedDataDetail ? selectedDataDetail.id : null}
            isModalDetailOpen={isModalDetailOpen}
            closeModalDetail={closeModalDetail}
            selectedDataDetail={selectedDataDetail}
          />

          <UpdateMaterial
            key={selectedData ? selectedData.id : null}
            materialById={materialById}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            selectedData={selectedData}
            onFinishUpdate={onFinishUpdate}
            farmId={farmId}
          />
        </>
      )}
    </>
  )
}
export default DisplayMaterial
