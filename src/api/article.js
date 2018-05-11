import request from '@/utils/request'
import request_auth from '@/utils/request_auth'

const NEWS_TYPE = 'news'
const VIDEO_TYPE = 'video'
const IMAGE_TYPE = 'image'

export function getListByEditorialSlug(params) {
  return request({
    url: '/admin-articles-editorial/' + params.editorialSlug,
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

export function softDelete(data) {
  return request_auth({
    url: '/article-delete/' + data.article_id,
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
  if (!params.type) {
    params.type = NEWS_TYPE
  }
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

export function getEditorsPickNewss(params) {
  params.type = NEWS_TYPE
  return request({
    url: '/article-by-editor-pick',
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

export function getEditorsPickVideos(params) {
  params.type = VIDEO_TYPE
  return request({
    url: '/article-by-editor-pick',
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
export function SearchArticlesByDateAndReporter(params) {
  return request({
    url: '/articles-search-advanced',
    method: 'get',
    params
  })
}
export function getCountImage(data) {
  return request({
    url: '/article-image-count/' + data.article_id,
    method: 'get'
  })
}
export function getArticleImages(data) {
  return request({
    url: '/article-image-by-article/' + data.article_id,
    method: 'get'
  })
}
export function getNextArticle(params) {
  return request({
    url: '/article-next/' + params.editorialSlug + '/' + params.articleID,
    method: 'get',
    params
  })
}
export function getPreviousArticle(params) {
  return request({
    url: '/article-previous/' + params.editorialSlug + '/' + params.articleID,
    method: 'get',
    params
  })
}
// top slider
export function setAsBeritaUtama(data) {
  return request_auth({
    url: '/article-set-as-berita-utama/' + data.editorial_id + '/' + data.article_id,
    method: 'put',
    data
  })
}
export function setAsHeadline(data) {
  return request_auth({
    url: '/article-set-as-headline/' + data.editorial_id + '/' + data.article_id,
    method: 'put',
    data
  })
}
export function setAsPilihanEditor(data) {
  return request_auth({
    url: '/article-set-as-pilihan-editor/' + data.editorial_id + '/' + data.article_id,
    method: 'put',
    data
  })
}
