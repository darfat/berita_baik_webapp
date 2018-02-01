import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/editorials',
    method: 'get',
    params
  })
}
