import { Button, Descriptions, Image, Modal } from 'antd'

const DetailMaterial = ({
  isModalDetailOpen,
  closeModalDetail,
  selectedDataDetail,
}) => {
  return (
    <Modal
      title="Chi tiết công cụ"
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
            <Descriptions.Item label="Hình ảnh">
              <Image
                src={selectedDataDetail.urlImage}
                style={{
                  maxWidth: '300px',
                  maxHeight: '150px',
                  objectFit: 'cover',
                }}
              />
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
export default DetailMaterial
