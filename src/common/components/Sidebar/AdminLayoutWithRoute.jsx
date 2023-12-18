import { Layout } from 'antd'
import AdminSideMenu from './AdminSideMenu'

const { Content } = Layout

const AdminLayoutWithRoute = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminSideMenu />
      <Layout className="site-layout">
        <Content style={{ margin: '20px 16px' }}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayoutWithRoute
