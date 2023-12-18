import { Badge, Button, Skeleton, Table } from 'antd'
import Column from 'antd/es/table/Column'
import UpdateArea from './UpdateArea'
import { useState } from 'react'
import DetailArea from './DetailArea'

const DisplayArea = ({
  areaByFarm,
  onFinishDelete,
  onFinishUpdate,
  searchTerm,
  loading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

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

  const searchArea = areaByFarm
    ? areaByFarm?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Table rowKey="id" dataSource={searchArea}>
            <Column
              title="Tên khu vực"
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
            <Column title="Mã khu vực" dataIndex="code" key="2" />
            {/* <Column title="Diện tích" dataIndex="fArea" key="3" /> */}
            {/* <Column title="Tên trang trại" dataIndex="farmName" key="4" /> */}
            <Column
              title="Trạng thái"
              dataIndex="status"
              key="5"
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
              key="6"
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
              key="7"
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

          <DetailArea
            key={selectedDataDetail ? selectedDataDetail.id : null}
            isModalDetailOpen={isModalDetailOpen}
            closeModalDetail={closeModalDetail}
            selectedDataDetail={selectedDataDetail}
          />

          <UpdateArea
            key={selectedData ? selectedData.id : null}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            selectedData={selectedData}
            onFinishUpdate={onFinishUpdate}
          />
        </>
      )}
    </>
  )
}
export default DisplayArea
