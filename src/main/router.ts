import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/master',
      name: 'master',
      component: () => import('../views/Master.vue'),
    },
    {
      path: '/master/all',
      name: 'masterAll',
      component: () => import('../views/MasterAll.vue'),
    },
  ],
});
