import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
// import router from '@/router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
  },
  getters: {
  },
  mutations: {
    SIGN_UP(state, key) {
      console.log(state, key)
      console.log(state, key)
    }
  },
  actions: {
    signUp(context, payload) {
      console.log(payload)
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          nickname: payload.nuckname,
          password1: payload.password1,
          password2: payload.password2,
        }
      })
        .then((res) => {
          console.log(res)
          context.commit('SIGN_UP', res.data.key)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
})
