import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will no redirct in the levelbar
* noDropdown : if `noDropdown:true` will has no submenu
* meta : { role: ['admin'] }  will control the page role
**/
export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  },
  {
    path: '/user/updatepwd',
    component: Layout,
    redirect: 'user/updatepwd',
    icon: 'people',
    noDropdown: true,
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/record',
    component: Layout,
    name: '报表管理',
    meta: {
      title: '报表管理',
      icon: 'component'
    },
    children: [
      { path: 'monthlist', component: _import('extend/month/index'), name: '月报表', meta: { title: '月报表' }},
      { path: 'weeklist', component: _import('extend/week/index'), name: '周报表', meta: { title: '周报表' }},
      { path: 'paylist', component: _import('extend/pay/index'), name: '流水明细', meta: { title: '流水明细' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
