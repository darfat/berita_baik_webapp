import { login, logout, getInfo, signup } from '@/api/login'
import { getToken, setToken, setUserId, removeToken, getUserId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    user_id: getUserId(),
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_ID: (state, user_id) => {
      state.user_id = user_id
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          console.log(data)
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
          console.log(data)
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
      console.log(state)
      console.log('get user info')
      return new Promise((resolve, reject) => {
        getInfo(state.token, state.user_id).then(response => {
          const data = response.data
          console.log(data)
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
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
        removeToken()
        resolve()
      })
    }
  }
}

export default user
