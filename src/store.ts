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
      state.List = list.map((v: any) => {
        v.num = '0x' + ('0000' +  v.addId.toString(16)).substr(-4) + ('0000' + v.id.toString(16)).substr(-4);
        return v;
      });
    },
  },
  actions: {
    async getListAsync({ commit }) {
      commit('setAboutTitle', await digestAxios.get('/api/master/v1/content').then((r) => r.data));
    },
  },
});
