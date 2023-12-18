import { Badge, Button, Popconfirm, Skeleton, Space, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useState } from 'react'
import DetailCropGroup from './DetailCropGroup'
import Search from 'antd/es/input/Search'

const TableCropGroup = ({ fieldPlant, onFinishDelete, loading }) => {
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

  const searchPlantGroup = fieldPlant
    ? fieldPlant?.data?.filter((m) =>
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
          <Table dataSource={searchPlantGroup} rowKey="id">
            <Column
              title="Tên vườn"
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
            <Column title="Mã vườn" dataIndex="code" key="2" />

            <Column
              title="Trạng thái"
              dataIndex="isDelete"
              key="5"
              filters={[
                { text: 'Hiện', value: false },
                { text: 'Ẩn', value: true },
              ]}
              onFilter={(value, record) => record.isDelete === value}
              render={(isDelete) =>
                isDelete === false ? (
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
                  title="Xoá vườn"
                  description="Bạn có chắc muốn xoá vườn này?"
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

          <DetailCropGroup
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
export default TableCropGroup
