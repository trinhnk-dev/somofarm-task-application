import { Badge, Button, Image, Popconfirm, Skeleton, Space, Table } from 'antd'
import Column from 'antd/es/table/Column'
import DetailMaterial from './DetailMaterial'
import { useState } from 'react'
import Search from 'antd/es/input/Search'

const TableMaterial = ({ material, onFinishDelete, loading }) => {
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

  const searchMaterial = material
    ? material?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <>
      {loading ? (
        <Skeleton />
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
              title="Xoá"
              key="4"
              dataIndex="id"
              render={(_, record) => (
                <Popconfirm
                  title="Xoá công cụ"
                  description="Bạn có chắc muốn xoá công cụ này?"
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

          <DetailMaterial
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
export default TableMaterial
