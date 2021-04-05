import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: "http://246b122.mars1.mars-hosting.com/api/",
    curLanguage: "EN",
    loggedIn: false,
    loader: true
  },
  mutations: {
    CHANGE_CURLANGUAGE(state, payload) {
      state.curLanguage = payload;
    },
    CHANGE_LOGGEDIN(state, payload) {
      state.loggedIn = payload;
    },
    CHANGE_LOADER(state, payload) {
      state.loader = payload;
    }
  },
  actions: {
    changeCurLanguage(store, payload) {
      store.commit('CHANGE_CURLANGUAGE', payload);
    },
    changeLoggedIn(store, payload) {
      store.commit('CHANGE_LOGGEDIN', payload);
    },
    changeLoader(store, payload) {
      store.commit('CHANGE_LOADER', payload);
    }
  },
  modules: {
  }
})
