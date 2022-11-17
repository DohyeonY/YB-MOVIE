import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/accounts/Login'
import Logout from '@/views/accounts/Logout'
import Profile from '@/views/accounts/Profile'
import Signup from '@/views/accounts/Signup'
import Movies from '@/views/movies/Movies'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/accounts/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/accounts/Logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
