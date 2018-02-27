import request from '@/utils/request'

const editorialMap = new Map()
editorialMap.set('indonesia-baik', 'INDONESIA BAIK')
editorialMap.set('indonesia-membangun', 'INDONESIA MEMBANGUN')
editorialMap.set('indonesia-bangga', 'INDONESIA BANGGA')
editorialMap.set('melancong', 'MELANCONG')
editorialMap.set('teknologi', 'TEKNOLOGI')
editorialMap.set('panggung', 'PANGGUNG')
editorialMap.set('citra', 'CITRA')

export function getAll(params) {
  return request({
    url: '/editorials',
    method: 'get',
    params
  })
}
export function getEditorialIdBySlug(params) {
  return request({
    url: '/editorial-by-slug/' + params.slug,
    method: 'get'
  })
}

export function getEditorialLabelBySlug(slug) {
  return editorialMap.get(slug)
}

