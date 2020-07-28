import Vue from 'vue';
import Vuex from 'vuex';
import { AxiosDigest } from 'axios-digest';


Vue.use(Vuex);
const digestAxios = new AxiosDigest('rearn', 'aaa');

export default new Vuex.Store({
  state: {
    List: '',
  },
  mutations: {
    setAboutTitle(state, list) {
      state.List = list;
    },
  },
  actions: {
    async getListAsync({ commit }) {
      commit('setAboutTitle', await digestAxios.get('/api/master/v1/content').then((r) => r.data));
    },
  },
});
