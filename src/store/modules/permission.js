import { asyncRoutes, constantRoutes } from '@/router'
import { isMobile } from '@/utils/isMobile'
const ismobile =  isMobile();
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return  route.meta.roles.some(role => roles == role) // route.meta.roles == roles   
  } else {
    return true
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp) ) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
const state = {
  routes: [],
  addRoutes: [],
	hasRoutes:false,
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
	SET_HASROUTES: (state) =>{
		state.hasRoutes = true;
	}
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = filterAsyncRoutes(asyncRoutes,roles) 
				
			// 手机端  过滤路由
			if(ismobile){
				accessedRoutes = filterPlatRoutes(accessedRoutes)
			}
			
      commit('SET_ROUTES', accessedRoutes)
			commit('SET_HASROUTES')
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

//手机端过滤路由
 function filterPlatRoutes(accessedRoutes){
		let res = [];
		const ismobile = localStorage.ismobile;
		 accessedRoutes.map(route =>{
			 const plat = route.meta && route.meta.plat || '';
			 if(ismobile == 1){
				 if(!plat){
					res.push(route)
				 }
			 }else{
				 if(plat){
				 	res.push(route)
				 }
			 }
			 
		})
		return res
}