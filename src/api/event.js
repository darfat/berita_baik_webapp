import request_auth from '@/utils/request_auth'

export function getAll(params) {
  return request_auth({
    url: '/events',
    method: 'get',
    params
  })
}
export function create(data) {
  return request_auth({
    url: '/events',
    method: 'post',
    data
  })
}
export function update(data) {
  return request_auth({
    url: '/events/' + data.id,
    method: 'put',
    data
  })
}
export function getEventById(data) {
  return request_auth({
    url: '/events/' + data.eventID,
    method: 'get'
  })
}
export function destroy(data) {
  return request_auth({
    url: '/events/' + data.eventID,
    method: 'delete'
  })
}

