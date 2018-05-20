import { login, logout, getInfo, signup, loginSignupFB, loginSignupGmail, preSignup } from '@/api/login'
import { getToken, setToken, setUserId, removeToken, getUserId, removeUserId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    image: '',
    user_id: getUserId(),
    roles: [],
    role: '',
    username: null,
    email: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_IMAGE: (state, image) => {
      state.image = image
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_ID: (state, user_id) => {
      state.user_id = user_id
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          setUserId(data.user_id)
          commit('SET_TOKEN', data.token)
          commit('SET_USER_ID', data.user_id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Signup({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        signup(userInfo).then(response => {
          const data = response.data
          setToken(data.token)
          setUserId(data.user_id)
          commit('SET_TOKEN', data.token)
          commit('SET_USER_ID', data.user_id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    LoginSignupFB({ commit }, userInfo) {
      const username = userInfo.id.trim()
      const name = userInfo.name
      return new Promise((resolve, reject) => {
        loginSignupFB(username, name).then(response => {
          const data = response.data
          setToken(data.token)
          setUserId(data.user_id)
          commit('SET_TOKEN', data.token)
          commit('SET_USER_ID', data.user_id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    LoginSignupGmail({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const name = userInfo.name
      const email = userInfo.email
      const image_path = userInfo.image_path
      return new Promise((resolve, reject) => {
        loginSignupGmail(username, email, name, image_path).then(response => {
          const data = response.data
          setToken(data.token)
          setUserId(data.user_id)
          commit('SET_TOKEN', data.token)
          commit('SET_USER_ID', data.user_id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token, state.user_id).then(response => {
          const data = response.data
          commit('SET_ROLE', data.role)
          const roles = [data.role]
          commit('SET_ROLES', roles)
          commit('SET_NAME', data.name)
          commit('SET_USERNAME', data.username)
          commit('SET_EMAIL', data.email)
          commit('SET_IMAGE', data.image)
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    PreSignup({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        preSignup(userInfo).then(response => {
          const data = response.data
          setUserId(data.user_id)
          commit('SET_USER_ID', data.user_id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      console.log('do logout')
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLE', null)
          commit('SET_ROLES', null)
          commit('SET_NAME', null)
          commit('SET_USERNAME', null)
          commit('SET_EMAIL', null)
          commit('SET_USER_ID', null)
          commit('SET_IMAGE', null)
          removeToken()
          removeUserId()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_TOKEN', '')
        commit('SET_ROLE', null)
        commit('SET_ROLES', null)
        commit('SET_NAME', null)
        commit('SET_USERNAME', null)
        commit('SET_EMAIL', null)
        commit('SET_USER_ID', null)
        removeToken()
        removeUserId()
        resolve()
      })
    }
  }
}

export default user
