import request from '@/utils/request'

export function getRelatesByArticleID(params) {
  return request({
    url: '/article_relates/by_article/' + params.articleID,
    method: 'get',
    params
  })
}
