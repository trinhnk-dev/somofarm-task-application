import jwt_decode from 'jwt-decode'

const getToken = () => {
  const token = localStorage.getItem('somoFarm')
  if (token) {
    return token
  }
  return null
}

const getRole = () => {
  const token = getToken()
  if (token) {
    const payload = jwt_decode(token)
    const decodedRole =
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return decodedRole
  }
  return null
}

const getUserName = () => {
  const token = getToken()
  if (token) {
    const payload = jwt_decode(token)
    const decodedUserName =
      payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    return decodedUserName
  }
  return null
}

const getUserId = () => {
  const token = getToken()
  if (token) {
    const payload = jwt_decode(token)
    return payload?.Id
  }
  return null
}

const logOut = () => {
  localStorage.removeItem('somoFarm')
  localStorage.removeItem('connectionId')
  localStorage.clear()
}

export const authServices = {
  getToken,
  getRole,
  getUserName,
  getUserId,
  logOut,
}
