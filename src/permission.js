import router from './router'
import store from './store'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
// function hasPermission(perms, permissions) {
//   if (perms.indexOf('*') >= 0) return true // admin permission passed directly
//   if (!permissions) return true
//   return perms.some(perm => permissions.indexOf(perm) >= 0)
// }

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    }
     else {
       console.log("判断是否已拉取完user_info信息")
       console.log("store.getters.userId",store.getters.userId)
      if (store.getters.userId === '') { // 判断当前用户是否已拉取完user_info信息
       console.log("判断是否已拉取完user_info信息2")
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          // const perms = res.data.perms // note: perms must be a array! such as: ['GET /aaa','POST /bbb']
          // store.dispatch('GenerateRoutes', { perms }).then(() => { // 根据perms权限生成可访问的路由表
          //   for (let i = 0; i < store.getters.addRoutes.length; i++) {
          //     router.addRoute(store.getters.addRoutes[i])
          //   }

          //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          // })
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            ElMessage.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.perms, to.meta.perms)) {
          next()
        // }
        // else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true } })
        // }
        // 可删 ↑
      }
    }
  }
  else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
