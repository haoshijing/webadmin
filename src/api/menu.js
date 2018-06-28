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

export function queryParentMenu() {
  const url = '/menu/queryParentMenu'
  return http.post(url)
}

export function queryMenuListForContent() {
  const url = '/menu/queryMenuListForContent'
  return http.post(url)
}

export function updateMenu(menuVo) {
  const url = '/menu/updateMenu'
  return http.post(url, JSON.stringify(menuVo))
}

export function updateStatus(id) {
  const url = '/menu/updateStatus/'.concat(id)
  return http.get(url)
}
