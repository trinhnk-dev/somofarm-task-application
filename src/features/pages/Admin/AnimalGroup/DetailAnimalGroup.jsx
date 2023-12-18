import { Button, Collapse, Descriptions, Modal } from 'antd'
import { getListAnimalInField } from 'features/slice/field/fieldListAnimal'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const { Panel } = Collapse

const DetailAnimalGroup = ({
  isModalDetailOpen,
  closeModalDetail,
  selectedDataDetail,
}) => {
  const fieldListAnimal = useSelector((state) => state.fieldListAnimal.data)
  const dispatch = useDispatch()
  useEffect(() => {
    if (selectedDataDetail) {
      dispatch(getListAnimalInField(selectedDataDetail.id))
    }
  }, [dispatch])

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
          <Collapse accordion style={{ marginTop: '15px' }}>
            {fieldListAnimal?.data?.map((animal, index) => (
              <Panel header={`${animal.name}`} key={index}>
                <Descriptions layout="horizontal" bordered column={1}>
                  <Descriptions.Item label="Mã vật nuôi">
                    {animal.externalId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giới tính">
                    {animal.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại vật nuôi">
                    {animal.habitantTypeName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    {animal.status}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cân nặng">
                    {animal.weight} kg
                  </Descriptions.Item>

                  {/* Thêm các Descriptions.Item khác nếu cần */}
                </Descriptions>
              </Panel>
            ))}
          </Collapse>
        </>
      )}
    </Modal>
  )
}
export default DetailAnimalGroup
