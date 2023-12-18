import { Button, Descriptions, Modal } from 'antd'

const DetailAnimalType = ({
  isModalDetailOpen,
  closeModalDetail,
  selectedDataDetail,
}) => {
  return (
    <Modal
      title="Chi tiết loại vật nuôi"
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
              width: '160px',
            }}
          >
            <Descriptions.Item label="Nguồn gốc">
              {selectedDataDetail.origin}
            </Descriptions.Item>
            <Descriptions.Item label="Thuộc">
              {selectedDataDetail.farmName}
            </Descriptions.Item>
            <Descriptions.Item label="Môi trường sống">
              {selectedDataDetail.environment}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {selectedDataDetail.description}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {selectedDataDetail.isActive === true
                ? 'Tồn tại'
                : 'Không tồn tại'}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  )
}
export default DetailAnimalType
