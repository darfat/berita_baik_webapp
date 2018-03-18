import request from '@/utils/request'

export function getCommentsByArticleID(params) {
  return request({
    url: '/article_comments/by_article/' + params.articleID,
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: '/article_comments',
    method: 'post',
    data
  })
}
