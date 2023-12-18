import { Badge, Button, Dropdown, Image, Menu, Skeleton, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import UpdateEmployee from './UpdateEmployee'
import DetailEmployee from './DetailEmployee'
import { getEmployeeById } from 'features/slice/employee/employeeSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { MoreOutlined, EditOutlined, FileTextOutlined } from '@ant-design/icons'
import ViewTimeKeeping from './ViewTimeKeeping'
import { getEmployeeEffortTotal } from 'features/slice/employee/employeeEffortTotalSlice'

const DisplayEmployee = ({
  employeeByFarm,
  onFinishDelete,
  onFinishUpdate,
  searchTerm,
  taskTypeActive,
  loading,
  getAnyEmployeeEffort,
}) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const employeeById = useSelector((state) => state.employee.data)
  const employeeEffortTotal = useSelector(
    (state) => state.employeeEffortTotal.data
  )

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

  useEffect(() => {
    if (selectedData) {
      dispatch(getEmployeeById(selectedData.id))
    }
  }, [selectedData, dispatch])

  const openModal = async (record) => {
    await dispatch(getEmployeeById(record.id))
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

  // Drawer
  const [openDrawer, setOpenDrawer] = useState(false)
  const showDrawer = async (record) => {
    await dispatch(getEmployeeEffortTotal(record.id))
    setSelectedDataDetail(record)
    setOpenDrawer(true)
  }

  const onClose = () => {
    setSelectedDataDetail(null)
    setOpenDrawer(false)
  }

  const searchEmployee = employeeByFarm
    ? employeeByFarm?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []
  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Table rowKey="id" dataSource={searchEmployee}>
            <Column
              title="Hình ảnh"
              dataIndex="avatar"
              key="avatar"
              render={(text, record) => (
                <Image
                  width={50}
                  height={70}
                  src={record.avatar}
                  style={{ objectFit: 'cover', borderRadius: '10%' }}
                />
              )}
            />
            <Column
              title="Tên nhân viên"
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
            <Column title="Mã nhân viên" dataIndex="code" key="2" />
            <Column
              title="Trạng thái"
              dataIndex="status"
              key="3"
              filters={[
                { text: 'Đang làm việc', value: 'Đang làm việc' },
                { text: 'Không làm việc', value: 'Không làm việc' },
              ]}
              onFilter={(value, record) => record.status.indexOf(value) === 0}
              render={(status) =>
                status === 'Đang làm việc' ? (
                  <Badge status="success" text="Đang làm việc" />
                ) : (
                  <Badge status="error" text="Không làm việc" />
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
              title="Tuỳ chọn"
              key="8"
              dataIndex="id"
              render={(_, record) => {
                return (
                  <Dropdown
                    placement="bottomRight"
                    overlay={
                      <Menu>
                        <Menu.Item key="updateEmployee">
                          <span onClick={() => openModal(record)}>
                            <EditOutlined
                              style={{ color: 'green', marginRight: '8px' }}
                            />
                            Cập nhật
                          </span>
                        </Menu.Item>
                        <Menu.Item key="viewSubTask">
                          <span onClick={() => showDrawer(record)}>
                            <FileTextOutlined
                              style={{ color: 'green', marginRight: '8px' }}
                            />
                            Xem giờ làm
                          </span>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <div
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                      style={{ cursor: 'pointer' }}
                    >
                      <MoreOutlined className="menu-icon" />
                    </div>
                  </Dropdown>
                )
              }}
            />
          </Table>

          <DetailEmployee
            key={
              'detail-' + (selectedDataDetail ? selectedDataDetail.id : null)
            }
            isModalDetailOpen={isModalDetailOpen}
            closeModalDetail={closeModalDetail}
            selectedDataDetail={selectedDataDetail}
          />

          <UpdateEmployee
            key={selectedData ? selectedData.id : null}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            employeeById={employeeById}
            taskTypeActive={taskTypeActive}
            selectedData={selectedData}
            onFinishUpdate={onFinishUpdate}
          />

          <ViewTimeKeeping
            key={
              'timekeeping-' +
              (selectedDataDetail ? selectedDataDetail.id : null)
            }
            employeeById={employeeById}
            selectedDataDetail={selectedDataDetail}
            onClose={onClose}
            openDrawer={openDrawer}
            getAnyEmployeeEffort={getAnyEmployeeEffort}
            employeeEffortTotal={employeeEffortTotal}
          />
        </>
      )}
    </>
  )
}
export default DisplayEmployee
