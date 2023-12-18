import { Tabs } from 'antd'
import NotificationIsNew from './NotificationIsNew'
import NotificationAll from './NotificationAll'

const DisplayNotification = ({ changeStatusNotify }) => {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={[
          {
            key: '1',
            label: 'Tất cả',
            children: (
              <NotificationAll changeStatusNotify={changeStatusNotify} />
            ),
          },
          {
            key: '2',
            label: 'Chưa đọc',
            children: (
              <NotificationIsNew changeStatusNotify={changeStatusNotify} />
            ),
          },
        ]}
      />
    </>
  )
}
export default DisplayNotification
