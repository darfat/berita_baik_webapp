// import request from '@/utils/request'

const SECTION_LIST = [
  { 'slug': 'nasional',
    'value': 'nasional',
    'label': 'Nasional'
  },
  { 'slug': 'internasional',
    'value': 'internasional',
    'label': 'Internasional'
  }
]
export function getSections(params) {
  return SECTION_LIST
  // return request({
  //   url: '/sections',
  //   method: 'get',
  //   params
  // })
}
