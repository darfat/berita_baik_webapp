import request_auth from '@/utils/request_auth'

export function getUsers(params) {
  return request_auth({
    url: '/users',
    method: 'get',
    params
  })
}
