import Vue from 'vue';
import Vuex from 'vuex';
import { DigestAxios } from '@/lib/DigestAxios';


Vue.use(Vuex);
const digestAxios = new DigestAxios();

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
      commit('setAboutTitle', await digestAxios.get('/master/content').then((r) => r.data));
    },
  },
});
