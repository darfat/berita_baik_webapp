import router from './router'
// import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// const whiteList = ['/home', '/login'] // 不重定向白名单
const homePattern = '/home'
const loginPatttern = '/login'

router.beforeEach((to, from, next) => {
  console.log('1')
  NProgress.start()
  if (getToken()) {
    console.log('2')
    if (to.path === '/login') {
      console.log('3')
      next({ path: '/cms' })
    } else {
      console.log('4')
      // if (store.getters.roles.length === 0) {
      //   console.log('5')
      //   store.dispatch('GetInfo').then(res => { // 拉取用户信息
      //     next()
      //   }).catch(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error('验证失败,请重新登录')
      //       next({ path: '/home' })
      //     })
      //   })
      // } else {
      console.log('6')
      next()
      // }
    }
  } else {
    if (to.path && (to.path.startsWith(homePattern) || to.path.startsWith(loginPatttern))) {
      console.log('7')
      next()
    } else {
      console.log('8')
      next('/home')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
