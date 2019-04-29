import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // determine whether the user has logged in
  const hasToken = getToken()
  // console.log(hasToken,"hasToken")
  if (hasToken) {
		 if (to.path === '/login') {
				next({ path: '/' })
				NProgress.done()
			}else{
				if(store.getters.hasRoutes){
					next()
				}else{
					const accessRoutes = await store.dispatch('permission/generateRoutes',store.getters.roles )
					console.log("accessRoutes",accessRoutes)
					router.addRoutes(accessRoutes)
					next(`${to.path}`)	
				}	
			} 
		
	}else{
		 if (whiteList.indexOf(to.path) !== -1) {
		      // in the free login whitelist, go directly
		      next()
		    } else {
		      // other pages that do not have permission to access are redirected to the login page.
		      next(`/login?redirect=${to.path}`)
		      NProgress.done()
		    }
	}

})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
