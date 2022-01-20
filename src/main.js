import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './axios'
import VueAxios from 'vue-axios'
//window.router = require(router)
window.axios = require('axios')
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/global.css'
// import '@/assets/icons/fontawesome-free-5.15.2-web/css/all.min.css'
createApp(App).use(store).use(router).mount('#app')
