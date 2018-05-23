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

export function signup(data) {
  return request_no_auth({
    url: '/user/signup',
    method: 'post',
    data
  })
}
export function preSignup(data) {
  return request_no_auth({
    url: '/user/pre-signup',
    method: 'post',
    data
  })
}
export function loginSignupFB(username, name) {
  return request_no_auth({
    url: '/user/fb-login',
    method: 'post',
    data: {
      username,
      name,
      facebook_id: username,
      email: username,
      password: username,
      active: true,
      id_number: '-',
      id_number_type: 'KTP',
      status: 'active',
      role: 'public'
    }
  })
}
export function loginSignupGmail(username, email, name, image) {
  return request_no_auth({
    url: '/user/gmail-login',
    method: 'post',
    data: {
      username,
      name,
      image,
      email: email,
      password: username,
      gmail_id: username,
      active: true,
      id_number: '-',
      id_number_type: 'KTP',
      status: 'active',
      role: 'public'
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
export function getInfoTest(token, user_id) {
  return request_no_auth({
    url: '/user-info/' + user_id,
    method: 'get'
  })
}
export function getUserByEmail(email) {
  return request_no_auth({
    url: '/user-by-email/' + email,
    method: 'get'
  })
}
export function logout() {
  return request_no_auth({
    url: '/user/logout',
    method: 'post'
  })
}
export function activate(data) {
  return request_no_auth({
    url: '/user-activation/' + data.code,
    method: 'get',
    data
  })
}
