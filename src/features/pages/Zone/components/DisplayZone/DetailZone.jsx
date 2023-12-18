import { Button, Descriptions, Modal } from 'antd'

const DetailZone = ({
  isModalDetailOpen,
  closeModalDetail,
  selectedDataDetail,
}) => {
  return (
    <Modal
      title="Chi tiết vùng"
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
              width: '125px',
            }}
          >
            <Descriptions.Item label="Mã vùng">
              {selectedDataDetail.code}
            </Descriptions.Item>
            <Descriptions.Item label="Loại vùng">
              {selectedDataDetail.zoneTypeName}
            </Descriptions.Item>
            <Descriptions.Item label="Thuộc">
              {selectedDataDetail.areaName}
            </Descriptions.Item>
            <Descriptions.Item label="Diện tích">
              {selectedDataDetail.farmArea}
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
export default DetailZone
