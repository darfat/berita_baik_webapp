import request from '@/utils/request'

export function upload({ imageAttachment }) {
  return request({
    url: '/image/upload',
    method: 'post',
    data: { imageAttachment
    }
  })
}

