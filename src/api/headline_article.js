import request from '@/utils/request'

export function getHeadlineArticles(params) {
  return request({
    url: '/headline_articles',
    method: 'get',
    params
  })
}
