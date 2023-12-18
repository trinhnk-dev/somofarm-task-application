import { useDispatch } from 'react-redux'
import DisplayNotification from './DisplayNotification/DisplayNotification'
import { changeNotifyIsRead } from 'features/slice/notification/notificationReadSlice'

const Notification = () => {
  const dispatch = useDispatch()

  const changeStatusNotify = (values) => {
    dispatch(changeNotifyIsRead(values))
  }

  const loadData = () => {
    // dispatch(getNotifyIsNewById(authServices.getUserId()))
  }

  return (
    <div>
      <DisplayNotification changeStatusNotify={changeStatusNotify} />
    </div>
  )
}
export default Notification
