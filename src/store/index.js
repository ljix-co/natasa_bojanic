import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: "https://natasabojanic.com/api/",
    curLanguage: "RS",
    loggedIn: false,
    loader: true,
    root_path: "https://natasabojanic.com"
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
