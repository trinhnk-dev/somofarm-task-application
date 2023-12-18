import { Button, Descriptions, Modal } from 'antd'

const DetailArea = ({
  isModalDetailOpen,
  closeModalDetail,
  selectedDataDetail,
}) => {
  return (
    <Modal
      title="Chi tiết khu vực"
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
            <Descriptions.Item label="Mã khu vực">
              {selectedDataDetail.code}
            </Descriptions.Item>
            <Descriptions.Item label="Thuộc">
              {selectedDataDetail.farmName}
            </Descriptions.Item>
            <Descriptions.Item label="Diện tích">
              {selectedDataDetail.fArea}
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
export default DetailArea
