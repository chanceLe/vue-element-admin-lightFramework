import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
]


export const asyncRoutes = [
// 业务路由 - 请验单管理
	
	/*
	  meta: {plat:1} 表示该菜单只在移动端显示，且  只能在 一级路由进行设置 
		子路由不生效
	*/
	  {
	  path: '/form',
	  component: Layout,
	  redirect: '/form/list',
		alwaysShow:true,
		meta: { title: '请验单管理', icon: 'form', noCache: true,   roles: [1,2] },
	  children: [
	    {
	      path: 'list',
	      component: () => import('@/views/checkform/check-form-list.vue'),
	      name: 'FormList',
	      meta: { title: '请验单列表', icon: 'table', noCache: true, roles:[1,2] }
	    },
			{
			  path: 'add',
			  component: () => import('@/views/checkform/add-check-form.vue'),
			  name: 'FormAdd',
			  meta: { title: '添加请验单', icon: 'edit', noCache: true,roles:[2] }
			}
	  ]
	},
		// 业务路由 - 检测管理
	  {
	  path: '/detection',
	  component: Layout,
	  redirect: '/detection/list',
		alwaysShow:true,
		meta: { title: '检测管理', icon: 'list', noCache: true,  roles:[1]  },
	  children: [
	    {
	      path: 'list',
	      component: () => import('@/views/detection/detection-list.vue'),
	      name: 'DetectionList',
	      meta: { title: '检测列表', icon: 'table', noCache: true, }
	    },
			{
			  path: 'detail',
			  component: () => import('@/views/detection/detection-detail.vue'),
			  name: 'DetectionDetail',
				// hidden:true ,
			  meta: { title: '检测详情', icon: 'table', noCache: false,}
			},
			{
			  path: 'upload',
			  component: () => import('@/views/detection/detection-upload.vue'),
			  name: 'DetectionUpload',
				// hidden:true ,
			  meta: { title: '上传结果', icon: 'table', noCache: false,}
			}
	  ]
	},
		// 业务路由 - 检测管理
	  {
	  path: '/mobile',
	  component: Layout,
	  redirect: '/detection/list',
		alwaysShow:true,
		meta: { title: '检测列表', icon: 'list', noCache: true, plat:1},
	  children: [
	    {
	      path: 'audit',
	      component: () => import('@/views/mobile/audit-mobile.vue'),
	      name: 'MobileAudit',
	      meta: { title: '检测列表', icon: 'table', noCache: true, }
	    }
	  ]
	},

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
