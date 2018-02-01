import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/tags',
    method: 'get',
    params
  })
}
