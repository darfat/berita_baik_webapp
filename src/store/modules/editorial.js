import { getAll } from '@/api/editorial'

const editorial = {
  actions: {
    GetEditorials({ commit }) {
      return new Promise((resolve, reject) => {
        getAll().then(response => {
          console.log('getEditorial Reponse')
          console.log(response)
          const data = response.data
          console.log(data)
          commit('SET_EDITORIALS', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default editorial
