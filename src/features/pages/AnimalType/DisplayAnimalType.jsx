import { useEffect, useState } from 'react'
import { Badge, Button, Skeleton, Table } from 'antd'
import Column from 'antd/es/table/Column'
import UpdateAnimalType from './UpdateAnimalType'
import DetailAnimalType from './DetailAnimalType'

const DisplayAnimalType = ({
  animalType,
  onFinishDeleteAnimalType,
  onFinishUpdateAnimalType,
  loadDataAnimalType,
  searchTerm,
  loading,
}) => {
  useEffect(() => {
    loadDataAnimalType()
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

  const handleDelete = (id) => {
    onFinishDeleteAnimalType(id)
  }

  const openModal = (record) => {
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedData(null)
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

  const searchAnimalType = animalType
    ? animalType?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Table
            dataSource={searchAnimalType}
            rowKey="id"
            locale={{ emptyText: 'Chưa có loại vật nuôi nào' }}
          >
            <Column
              title="Tên loại vật nuôi"
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
            />{' '}
            {/* <Column title="Nguồn gốc" dataIndex="origin" key="2" />
        <Column title="Môi trường sống" dataIndex="environment" key="3" />
      <Column title="Mô tả" dataIndex="description" key="4" /> */}
            <Column
              title="Trạng thái"
              dataIndex="isActive"
              key="5"
              filters={[
                { text: 'Hiện', value: true },
                { text: 'Ẩn', value: false },
              ]}
              onFilter={(value, record) => record.isActive === value}
              render={(isActive) =>
                isActive === true ? (
                  <Badge status="success" text="Hiện" />
                ) : (
                  <Badge status="error" text="Ẩn" />
                )
              }
            />
            <Column
              title="Đổi trạng thái"
              key="5"
              dataIndex="id"
              render={(_, record) => (
                <Button
                  size="middle"
                  danger
                  onClick={() => handleDelete(record.id)}
                >
                  Đổi
                </Button>
              )}
            />
            <Column
              title="Cập nhật"
              key="6"
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

          <DetailAnimalType
            key={selectedDataDetail ? selectedDataDetail.id : null}
            isModalDetailOpen={isModalDetailOpen}
            closeModalDetail={closeModalDetail}
            selectedDataDetail={selectedDataDetail}
          />

          <UpdateAnimalType
            key={selectedData ? selectedData.id : null}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            selectedData={selectedData}
            onFinishUpdateAnimalType={onFinishUpdateAnimalType}
          />
        </>
      )}
    </>
  )
}
export default DisplayAnimalType
