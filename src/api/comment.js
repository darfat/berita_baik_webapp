import request from '@/utils/request'
import request_auth from '@/utils/request_auth'

export function getCommentsByArticleID(params) {
  return request({
    url: '/article_comments/by_article/' + params.articleID,
    method: 'get',
    params
  })
}

export function create(data) {
  return request_auth({
    url: '/article_comments',
    method: 'post',
    data
  })
}

export function destroy(data) {
  return request_auth({
    url: '/article_comments/' + data.article_comment_id,
    method: 'delete'
  })
}
