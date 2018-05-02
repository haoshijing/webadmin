import http from '@/utils/fetch'

export function getAll(requestVo) {
  const url = '/system/getall'
  return http.get(url)
}
