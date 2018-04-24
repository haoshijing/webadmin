import http from '@/utils/fetch'

export function queryList(requestVo) {
  const url = '/dev/queryList'
  return http.post(url, JSON.stringify(requestVo))
}
export function queryCount(requestVo) {
  const url = '/dev/queryCount'
  return http.post(url, JSON.stringify(requestVo))
}

export function updateData(requestVo) {
  const url = '/dev/updateData'
  return http.post(url, JSON.stringify(requestVo))
}

