import { Badge, Button, Popconfirm, Skeleton, Space, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useState } from 'react'
import DetailArea from './DetailArea'
import Search from 'antd/es/input/Search'

const TableArea = ({ areaByFarm, onFinishDelete, loading }) => {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

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
            />
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
              title="Xoá"
              key="6"
              dataIndex="id"
              render={(_, record) => (
                <Popconfirm
                  title="Xoá khu vực"
                  description="Bạn có chắc muốn xoá khu vực này?"
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

          <DetailArea
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
export default TableArea
