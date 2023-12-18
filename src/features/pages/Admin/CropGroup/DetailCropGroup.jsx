import { Button, Collapse, Descriptions, Modal } from 'antd'
import { getListPlantInField } from 'features/slice/field/fieldListPlant'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
const { Panel } = Collapse

const DetailCropGroup = ({
  isModalDetailOpen,
  closeModalDetail,
  selectedDataDetail,
}) => {
  const fieldListPlant = useSelector((state) => state.fieldListPlant.data)
  const dispatch = useDispatch()
  useEffect(() => {
    if (selectedDataDetail) {
      dispatch(getListPlantInField(selectedDataDetail.id))
    }
  }, [dispatch])

  return (
    <Modal
      title="Chi tiết vườn"
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
            <Descriptions.Item label="Mã vườn">
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
          <Collapse accordion style={{ marginTop: '15px' }}>
            {fieldListPlant?.data?.map((plant, index) => (
              <Panel header={`${plant.name}`} key={index}>
                <Descriptions
                  layout="horizontal"
                  bordered
                  column={1}
                  labelStyle={{
                    width: '140px',
                  }}
                >
                  <Descriptions.Item label="Mã vật nuôi">
                    {plant.externalId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại cây trồng">
                    {plant.habitantTypeName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    {plant.status}
                  </Descriptions.Item>
                  <Descriptions.Item label="Chiều cao">
                    {plant.height} m
                  </Descriptions.Item>
                </Descriptions>
              </Panel>
            ))}
          </Collapse>
        </>
      )}
    </Modal>
  )
}
export default DetailCropGroup
