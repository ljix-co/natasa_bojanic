import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: "http://246b122.mars1.mars-hosting.com/api/",
    curLanguage: "EN"
  },
  mutations: {
    CHANGE_CURLANGUAGE(state, payload) {
      state.curLanguage = payload;
    }
  },
  actions: {
    changeCurLanguage(store, payload) {
      store.commit('CHANGE_CURLANGUAGE', payload);
    }
  },
  modules: {
  }
})
