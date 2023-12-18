import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Popconfirm, Row, Space } from 'antd'
import FarmDetail from './FarmDetail'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import FormAddFarm from './FormAddFarm'
import { useDesktopXXLMediaQuery } from 'common/hooks/responsive'
import { getFarmById } from 'features/slice/farm/farmByIdSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import FormUpdateFarm from './FormUpdateFarm'

const DisplayFarm = ({
  farm,
  onFinishCreate,
  onFinishDelete,
  onFinishUpdate,
}) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFarm, setSelectedFarm] = useState(null)

  const showModal = (farm) => {
    setSelectedFarm(farm)
    setIsModalOpen(true)
  }

  const handleOk = (farmId) => {
    localStorage.setItem('farmId', farmId)
    toast.success('Đổi trang trại thành công')
    closeModal()
    // navigate('/dashboard')
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const getCardStyle = (numberOfFarms) => ({
    width: numberOfFarms === 1 ? '60%' : 370,
    margin: '16px auto',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '10px',
  })

  const headerStyle = {
    textAlign: 'center',
    fontSize: '24px',
    color: '#545454',
    fontWeight: '600',
    margin: '16px 0',
    fontFamily: 'Arial, sans-serif',
  }

  // Add
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false)

  const openModalAdd = () => {
    setIsModalOpenAdd(true)
  }

  const closeModalAdd = () => {
    setIsModalOpenAdd(false)
  }

  const deleteFarm = (id) => {
    onFinishDelete(id)
  }

  const isDesktopXXL = useDesktopXXLMediaQuery()

  // Modal update
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)
  const [selectedToUpdate, setSelectedToUpdate] = useState(null)

  const dispatch = useDispatch()
  const farmById = useSelector((state) => state.farmById.data)

  useEffect(() => {
    if (selectedToUpdate) {
      dispatch(getFarmById(selectedToUpdate))
    }
  }, [dispatch, selectedToUpdate])

  const openModalUpdate = async (id) => {
    setSelectedToUpdate(id)
    await dispatch(getFarmById(id))
    setIsModalOpenUpdate(true)
  }

  const closeModalUpdate = () => {
    setSelectedToUpdate(null)
    setIsModalOpenUpdate(false)
  }
  return (
    <>
      <Space
        style={{
          width: '100%',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <div></div>
        <Button
          style={{
            marginRight: '20px',
          }}
          type="primary"
          onClick={openModalAdd}
        >
          Tạo trang trại
        </Button>
      </Space>

      <FormAddFarm
        isModalOpenAdd={isModalOpenAdd}
        closeModalAdd={closeModalAdd}
        onFinishCreate={onFinishCreate}
      />

      <h2 style={headerStyle}>Lựa chọn nông trại để quản lý</h2>
      <Row gutter={[16, 16]} justify={isDesktopXXL ? 'space-around' : 'center'}>
        {Array.isArray(farm) &&
          farm?.map((item) => (
            <Col
              xs={24}
              sm={farm.length === 1 ? 16 : 14}
              lg={farm.length === 1 ? 16 : 12}
              xl={farm.length === 1 ? 16 : 11}
            >
              <Card
                key={item.key}
                hoverable
                style={getCardStyle(farm.length)}
                cover={
                  <img
                    alt="Nông trại"
                    src={item.urlImage}
                    style={{
                      height: farm.length === 1 ? 300 : 250,
                      objectFit: 'cover',
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '10px',
                    }}
                  />
                }
                actions={[
                  <span
                    style={{ color: '#52c41a', fontSize: '18px' }}
                    onClick={() => openModalUpdate(item.id)}
                  >
                    <EditOutlined />
                  </span>,

                  <Popconfirm
                    title="Bạn có chắc chắn muốn xóa trang trại này không?"
                    onConfirm={() => deleteFarm(item.id)}
                    okText="Có"
                    cancelText="Không"
                  >
                    <span style={{ color: '#f5222d', fontSize: '18px' }}>
                      <DeleteOutlined />
                    </span>
                  </Popconfirm>,
                ]}
              >
                <Card.Meta
                  onClick={() => showModal(item)}
                  title={<h3 style={{ fontWeight: 'bold' }}>{item.name}</h3>}
                  description={
                    item.description.length > 120
                      ? item.description.substring(0, 120) + '...'
                      : item.description
                  }
                  style={{ padding: '0 12px 12px' }}
                />
              </Card>
            </Col>
          ))}
      </Row>
      <FarmDetail
        farm={selectedFarm}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      <FormUpdateFarm
        key={'dashboard' + selectedToUpdate}
        isModalOpenUpdate={isModalOpenUpdate}
        closeModalUpdate={closeModalUpdate}
        farmById={farmById}
        onFinishUpdate={onFinishUpdate}
      />
    </>
  )
}

export default DisplayFarm
