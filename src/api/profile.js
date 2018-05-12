import request_auth from '@/utils/request_auth'

export function getAll(params) {
  return request_auth({
    url: '/users',
    method: 'get',
    params
  })
}
export function create(data) {
  return request_auth({
    url: '/users',
    method: 'post',
    data
  })
}
export function update(data) {
  return request_auth({
    url: '/users/' + data.id,
    method: 'put',
    data
  })
}
export function getProfileById(data) {
  return request_auth({
    url: '/users/' + data.userID,
    method: 'get'
  })
}
export function destroy(data) {
  return request_auth({
    url: '/users/' + data.userID,
    method: 'delete'
  })
}
export function validatePassword(userID, password) {
  return request_auth({
    url: '/user-validate-password/' + userID + '/' + password,
    method: 'get'
  })
}
export function changePassword(data) {
  return request_auth({
    url: '/user-change-password/' + data.id,
    method: 'put',
    data
  })
}
