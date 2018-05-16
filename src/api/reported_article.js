import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/article_repoteds',
    method: 'get',
    params
  })
}
export function create(data) {
  return request({
    url: '/article_repoteds',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/article_repoteds/' + data.id,
    method: 'put',
    data
  })
}
export function getEventById(data) {
  return request({
    url: '/article_repoteds/' + data.id,
    method: 'get'
  })
}
export function destroy(data) {
  return request({
    url: '/article_repoteds/' + data.id,
    method: 'delete'
  })
}

