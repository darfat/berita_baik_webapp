import request from '@/utils/request'

export function getSections(params) {
  return request({
    url: '/sections',
    method: 'get',
    params
  })
}
