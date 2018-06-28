import request from '@/utils/request'
import request_auth from '@/utils/request_auth'

const NEWS_TYPE = 'news'
const VIDEO_TYPE = 'video'
// const IMAGE_TYPE = 'image'
// const Y_IMAGE_TYPE = 'y-image'

export function getListByEditorialSlug(params) {
  return request_auth({
    url: '/admin-articles-editorial/' + params.editorialSlug,
    method: 'get',
    params
  })
}
export function getListDraftByEditorialSlug(params) {
  return request_auth({
    url: '/admin-draft-articles-editorial/' + params.editorialSlug,
    method: 'get',
    params
  })
}
export function searchListByEditorialSlug(params) {
  return request_auth({
    url: '/admin-search-articles-editorial/' + params.editorialSlug,
    method: 'get',
    params
  })
}
export function getMyListByEditorialSlug(params) {
  return request_auth({
    url: '/admin-my-articles-editorial/' + params.editorialSlug + '/' + params.userID,
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
export function getLatestArticleAll(params) {
  return request_auth({
    url: '/articles-all/opts',
    method: 'get',
    params
  })
}
export function getEditorsPickNewss(params) {
  return request({
    url: '/article-by-editor-pick',
    method: 'get',
    params
  })
}

// citra
export function getLatestImageByEditorial(params) {
  return request({
    url: '/articles-editorial/latest/' + params.editorialSlug,
    method: 'get',
    params
  })
}

export function getImagesByEditorialSlug(params) {
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
export function setAsAdvert(data) {
  return request_auth({
    url: '/article-set-as-advert/' + data.editorial_id + '/' + data.article_id,
    method: 'put',
    data
  })
}
export function updateArticleSharedCount(data) {
  return request({
    url: '/article-update-shared-count/' + data.articleID,
    method: 'put',
    data
  })
}
export function updateArticleLikeCount(data) {
  return request({
    url: '/article-update-like-count/' + data.articleID,
    method: 'put',
    data
  })
}
export function updateArticleCommentCount(data) {
  return request({
    url: '/article-update-comment-count/' + data.articleID,
    method: 'put',
    data
  })
}
export function articleLikeUnlike(data) {
  return request({
    url: '/article-like-unlike',
    method: 'post',
    data
  })
}
export function getArticleLoveState(data) {
  return request_auth({
    url: '/article-like-state/' + data.article_id + '/' + data.user_id,
    method: 'get',
    data
  })
}
export function updateArticleViewedCount(data) {
  return request({
    url: '/article-update-viewed-count/' + data.articleID,
    method: 'put',
    data
  })
}

