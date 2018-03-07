import request from '@/utils/request'

export function getTopslideArticles(params) {
  return request({
    url: '/topslide_articles',
    method: 'get',
    params
  })
}
