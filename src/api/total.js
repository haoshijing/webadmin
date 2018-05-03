import http from '@/utils/fetch'

export function queryList(requestVo) {
  const url = '/total/selectList'
  return http.post(url, JSON.stringify(requestVo))
}
export function queryCount(requestVo) {
  const url = '/total/selectCount'
  return http.post(url, JSON.stringify(requestVo))
}

