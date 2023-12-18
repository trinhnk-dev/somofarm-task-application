import { Navigate } from 'react-router'
import { authServices } from 'services/authServices'

const PrivateRoute = ({ children }) => {
  return authServices.getRole() === 'Manager' ? (
    children
  ) : (
    <Navigate to="/page-not-found" />
  )
}
export default PrivateRoute
