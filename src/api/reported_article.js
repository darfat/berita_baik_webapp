import request_auth from '@/utils/request_auth'

export function getAll(params) {
  return request_auth({
    url: '/article_reporteds',
    method: 'get',
    params
  })
}
export function create(data) {
  return request_auth({
    url: '/article_reporteds',
    method: 'post',
    data
  })
}
export function update(data) {
  return request_auth({
    url: '/article_reporteds/' + data.id,
    method: 'put',
    data
  })
}
export function getById(data) {
  return request_auth({
    url: '/article_reporteds/' + data.id,
    method: 'get'
  })
}
export function destroy(data) {
  return request_auth({
    url: '/article_reporteds/' + data.id,
    method: 'delete'
  })
}

