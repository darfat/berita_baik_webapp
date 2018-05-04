import request from '@/utils/request'
// const NEWS_TYPE = 'news'

export function getPopularArticles(params) {
  return request({
    url: '/article/popular',
    method: 'get',
    params
  })
}
