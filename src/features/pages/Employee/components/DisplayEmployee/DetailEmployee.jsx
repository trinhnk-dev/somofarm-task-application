import { Avatar, Button, Descriptions, Image, Modal } from 'antd'

const DetailEmployee = ({
  isModalDetailOpen,
  closeModalDetail,
  selectedDataDetail,
}) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-GB', options)
  }

  return (
    <Modal
      title="Chi tiết nhân viên"
      open={isModalDetailOpen}
      closeIcon
      onCancel={closeModalDetail}
      footer={[<Button onClick={closeModalDetail}>Đóng</Button>]}
    >
      {selectedDataDetail && (
        <>
          <Descriptions
            layout="horizontal"
            bordered
            column={1}
            title={selectedDataDetail.name}
            labelStyle={{
              width: '150px',
            }}
          >
            <Descriptions>
              <Avatar src={selectedDataDetail.avatar} />
            </Descriptions>
            <Descriptions.Item label="Mã nhân viên">
              {selectedDataDetail.code}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {selectedDataDetail.phoneNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {formatDate(selectedDataDetail.dateOfBirth)}
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính">
              {selectedDataDetail.gender === 'Male' ? 'Nam' : 'Nữ'}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {selectedDataDetail.address}
            </Descriptions.Item>
            <Descriptions.Item label="Loại nhiệm vụ">
              {selectedDataDetail.taskTypeName}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {selectedDataDetail.status}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  )
}
export default DetailEmployee
