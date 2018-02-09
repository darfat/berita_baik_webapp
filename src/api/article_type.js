import request from '@/utils/request'

export function getArticleTypes(params) {
  return request({
    url: '/article_types',
    method: 'get',
    params
  })
}
