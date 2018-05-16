import request_auth from '@/utils/request_auth'

export function getAll(params) {
  return request_auth({
    url: '/article_repoteds',
    method: 'get',
    params
  })
}
export function create(data) {
  return request_auth({
    url: '/article_repoteds',
    method: 'post',
    data
  })
}
export function update(data) {
  return request_auth({
    url: '/article_repoteds/' + data.id,
    method: 'put',
    data
  })
}
export function getEventById(data) {
  return request_auth({
    url: '/article_repoteds/' + data.eventID,
    method: 'get'
  })
}
export function destroy(data) {
  return request_auth({
    url: '/article_repoteds/' + data.eventID,
    method: 'delete'
  })
}

