import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/user_subscribers',
    method: 'get',
    params
  })
}
export function create(data) {
  return request({
    url: '/user_subscribers',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/user_subscribers/' + data.id,
    method: 'put',
    data
  })
}
export function getEventById(data) {
  return request({
    url: '/user_subscribers/' + data.eventID,
    method: 'get'
  })
}
export function destroy(data) {
  return request({
    url: '/user_subscribers/' + data.eventID,
    method: 'delete'
  })
}

