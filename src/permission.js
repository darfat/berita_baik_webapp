import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// const whiteList = ['/home', '/login'] // 不重定向白名单
const homePattern = '/home'
const loginPatttern = '/login'
const signupPattern = '/signup'
const cmsLoginPattern = '/cms-login'
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      if (!store.getters.name) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next()
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            // Message.error('验证失败,请重新登录')
            next({ path: '/home' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (to.path && (to.path.startsWith(homePattern) || to.path.startsWith(loginPatttern) || to.path.startsWith(signupPattern) || to.path.startsWith(cmsLoginPattern))) {
      next()
    } else {
      next('/home')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
