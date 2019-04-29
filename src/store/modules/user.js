import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken,
getRole,setRole, removeRole
 } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: getRole(),
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
	 SET_ROLES: (state, roles) => {
	  state.roles = roles
	},
	
	
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
 
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
				
				const data = {"id":2,"lastLoginTime":1556504924748,"lastLogoutTime":1555488431000,"loginName":"15235696537","nickName":"测试用户","remark":"","token":"eae5eed48b35bd9ffbc9a217bccbe70a","userMobile":"18612176046","userPwd":"*****","userType":1} ;

				commit('SET_TOKEN',data.token)
				commit('SET_ROLES',data.userType)
        setToken(data.token)
				setRole(data.userType)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

 

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
				removeRole()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
