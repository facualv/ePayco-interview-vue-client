import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import 'bootswatch/dist/darkly/bootstrap.css';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
];

const router = new VueRouter({
  routes
});

export default router;
