import Vue from 'vue';
import Vuex from 'vuex';
import { AxiosDigest } from 'axios-digest';
import axios from 'axios';

Vue.use(Vuex);
const digestAxios = new AxiosDigest('rearn', 'aaa');

export default new Vuex.Store({
  state: {
    List: '',
    Sitekey: '',
    Recaptcha: {},
    digest: {},
  },
  mutations: {
    setAboutTitle(state, list) {
      state.List = list;
    },
    setRecaptchaSitekey(state, data) {
      state.Recaptcha = data;
    },
    setDigestUser(state, data) {
      state.digest = data;
    },
  },
  actions: {
    async getListAsync({ commit }) {
      commit(
        'setAboutTitle',
        await digestAxios.get('/api/master/v1/content').then((r) => r.data),
      );
    },
    async getRecaptchaSitekeyAsync({ commit }) {
      commit(
        'setRecaptchaSitekey',
        await axios.get('/api/v1/recaptcha.json').then((r) => r.data),
      );
    },
    digestUserCreate({ commit }, data) {
      commit('setDigestUser', () => data);
    },
  },
});
