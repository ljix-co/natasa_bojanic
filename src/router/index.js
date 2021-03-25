import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Exhibitions from '../views/Exhibitions.vue';
import Biography from '../views/Biography.vue';
import Contact from '../views/Contact.vue';
import Admin from '../views/Admin.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/artworks',
    name: 'Artworks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Artworks.vue')
  },
  {
    path: '/exhibitions',
    name: 'Exhibitions',
    component: Exhibitions
  },
  {
    path: '/biography',
    name: 'Biography',
    component: Biography
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
