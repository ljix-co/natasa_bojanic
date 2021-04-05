import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Exhibitions from '../views/Exhibitions.vue';
import Workshops from '../views/Workshops.vue';
import Biography from '../views/Biography.vue';
import Contact from '../views/Contact.vue';
import Admin from '../views/Admin.vue';
import Login from '../views/Login.vue';
// import store from '../store';


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
    path: '/workshops',
    name: 'Workshops',
    component: Workshops
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresLogin: true },
    beforeEnter(to, from, next) {
      if (to.meta.requiresLogin) {
        if (localStorage.getItem('sid')) {
          next()
        } else {
          next({ name: 'Login' })
        }
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    // document.getElementById('app').scrollIntoView();
    return { x: 0, y: 0 }
  }
})

export default router
