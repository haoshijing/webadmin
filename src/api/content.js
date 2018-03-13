import http from '@/utils/fetch'

export function queryContentList(contentRequestVo) {
  const url = '/conent/selectList'
  return http.post(url, JSON.stringify(contentRequestVo))
}
export function queryContentCount(contentRequestVo) {
  const url = '/conent/selectCount'
  return http.post(url, JSON.stringify(contentRequestVo))
}

export function insertContent(contentVo) {
  const url = '/conent/insertContent'
  return http.post(url, JSON.stringify(contentVo))
}
