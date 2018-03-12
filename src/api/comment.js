import request from '@/utils/request'

export function getCommentsByArticleID(params) {
  return request({
    url: '/article_comments/by_article/' + params.articleID,
    method: 'get',
    params
  })
}
