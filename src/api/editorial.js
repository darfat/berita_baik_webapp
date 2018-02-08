import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/editorials',
    method: 'get',
    params
  })
}
export function getEditorialIdBySlug(params) {
  return request({
    url: '/editorial-by-slug/' + params.slug,
    method: 'get'
  })
}

