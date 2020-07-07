import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SignUp from '../views/SignUp.vue';

import 'bootswatch/dist/darkly/bootstrap.css';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  }
];

const router = new VueRouter({
  routes
});

export default router;
