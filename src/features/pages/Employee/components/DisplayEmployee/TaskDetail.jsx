import { Button, Modal } from 'antd'
import TaskContent from 'features/pages/Task/components/TaskDetail/TaskContent'
import { getEvidenceByTaskId } from 'features/slice/task/taskEvidenceSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import TaskEvidence from './TaskEvidence'

const TaskDetail = ({ selectedTask, isModalDetailOpen, closeModalDetail }) => {
  const taskData = selectedTask?.data
  const evidenceData = useSelector((state) => state.evidence.data)
  const dispatch = useDispatch()

  useEffect(() => {
    if (taskData) {
      dispatch(getEvidenceByTaskId(taskData.id))
    }
  }, [dispatch, taskData])

  return (
    <Modal
      title="Chi tiết công việc"
      open={isModalDetailOpen}
      closeIcon
      onCancel={closeModalDetail}
      footer={[<Button onClick={closeModalDetail}>Đóng</Button>]}
      width={1200}
      className="modal-detail"
      style={{ maxWidth: '90%', margin: '0 auto' }}
    >
      <TaskContent taskData={taskData} />
      <TaskEvidence evidenceData={evidenceData} taskData={taskData} />
    </Modal>
  )
}
export default TaskDetail
