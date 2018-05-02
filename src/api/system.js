import http from '@/utils/fetch'

export function getAll() {
  const url = '/system/getAll'
  return http.get(url)
}
