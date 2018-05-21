import request_auth from '@/utils/request_auth'

export function getUsers(params) {
  return request_auth({
    url: '/users',
    method: 'get',
    params
  })
}
export function getAll(params) {
  return request_auth({
    url: '/users-paging',
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
export function getUserById(data) {
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
