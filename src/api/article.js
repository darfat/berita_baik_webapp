import request from '@/utils/request'
import request_auth from '@/utils/request_auth'

const NEWS_TYPE = 'news'
const VIDEO_TYPE = 'video'
const IMAGE_TYPE = 'image'

export function getListByEditorialSlug(params) {
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
    url: '/article-by-slug/' + params.slug,
    method: 'get'
  })
}
export function getArticleByID(params) {
  return request({
    url: '/articles/' + params.articleID,
    method: 'get'
  })
}

export function update(data) {
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
// citra
export function getLatestImageByEditorial(params) {
  params.type = IMAGE_TYPE
  return request({
    url: '/articles-editorial/latest/' + params.editorialSlug,
    method: 'get',
    params
  })
}

export function getImagesByEditorialSlug(params) {
  params.type = IMAGE_TYPE
  return request({
    url: '/articles-editorial/' + params.editorialSlug,
    method: 'get',
    params
  })
}

// video

export function getLatestVideoByEditorial(params) {
  params.type = VIDEO_TYPE
  return request({
    url: '/articles-editorial/latest/' + params.editorialSlug,
    method: 'get',
    params
  })
}

export function getVideosByEditorialSlug(params) {
  params.type = VIDEO_TYPE
  return request({
    url: '/articles-editorial/' + params.editorialSlug,
    method: 'get',
    params
  })
}

export function updatePublished(data) {
  return request_auth({
    url: '/article-update-published/' + data.article_id,
    method: 'put',
    data
  })
}
export function SearchArticles(params) {
  return request({
    url: '/articles-search/',
    method: 'get',
    params
  })
}
