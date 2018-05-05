import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV)

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/admin/layout/Layout'
import HomeLayout from '../views/home/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // portal part
  {
    path: '/',
    component: HomeLayout,
    redirect: '/home',
    name: 'Home',
    hidden: true,
    children: [{
      path: 'home',
      component: () => import('@/views/home/index')
    },
    { // integrated
      path: 'home/:editorialSlug',
      name: 'editorial-menu',
      props: true,
      component: () => import('@/views/portal/editorial/index')
    },
    { // integrated
      path: 'home/:editorialType/:editorialSlug',
      name: 'editorial-by-type-menu',
      props: true,
      component: () => import('@/views/portal/editorial/index')
    },
    { // integrated
      path: 'home/a/:editorialSlug/:slug',
      name: 'article-detail-route',
      props: true,
      component: () => import('@/views/portal/article/index')
    },
    { // integrated
      path: 'home-c/:editorialSlug',
      name: 'editorial-image',
      props: true,
      component: () => import('@/views/portal/editorial-image/index')
    },
    { // integrated
      path: 'home-c/:editorialSlug/:slug',
      name: 'editorial-image-detail',
      props: true,
      component: () => import('@/views/portal/editorial-image/index')
    },
    { // integrated
      path: 'home-g/:editorialSlug',
      name: 'editorial-video',
      props: true,
      component: () => import('@/views/portal/editorial-video/index')
    },
    {
      path: 'home-g/:editorialSlug/:slug',
      name: 'editorial-video-detail',
      props: true,
      component: () => import('@/views/portal/editorial-video/index')
    },
    {
      path: 'home-m/infografis',
      name: 'infografis-menu',
      props: true,
      component: () => import('@/views/portal/infografis/index')
    },
    {
      path: 'home-m/i/:slug',
      name: 'infografis-detail-layout',
      props: true,
      component: () => import('@/views/portal/infografis-detail/index')
    },
    { // integrated
      path: 'home-m/gallery',
      name: 'gallery-menu',
      props: true,
      component: () => import('@/views/portal/gallery/index')
    },
    {
      path: 'home-m/video',
      name: 'video-menu',
      props: true,
      component: () => import('@/views/portal/videog/index')
    },
    { // static
      path: 'home-page/tentang-kami',
      name: 'tentang-kami-menu',
      props: true,
      component: () => import('@/views/portal/aboutus/index')
    },
    {
      path: 'home-search/s/:keyword',
      name: 'search-home',
      props: true,
      component: () => import('@/views/portal/search/index')
    },
    {
      path: 'home-search/search-advanced',
      name: 'search-advanced',
      props: true,
      component: () => import('@/views/portal/search/advanced')
    },
    {
      path: 'home-m/event-calendar',
      name: 'event-calendar',
      props: true,
      component: () => import('@/views/portal/eventcalendar/index')
    }]
  },
  // cms part
  { path: '/plogin', component: () => import('@/views/portal/login/index'), hidden: true },
  // public
  { path: '/login', name: 'public-login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/signup', name: 'public-signup', component: () => import('@/views/portal/signup/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/cms',
    component: Layout,
    redirect: '/cms/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/admin/dashboard/index')
    }]
  },
  {
    path: '/editorial-articles',
    component: Layout,
    redirect: '/editorial-articles/indonesia-baik',
    name: 'admin-editorial',
    meta: { title: 'Editorial', icon: 'example' },
    children: [
      {
        path: 'l/indonesia-baik',
        name: 'admin-indonesia-baik-list',
        component: () => import('@/views/admin/article/indonesiaBaik'),
        meta: { title: 'Indonesia Baik', icon: 'table' }
      },
      {
        path: 'l/indonesia-bangga',
        name: 'admin-indonesia-bangga-list',
        component: () => import('@/views/admin/article/indonesiaBangga'),
        meta: { title: 'Indonesia Bangga', icon: 'table' }
      },
      {
        path: 'l/sosok-inspiratif',
        name: 'admin-sosok-inspiratif-list',
        component: () => import('@/views/admin/article/sosokInspiratif'),
        meta: { title: 'Sosok Inspiratif', icon: 'table' }
      },
      {
        path: 'l/gallery-foto',
        name: 'admin-gallery-foto-list',
        component: () => import('@/views/admin/article/citra'),
        meta: { title: 'Citra', icon: 'table' }
      },
      {
        path: 'f/:editorialSlug',
        name: 'admin-article-form',
        props: true,
        component: () => import('@/views/admin/article/form'),
        hidden: true
      }
    ]
  },
  {
    path: '/events',
    component: Layout,
    redirect: '/events/list',
    name: 'Events',
    meta: { title: 'Events', icon: 'calendar' },
    children: [
      {
        path: 'list',
        name: 'event-list',
        component: () => import('@/views/admin/event/list'),
        meta: { title: 'Events', icon: 'calendar' }
      },
      {
        path: 'form',
        name: 'event-form',
        component: () => import('@/views/admin/event/form'),
        props: true,
        hidden: true
      }
    ]
  },
  {
    path: '/configuration',
    component: Layout,
    redirect: '/configuration/tag',
    name: 'Configuration',
    meta: { title: 'Configuration', icon: 'example' },
    children: [
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('@/views/admin/tag/index'),
        meta: { title: 'Tag', icon: 'tag' }
      },
      {
        path: 'editorial',
        name: 'EditorialConfig',
        component: () => import('@/views/admin/editorial/index'),
        meta: { title: 'Editorial', icon: 'editorial' }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: 'noredirect',
    name: 'Settings',
    meta: { title: 'Settings', icon: 'example' },
    children: [
      {
        path: '/settings/my-account',
        component: () => import('@/views/admin/settings/my-account/index'),
        redirect: 'noredirect',
        name: 'myAccount',
        meta: { title: 'My Account', icon: 'user' },
        children: [
          { path: 'edit-profile',
            component: () => import('@/views/admin/settings/my-account/profile/edit'),
            name: 'editProfile',
            meta: { title: 'Edit Profile', icon: 'user' }
          },
          { path: 'change-password',
            component: () => import('@/views/admin/settings/my-account/password/edit'),
            name: 'ChangePassword',
            meta: { title: 'Change Password', icon: 'password' }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

