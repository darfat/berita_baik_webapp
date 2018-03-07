import request from '@/utils/request'

export function getPopularArticles(params) {
  return request({
    url: '/popular_articles',
    method: 'get',
    params
  })
}
