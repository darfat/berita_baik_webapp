import request_auth from '@/utils/request_auth'
import request from '@/utils/request'

export function getAll(params) {
  return request_auth({
    url: '/advertisements',
    method: 'get',
    params
  })
}
export function create(data) {
  return request_auth({
    url: '/advertisements',
    method: 'post',
    data
  })
}
export function update(data) {
  return request_auth({
    url: '/advertisements/' + data.id,
    method: 'put',
    data
  })
}
export function getAdvertisementById(data) {
  return request_auth({
    url: '/advertisements/' + data.advertisementID,
    method: 'get'
  })
}
export function destroy(data) {
  return request_auth({
    url: '/advertisements/' + data.advertisementID,
    method: 'delete'
  })
}

export function getAdvertisementByPosition(params) {
  return request({
    url: '/ads-by-position/' + params.position,
    method: 'get'
  })
}
