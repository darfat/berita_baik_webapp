import request from '@/utils/request'

const NEWS_TYPE = 'news'

export function getListByEditorialSlug(params) {
  console.log(params)
  return request({
    url: '/articles-editorial/' + params.editorialSlug,
    method: 'get',
    params
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
    url: '/articles/' + params.articleID,
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

export function getLatestNewsByEditorial(params) {
  params.type = NEWS_TYPE
  return request({
    url: '/articles-editorial/latest/' + params.editorialSlug,
    method: 'get',
    params
  })
}

export function getNewsByEditorialSlug(params) {
  params.type = NEWS_TYPE
  return request({
    url: '/articles-editorial/' + params.editorialSlug,
    method: 'get',
    params
  })
}

export function getLatestNewsAll(params) {
  params.type = NEWS_TYPE
  return request({
    url: '/articles-all/latest',
    method: 'get',
    params
  })
}
