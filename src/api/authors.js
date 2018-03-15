import request from '@/utils/request'

export function getAuthorsByArticleID(params) {
  return request({
    url: '/article_authors/by_article/' + params.articleID,
    method: 'get',
    params
  })
}
