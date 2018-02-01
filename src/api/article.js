import request from '@/utils/request'

export function getListByEditorialSlug(params) {
  return request({
    url: '/articles-editorial/' + params.editorialSlug,
    method: 'get'
  })
}
export function getAll(params) {
  return request({
    url: '/articles',
    method: 'get',
    params
  })
}
