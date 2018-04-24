import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserIdKey = 'BB-UseridKey'
// const AppToken = process.env.APP_TOKEN
export function getToken() {
  const token = Cookies.get(TokenKey)
  return token
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserId(userId) {
  return Cookies.set(UserIdKey, userId)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}
