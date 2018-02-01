import request from '@/utils/request_default'

export function getList(params) {
  console.log(params)
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
