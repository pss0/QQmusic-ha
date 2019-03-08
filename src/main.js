// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import flex from 'lib-flexible'
import '../static/css/reset.css'
import 'swiper/dist/css/swiper.min.css'

import BScroll from 'better-scroll'

import store from './router/vx.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper, /* { default global options } */)


var clwidth=document.body.clientWidth||document.documentElement.clientWidth;
var htmldom=document.getElementsByTagName('html')[0];
htmldom.style.fontSize=Math.ceil(clwidth*0.13)+'px';


router.beforeEach((to,from,next)=>{
  window.onscroll=null; //解除事件绑定   
  document.body.scrollTop=0;
  document.documentElement.scrollTop=0;
  next();
})
Vue.config.productionTip = false

Vue.prototype.bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
