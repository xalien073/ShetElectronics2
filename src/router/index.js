import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/:slug',
    name: 'ProductDetails',
    component: () => import(/* webpackChunkName: "about" */ '../views/PD.vue'),
    props: true 
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    props: true 
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
    props: true 
  },
  {
    path: '/buy-now',
    name: 'BuyNow',
    component: () => import('../views/BuyNow.vue'),
    props: true 
  },
  {
    path: '/re-order',
    name: 'ReOrder',
    component: () => import('../views/ReOrder.vue'),
    props: true 
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: () => import('../views/SearchResults.vue'),
    props: true 
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: () => import('../views/OrderSuccess.vue'),
    props: true 
  }, 
  {
    path: '/account',
    name: 'MyAccount',
    component: () => import('../views/MyAccount.vue'),
    props: true 
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue'),
    props: true 
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // catchall 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/404.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
