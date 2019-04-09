import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    List: '',
  },
  mutations: {
    setAboutTitle(state, title) {
      state.List = title;
    },
  },
  actions: {
    async getListAsync({ commit }) {
      commit('setAboutTitle', await axios.get('/master/content').then((r) => r.data));
    },
  },
});
