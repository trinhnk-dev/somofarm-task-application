import { Badge, Button, Skeleton, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useState } from 'react'
import UpdateZone from './UpdateZone'
import DetailZone from './DetailZone'

const TableDisplayZone = ({
  areaByFarm,
  zoneByFarm,
  zoneType,
  onFinishUpdateZone,
  onFinishDeleteZone,
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

  const searchZone = zoneByFarm
    ? zoneByFarm?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Table rowKey="id" dataSource={searchZone}>
            <Column
              title="Tên vùng"
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
            <Column title="Mã vùng" dataIndex="code" key="2" />
            {/* <Column title="Diện tích" dataIndex="farmArea" key="3" /> */}
            {/* <Column title="Loại vùng" dataIndex="zoneTypeName" key="4" /> */}
            {/* <Column title="Tên khu vực" dataIndex="areaName" key="5" /> */}
            <Column
              title="Trạng thái"
              dataIndex="status"
              key="6"
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
              key="7"
              dataIndex="id"
              render={(_, record) => (
                <Button
                  size="middle"
                  danger
                  onClick={() => onFinishDeleteZone(record.id)}
                >
                  Đổi
                </Button>
              )}
            />
            <Column
              title="Cập nhật"
              key="8"
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
          <DetailZone
            key={selectedDataDetail ? selectedDataDetail.id : null}
            isModalDetailOpen={isModalDetailOpen}
            closeModalDetail={closeModalDetail}
            selectedDataDetail={selectedDataDetail}
          />

          <UpdateZone
            key={selectedData ? selectedData.id : null}
            areaByFarm={areaByFarm}
            zoneType={zoneType}
            onFinishUpdateZone={onFinishUpdateZone}
            selectedData={selectedData}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
          />
        </>
      )}
    </>
  )
}
export default TableDisplayZone
