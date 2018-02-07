import request from '@/utils/request'

export function getListByEditorialSlug(params) {
  console.log('call editorial by slug')
  console.log(params)
  return request({
    url: '/articles-editorial/' + params.editorialSlug,
    method: 'get'
  })
}
export function getAll(params) {
  return request({
    url: '/articles',
    method: 'get',
    params
  })
}
export function create(data) {
  const req = request({
    url: '/articles',
    method: 'post',
    // data: {
    //   title,
    //   content
    // }
    data
  })
  console.log(req)
  return req
}
