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
  { path: '/cms-login', component: () => import('@/views/admin/login/index'), hidden: true },
  // public
  { path: '/login', name: 'public-login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/signup', name: 'public-signup', component: () => import('@/views/portal/signup/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  { path: '*', redirect: '/404', hidden: true }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/cms',
    component: Layout,
    redirect: '/cms/dashboard',
    name: 'Dashboard',
    hidden: true,
    meta: { roles: ['public', 'editor'] },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/admin/dashboard/index')
    }]
  },
  {
    path: '/cms-public',
    component: Layout,
    redirect: '/bp-your-articles/y-news/berita-kamu',
    name: 'back-berita-kamu',
    meta: { title: 'Berita Kamu', icon: 'news', roles: ['public'] },
    children: [
      {
        path: 'bp-your-articles/y-news/berita-kamu',
        name: 'back-berita-kamu-list',
        component: () => import('@/views/public/article/berita'),
        meta: { title: 'Berita Kamu', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'bp-your-articles/y-image/foto-kamu',
        name: 'back-foto-kamu-list',
        component: () => import('@/views/public/article/citra'),
        meta: { title: 'Foto Kamu', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'bp-f/:articleType/:editorialSlug',
        name: 'back-public-article-form',
        props: true,
        component: () => import('@/views/public/article/myForm'),
        hidden: true
      }
    ]
  },
  {
    path: '/editorial-articles',
    component: Layout,
    redirect: '/editorial-articles/indonesia-baik',
    name: 'admin-editorial',
    meta: { title: 'Editorial', icon: 'news', roles: ['editor'] },
    children: [
      {
        path: 'l/indonesia-baik',
        name: 'admin-indonesia-baik-list',
        component: () => import('@/views/admin/article/indonesiaBaik'),
        meta: { title: 'Indonesia Baik', icon: 'ic_bullet - circle - o' }
      },
      // {
      //   path: 'l/indonesia-bangga',
      //   name: 'admin-indonesia-bangga-list',
      //   // component: () => import('@/views/admin/article/indonesiaBangga'),
      //   meta: { title: 'Indonesia Bangga', icon: 'ic_bullet - circle - o' }
      // },
      {
        path: 'l/komunitas',
        name: 'admin-komunitas-list',
        component: () => import('@/views/admin/article/komunitas'),
        meta: { title: 'Komunitas', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/sosok-inspiratif',
        name: 'admin-sosok-inspiratif-list',
        component: () => import('@/views/admin/article/sosokInspiratif'),
        meta: { title: 'Sosok Inspiratif', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/prestasi',
        name: 'admin-prestasi-list',
        component: () => import('@/views/admin/article/prestasi'),
        meta: { title: 'Prestasi', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/indonesia-membangun',
        name: 'admin-indonesia-membangun-list',
        component: () => import('@/views/admin/article/indonesiaMembangun'),
        meta: { title: 'Indonesia Membangun', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/tempat-wisata',
        name: 'admin-tempat-wisata-list',
        component: () => import('@/views/admin/article/tempatWisata'),
        meta: { title: 'Tempat Wisata', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/kuliner',
        name: 'admin-kuliner-list',
        component: () => import('@/views/admin/article/kuliner'),
        meta: { title: 'Kuliner', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/teknologi',
        name: 'admin-teknologi-list',
        component: () => import('@/views/admin/article/teknologi'),
        meta: { title: 'Terknologi', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/musik',
        name: 'admin-musik-list',
        component: () => import('@/views/admin/article/musik'),
        meta: { title: 'Musik', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/fashion',
        name: 'admin-fashion-list',
        component: () => import('@/views/admin/article/fashion'),
        meta: { title: 'Fashion', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/film',
        name: 'admin-film-list',
        component: () => import('@/views/admin/article/film'),
        meta: { title: 'Film', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/seni',
        name: 'admin-seni-list',
        component: () => import('@/views/admin/article/seni'),
        meta: { title: 'Seni', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/gaya-hidup',
        name: 'admin-gaya-hidup-list',
        component: () => import('@/views/admin/article/gayaHidup'),
        meta: { title: 'Gaya Hidup', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/gallery-foto',
        name: 'admin-gallery-foto-list',
        component: () => import('@/views/admin/article/citra'),
        meta: { title: 'Citra', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/video',
        name: 'admin-video-list',
        component: () => import('@/views/admin/article/video'),
        meta: { title: 'Video', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'l/infografis',
        name: 'admin-infografis-list',
        component: () => import('@/views/admin/article/infografis'),
        meta: { title: 'Infografis', icon: 'ic_bullet - circle - o' }
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
    path: '/moderation',
    component: Layout,
    redirect: '/moderation/artikel-kamu-list/y-news/berita-kamu',
    name: 'moderation',
    meta: { title: 'Moderasi', icon: 'example', roles: ['editor'] },
    children: [
      {
        path: 'artikel-kamu-list/y-news/berita-kamu',
        name: 'berita-kamu-list',
        component: () => import('@/views/admin/moderation/berita'),
        meta: { title: 'Berita Kamu', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'artikel-kamu-list/y-image/foto-kamu',
        name: 'foto-kamu-list',
        component: () => import('@/views/admin/moderation/citra'),
        meta: { title: 'Foto Kamu', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'artikel-kamu-form/:articleType/:editorialSlug',
        name: 'artikel-kamu-form',
        props: true,
        component: () => import('@/views/admin/moderation/myForm'),
        hidden: true
      },
      {
        path: 'article-reported',
        name: 'article-reported-list',
        component: () => import('@/views/admin/moderation/reports'),
        meta: { title: 'Report', icon: 'ic_bullet - circle - o' }
      },
      {
        path: 'article-comment',
        name: 'article-comment-list',
        component: () => import('@/views/admin/event/list'),
        meta: { title: 'Komentar', icon: 'ic_bullet - circle - o' },
        hidden: true
      }
    ]
  },
  {
    path: '/events',
    component: Layout,
    redirect: '/events/list',
    name: 'Events',
    meta: { title: 'Acara', icon: 'calendar', roles: ['editor'] },
    children: [
      {
        path: 'list',
        name: 'event-list',
        component: () => import('@/views/admin/event/list'),
        meta: { title: 'Acara', icon: 'calendar' }
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
    path: '/advertisements',
    component: Layout,
    redirect: '/advertisements/list',
    name: 'advertisement',
    meta: { title: 'Iklan', icon: 'calendar', roles: ['editor'] },
    children: [
      {
        path: 'list',
        name: 'advertisement-list',
        component: () => import('@/views/admin/advertisement/list'),
        meta: { title: 'Iklan', icon: 'calendar' }
      },
      {
        path: 'form',
        name: 'advertisement-form',
        component: () => import('@/views/admin/advertisement/form'),
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
    meta: { title: 'Konfigurasi', icon: 'gear', roles: ['editor'] },
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
        meta: { title: 'Editorial', icon: 'work_order_item' }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: 'noredirect',
    name: 'Settings',
    meta: { title: 'Pengaturan', icon: 'manager' },
    children: [
      {
        path: '/settings/my-account',
        component: () => import('@/views/admin/settings/my-account/index'),
        redirect: 'noredirect',
        name: 'myAccount',
        meta: { title: 'Akun', icon: 'user' },
        children: [
          { path: 'edit-profile',
            component: () => import('@/views/admin/settings/my-account/profile/edit'),
            name: 'editProfile',
            meta: { title: 'Ubah Data', icon: 'user' }
          },
          { path: 'change-password',
            component: () => import('@/views/admin/settings/my-account/password/edit'),
            name: 'ChangePassword',
            meta: { title: 'Ubah Kata Sandi', icon: 'password' }
          }
        ]
      },
      {
        path: 'logout',
        name: 'admin-logout',
        component: () => import('@/views/admin/logout/index'),
        meta: { title: 'Logout', icon: 'shutdown' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
