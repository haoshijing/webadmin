import http from '@/utils/fetch'

export function queryList(payVo) {
  const url = '/pay/selectList'
  return http.post(url, JSON.stringify(payVo))
}
export function queryCount(payVo) {
  const url = '/pay/selectCount'
  return http.post(url, JSON.stringify(payVo))
}

