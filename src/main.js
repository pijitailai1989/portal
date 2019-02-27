// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'

import $ from 'jquery'
import i18n from './i18n/i18n'
import Element,{ Loading  } from 'element-ui'
import store from './vuex/store'
import echarts from 'echarts'
import './assets/css/bootstrap.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/js/flexible'
import './assets/js/bootstrap.min.js'
import './assets/css/index.css'
import './assets/css/animate.css'
import './assets/font/iconfont.css'
import axios from 'axios'
import qs from 'qs'
import VueLazyload from 'vue-lazyload'
import VueAnalytics from 'vue-analytics'
//import L from 'leaflet'
//import 'leaflet/dist/leaflet.css'
//import icon from 'leaflet/dist/images/marker-icon.png';
//import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA9-OuEIxQw2IXwfkcMRXG6PA1vcnQaAVs",
    // key: "AIzaSyDKB0AJ5PN2YxHjWlW6WzjDX5qHkJxEWW8",
    libraries: "places" // necessary for places input
  }
});

Vue.use(VueAnalytics, {
  id: 'UA-131905761-2',
	router
});

/*
let DefaultIcon = L.icon({
          iconUrl: icon,
          shadowUrl: iconShadow
      });
L.Marker.prototype.options.icon = DefaultIcon;

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
*/

Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif'
})


Vue.config.productionTip = false
Vue.use(Element,axios);
Vue.prototype.$echarts = echarts 
Vue.prototype.$qs = qs
Vue.prototype.$http = axios
Vue.prototype.baseURL = process.env.BASE_API;
// 开发环境
axios.defaults.baseURL = process.env.BASE_API;
axios.defaults.withCredentials=true;
// 测试环境
// axios.defaults.baseURL = process.env.BASE_API;

axios.defaults.timeout = 300000
// axios.defaults.withCredentials = true
// console.log(axios.defaults.headers['Accept-Language']);
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.responseType = 'json'
var loading=null;
Vue.prototype.$http.interceptors.request.use(
    function(config) {
      // 处理请求之前的配置
      if (
        router.app._route.fullPath!=='/freightContrast/index' &&
        router.app._route.path!=='/freightContrast/contrastResult' &&
        router.app._route.fullPath!=='/'
        ){
        loading = Loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
          
        })
        
      }
      
      // console.log(router.app._route)
      return config

    },
    function(error) {
      // 请求失败的处理
      if (
        router.app._route.fullPath!=='/freightContrast/index' &&
        router.app._route.path!=='/freightContrast/contrastResult' &&
        router.app._route.fullPath!=='/'
        ){
         loading.close();
      }
      
      return Promise.reject(error)
    }
  )
  
  // 响应拦截（配置请求回来的信息）
  Vue.prototype.$http.interceptors.response.use(
    function(response) {
      // 处理响应数据
      if (
        router.app._route.fullPath!=='/freightContrast/index' &&
        router.app._route.path!=='/freightContrast/contrastResult' &&
        router.app._route.fullPath!=='/'
      ){
        setTimeout(() => {
           loading.close();
        }, 1000);
      }
      return response
    },
    function(error) {
      // 处理响应失败
      if (
        router.app._route.fullPath!=='/freightContrast/index' &&
        router.app._route.path!=='/freightContrast/contrastResult' &&
        router.app._route.fullPath!=='/'
      ){
           loading.close();
      }
      
      return Promise.reject(error)
    }
  )


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
