import { Badge, Button, Popconfirm, Skeleton, Space, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useState } from 'react'
import DetailZone from './DetailZone'
import Search from 'antd/es/input/Search'

const TableZone = ({ zoneByFarm, onFinishDelete, loading }) => {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

  // Detail
  const openModalDetail = (record) => {
    setSelectedDataDetail(record)
    setIsModalDetailOpen(true)
  }
  const closeModalDetail = () => {
    setSelectedDataDetail(null)
    setIsModalDetailOpen(false)
  }

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const searchZone = zoneByFarm
    ? zoneByFarm?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Space style={{ justifyContent: 'flex-end', width: '98%' }}>
            <Search
              placeholder="Tìm kiếm"
              allowClear
              style={{
                marginLeft: '15px',
                width: 300,
                marginBottom: '20px',
              }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Space>
          <Table
            rowKey="id"
            dataSource={searchZone}
            style={{ margin: '0 20px' }}
          >
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
              title="Xoá"
              key="7"
              dataIndex="id"
              render={(_, record) => (
                <Popconfirm
                  title="Xoá vùn"
                  description="Bạn có chắc muốn xoá vùng này?"
                  onConfirm={() => onFinishDelete(record.id)}
                  okText="Xoá"
                  cancelText="Huỷ"
                >
                  <Button size="middle" danger>
                    Xoá
                  </Button>
                </Popconfirm>
              )}
            />
          </Table>

          <DetailZone
            key={selectedDataDetail ? selectedDataDetail.id : null}
            isModalDetailOpen={isModalDetailOpen}
            closeModalDetail={closeModalDetail}
            selectedDataDetail={selectedDataDetail}
          />
        </>
      )}
    </>
  )
}
export default TableZone
