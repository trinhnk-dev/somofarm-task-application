import { Button, Descriptions, Modal } from 'antd'

const DetailTaskType = ({
  isModalDetailOpen,
  closeModalDetail,
  selectedDataDetail,
}) => {
  return (
    <Modal
      title="Chi tiết loại công việc"
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
              width: '111px',
            }}
          >
            <Descriptions.Item label="Mô tả">
              {selectedDataDetail.description}
            </Descriptions.Item>
            <Descriptions.Item label="Loại">
              {selectedDataDetail.status}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {selectedDataDetail.isDelete === false ? 'Hiện' : 'Ẩn'}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  )
}
export default DetailTaskType
