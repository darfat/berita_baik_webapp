import request from '@/utils/request'
import request_no_auth from '@/utils/request_no_auth'
export function login(username, password) {
  return request_no_auth({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token, user_id) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token, user_id }
  })
}

export function logout() {
  return request_no_auth({
    url: '/user/logout',
    method: 'post'
  })
}
