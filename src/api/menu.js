import http from '@/utils/fetch'

export function queryMenuList(menuVo) {
  const url = '/menu/selectList'
  return http.post(url, JSON.stringify(menuVo))
}
export function queryMenuCount(menuVo) {
  const url = '/menu/selectCount'
  return http.post(url, JSON.stringify(menuVo))
}

export function insertMenu(menuVo) {
  const url = '/menu/insertMenu'
  return http.post(url, JSON.stringify(menuVo))
}
