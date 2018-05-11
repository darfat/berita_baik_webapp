import request_auth from '@/utils/request_auth'

export function upload(data) {
  return request_auth({
    url: '/image/upload',
    method: 'post',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    },
    data
  })
}
export function uploadDataURI(data) {
  return request_auth({
    url: '/image/upload-v2',
    method: 'post',
    data
  })
}
