import { Button, Descriptions, Modal } from 'antd'

const DetailAnimal = ({
  isModalDetailOpen,
  closeModalDetail,
  selectedDataDetail,
}) => {
  return (
    <Modal
      title="Chi tiết vật nuôi"
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
            <Descriptions.Item label="Mã vật nuôi">
              {selectedDataDetail.externalId}
            </Descriptions.Item>
            <Descriptions.Item label="Loại">
              {selectedDataDetail.habitantTypeName}
            </Descriptions.Item>
            <Descriptions.Item label="Cân nặng">
              {selectedDataDetail.weight} KG
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính">
              {selectedDataDetail.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Khu vực">
              {selectedDataDetail.areaName}
            </Descriptions.Item>
            <Descriptions.Item label="Vùng">
              {selectedDataDetail.zoneName}
            </Descriptions.Item>
            <Descriptions.Item label="Chuồng">
              {selectedDataDetail.fieldName}
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
export default DetailAnimal
