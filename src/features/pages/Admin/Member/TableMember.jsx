import {
  Avatar,
  Badge,
  Button,
  Image,
  Modal,
  Popconfirm,
  Skeleton,
  Space,
  Table,
} from 'antd'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import DetailMember from './DetailMember'
import UpdateMember from './UpdateMember'
import { getMemberById } from 'features/slice/user/memberSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Search from 'antd/es/input/Search'

const TableMember = ({
  memberByFarm,
  onFinishDelete,
  loadData,
  onFinishUpdate,
  loading,
}) => {
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const showModal = (record) => {
    setSelectedMember(record)
    setIsModalOpenDetail(true)
  }

  const closeModalDetail = () => {
    setSelectedMember(null)
    setIsModalOpenDetail(false)
  }

  // --------------------------------------------
  // Update
  const dispatch = useDispatch()
  useEffect(() => {
    if (selectedMember) {
      dispatch(getMemberById(selectedMember.id))
    }
  }, [selectedMember, dispatch])

  const memberById = useSelector((state) => state.member.data)

  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)

  const openModalUpdate = async (record) => {
    await dispatch(getMemberById(record.id))
    setSelectedMember(record)
    setIsModalOpenUpdate(true)
  }

  const closeModalUpdate = () => {
    setIsModalOpenUpdate(false)
    setSelectedMember(null)
  }

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const searchMember = memberByFarm
    ? memberByFarm?.data?.filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          m.roleName !== 'Admin'
      )
    : [];
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
          <Table dataSource={searchMember} rowKey="id">
            <Column
              title="Hình ảnh"
              dataIndex="avatar"
              key="avatar"
              render={(text, record) =>
                record.avatar ? (
                  <Image
                    width={50}
                    height={50}
                    src={record.avatar}
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                ) : (
                  <Image
                    width={50}
                    height={50}
                    src="https://media.saodaily.com/storage/files/lethihong/2022/07/26/264-2647677_avatar-icon-human-user-avatar-svg-hd-png-024032.png"
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                )
              }
            />
            <Column
              title="Tên nhân viên"
              dataIndex="name"
              key="1"
              render={(text, record) => (
                <h4
                  onClick={() => showModal(record)}
                  style={{ cursor: 'pointer' }}
                >
                  {text}
                </h4>
              )}
            />
            <Column
              title="Chức vụ"
              dataIndex="roleName"
              key="2"
              render={(roleName) => {
                let displayRole
                switch (roleName) {
                  case 'Manager':
                    displayRole = 'Quản lý'
                    break
                  case 'Supervisor':
                    displayRole = 'Giám sát'
                    break
                  default:
                    displayRole = roleName
                }
                return <span>{displayRole}</span>
              }}
            />
            <Column
              title="Trạng thái"
              dataIndex="status"
              key="4"
              render={(status) =>
                status === 'Đang làm việc' ? (
                  <Badge status="success" text="Đang làm việc" />
                ) : (
                  <Badge status="error" text="Đã nghỉ việc" />
                )
              }
            />

            <Column
              title="Xoá"
              key="5"
              dataIndex="id"
              render={(_, record) => (
                <Popconfirm
                  title="Xoá nhân viên"
                  description="Bạn có chắc muốn xoá nhân viên này?"
                  onConfirm={() => onFinishDelete(record.id)}
                  // onCancel={cancel}
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
              key="7"
              dataIndex="id"
              render={(_, record) => (
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => openModalUpdate(record)}
                >
                  Cập nhật
                </Button>
              )}
            />
          </Table>
          <DetailMember
            key={'detail-' + (selectedMember ? selectedMember.id : null)}
            isModalOpenDetail={isModalOpenDetail}
            closeModalDetail={closeModalDetail}
            selectedMember={selectedMember}
          />

          <UpdateMember
            key={selectedMember ? selectedMember.id : null}
            isModalOpenUpdate={isModalOpenUpdate}
            closeModalUpdate={closeModalUpdate}
            memberById={memberById}
            selectedMember={selectedMember}
            onFinishUpdate={onFinishUpdate}
          />
        </>
      )}
    </>
  )
}
export default TableMember
