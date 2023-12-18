import { Navigate } from 'react-router'
import { authServices } from 'services/authServices'

const AdminPrivateRoute = ({ children }) => {
  return authServices.getRole() === 'Admin' ? (
    children
  ) : (
    <Navigate to="/page-not-found" />
  )
}
export default AdminPrivateRoute
