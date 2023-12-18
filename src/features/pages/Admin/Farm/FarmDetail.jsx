import { Button, Image, Modal, Descriptions } from 'antd'
import React from 'react'

const FarmDetail = ({
  farm,
  closeModal,
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const imageStyle = {
    maxWidth: '90%', // make the image max 90% of its container width
    maxHeight: '250px', // set a max height
    display: 'block', // use block to apply auto margins
    margin: '0 auto', // auto margins for horizontal centering
  }

  return (
    <Modal
      title={`Chi tiết nông trại ${farm?.name}`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={closeModal}>
          Thoát
        </Button>,
        <Button key="submit" type="primary" onClick={() => handleOk(farm.id)}>
          Chọn
        </Button>,
      ]}
      width={600} // Adjusted width of the modal for better layout
    >
      {farm && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Image
              alt="Hình nông trại"
              src={farm.urlImage}
              style={imageStyle} // Applied the new image style
            />
          </div>
          <Descriptions layout="vertical" bordered column={1}>
            <Descriptions.Item label="Mô tả">
              {farm.description}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {farm.address}
            </Descriptions.Item>
            <Descriptions.Item label="Diện tích">
              {`${farm.farmArea} m²`}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  )
}

export default FarmDetail
