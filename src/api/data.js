import http from '@/utils/fetch'

export function queryList(requestVo) {
  const url = '/api/admin/selectList'
  return http.post(url, JSON.stringify(requestVo))
}
export function queryCount(requestVo) {
  const url = '/api/admin/selectCount'
  return http.post(url, JSON.stringify(requestVo))
}

export function updateData(requestVo) {
  const url = '/api/admin/updateData'
  return http.post(url, JSON.stringify(requestVo))
}

