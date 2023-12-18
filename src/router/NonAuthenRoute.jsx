import { Navigate } from 'react-router'
import { authServices } from 'services/authServices'

const NonAuthenRoute = ({ children }) => {
  return authServices.getToken() === null ? (
    children
  ) : (
    <Navigate to="/page-not-found" />
  )
}
export default NonAuthenRoute
