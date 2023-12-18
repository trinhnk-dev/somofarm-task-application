import { Button } from 'antd'
import { useState } from 'react'
import FormAddMember from './FormAddMember'

const AddMember = ({ farmId, onFinishCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="animal-group-content content">
        <h3>Nhân sự</h3>

        <div className="animal-group-operate">
          <div className="animal-group-operate-left">
            <Button type="primary" onClick={openModal}>
              Thêm nhân sự
            </Button>

            <FormAddMember
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              farmId={farmId}
              onFinishCreate={onFinishCreate}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default AddMember
