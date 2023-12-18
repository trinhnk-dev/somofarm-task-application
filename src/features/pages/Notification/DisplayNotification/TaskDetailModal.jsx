import { Modal } from 'antd'
import TaskEvidence from 'features/pages/Employee/components/DisplayEmployee/TaskEvidence'
import TaskContent from 'features/pages/Task/components/TaskDetail/TaskContent'
import { getTaskById } from 'features/slice/task/taskByIdSlice'
import { getEvidenceByTaskId } from 'features/slice/task/taskEvidenceSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const TaskDetailModal = ({ selectedData, isModalOpen, closeModal }) => {
  const dispatch = useDispatch()
  const evidenceData = useSelector((state) => state.evidence.data)
  const taskById = useSelector((state) => state.taskById.data)

  const taskData = taskById?.data

  useEffect(() => {
    if (selectedData) {
      dispatch(getEvidenceByTaskId(selectedData))
      dispatch(getTaskById(selectedData))
    }
  }, [dispatch, selectedData])

  return (
    <Modal
      title="Chi tiết công việc"
      open={isModalOpen}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
      width={1200}
      className="modal-detail"
      style={{ maxWidth: '90%', margin: '0 auto' }}
    >
      <TaskContent taskData={taskData} />
      <TaskEvidence evidenceData={evidenceData} taskData={taskData} />
    </Modal>
  )
}

export default TaskDetailModal
