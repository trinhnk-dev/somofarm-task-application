import { Button, Descriptions, Modal } from 'antd'

const DetailAnimalGroup = ({
  isModalDetailOpen,
  closeModalDetail,
  selectedDataDetail,
}) => {
  return (
    <Modal
      title="Chi tiết chuồng"
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
              width: '140px',
            }}
          >
            <Descriptions.Item label="Mã chuồng">
              {selectedDataDetail.code}
            </Descriptions.Item>

            <Descriptions.Item label="Diện tích">
              {selectedDataDetail.area} m2
            </Descriptions.Item>

            <Descriptions.Item label="Thuộc vùng">
              {selectedDataDetail.zoneName}
            </Descriptions.Item>
            <Descriptions.Item label="Thuộc khu vực">
              {selectedDataDetail.areaName}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {selectedDataDetail.isDelete === false
                ? 'Tồn tại'
                : 'Không tồn tai'}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  )
}
export default DetailAnimalGroup
