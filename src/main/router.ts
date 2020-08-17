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
      path: '/master/login',
      name: 'masterLogin',
      component: () => import('../views/MasterLogin.vue'),
    },
    {
      path: '/master',
      name: 'master',
      component: () => import('../views/Master.vue'),
    },
  ],
});
