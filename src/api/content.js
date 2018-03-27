import http from '@/utils/fetch'

export function queryContentList(contentRequestVo) {
  const url = '/content/selectList'
  return http.post(url, JSON.stringify(contentRequestVo))
}
export function queryContentCount(contentRequestVo) {
  const url = '/content/selectCount'
  return http.post(url, JSON.stringify(contentRequestVo))
}

export function insertContent(contentVo) {
  const url = '/content/insertContent'
  return http.post(url, JSON.stringify(contentVo))
}

export function updateContent(contentVo) {
  const url = '/content/updateContent'
  return http.post(url, contentVo)
}

export function deleteContent(id) {
  const url = '/content/deleteContent/'.concat(id)
  return http.get(url)
}
