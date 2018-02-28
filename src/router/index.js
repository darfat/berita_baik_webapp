import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV)

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
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
    {
      path: 'editorial/:editorialSlug',
      name: 'editorial-menu',
      props: true,
      component: () => import('@/views/portal/editorial/index')
    },
    {
      path: 'article/:editorialSlug/:slug',
      name: 'article-detail',
      props: true,
      component: () => import('@/views/portal/article/index')
    },
    {
      path: 'infografis',
      name: 'infografis-menu',
      props: true,
      component: () => import('@/views/portal/infografis/index')
    },
    {
      path: 'infografis/:slug',
      name: 'infografis-detail',
      props: true,
      component: () => import('@/views/portal/infografis-detail/index')
    },
    {
      path: 'gallery',
      name: 'gallery-menu',
      props: true,
      component: () => import('@/views/portal/gallery/index')
    },
    {
      path: 'video',
      name: 'video-menu',
      props: true,
      component: () => import('@/views/portal/videog/index')
    },
    {
      path: 'tentang-kami',
      name: 'tentang-kami-menu',
      props: true,
      component: () => import('@/views/portal/aboutus/index')
    }]
  },
  { path: '/portal/login', component: () => import('@/views/portal/login/index'), hidden: true },
  { path: '/portal/signup', component: () => import('@/views/portal/signup/index'), hidden: true },

  // cms part
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/cms',
    component: Layout,
    redirect: '/cms/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  {
    path: '/editorial-articles',
    component: Layout,
    redirect: '/editorial-articles/indonesia-baik',
    name: 'Editorial',
    meta: { title: 'Editorial', icon: 'example' },
    children: [
      {
        path: 'indonesia-baik',
        name: 'indonesiaBaik',
        component: () => import('@/views/article/indonesiaBaik'),
        meta: { title: 'Indonesia Baik', icon: 'table' }
      },
      {
        path: 'indonesia-bangga',
        name: 'indonesiaBangga',
        component: () => import('@/views/article/indonesiaBangga'),
        meta: { title: 'Indonesia Bangga', icon: 'table' }
      },
      {
        path: 'form',
        name: 'article-form',
        props: true,
        component: () => import('@/views/article/form'),
        hidden: true
      },
      {
        path: 'new-article-indonesia-baik',
        name: 'indonesia-baik-form',
        props: true,
        component: () => import('@/views/article/indonesiaBaikForm'),
        hidden: true
      },
      {
        path: 'new-article-indonesia-bangga',
        name: 'indonesia-bangga-form',
        props: true,
        component: () => import('@/views/article/indonesiaBanggaForm'),
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
        component: () => import('@/views/tag/index'),
        meta: { title: 'Tag', icon: 'tag' }
      },
      {
        path: 'editorial',
        name: 'EditorialConfig',
        component: () => import('@/views/editorial/index'),
        meta: { title: 'Editorial', icon: 'editorial' }
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

