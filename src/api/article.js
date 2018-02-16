import request from '@/utils/request'

export function getListByEditorialSlug(params) {
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
  return request({
    url: '/articles',
    method: 'post',
    data
  })
}
export function getArticle(params) {
  return request({
    url: '/articles/' + params.articleId,
    method: 'get'
  })
}
export function update(data) {
  console.log(data)
  return request({
    url: '/articles/' + data.id,
    method: 'put',
    data
  })
}
