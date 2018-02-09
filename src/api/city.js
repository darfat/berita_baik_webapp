import request from '@/utils/request'

export function getCities(params) {
  return request({
    url: '/cities',
    method: 'get',
    params
  })
}
