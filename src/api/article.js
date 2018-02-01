import request from '@/utils/request'

export function getListByEditorialSlug(params) {
  return request({
    url: '/articles-editorial/' + params.editorialSlug,
    method: 'get'
  })
}
export function test(params) {
  return request({
    url: '/',
    method: 'get',
    params
  })
}
