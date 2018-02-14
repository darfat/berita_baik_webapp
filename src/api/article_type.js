// import request from '@/utils/request'

const ARTICLE_TYPE_LIST = [
  { 'slug': 'news',
    'value': 'news',
    'label': 'News'
  },
  { 'slug': 'video',
    'value': 'video',
    'label': 'Video'
  }
]
export function getArticleTypes(params) {
  return ARTICLE_TYPE_LIST
  // return request({
  //   url: '/article_types',
  //   method: 'get',
  //   params
  // })
}
