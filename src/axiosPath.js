import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import {getCookie,setCookie,delCookie} from './util/cookie'
import { Message } from 'element-ui'

Vue.prototype.$qs = qs


Vue.prototype.$http = axios
// 开发环境
axios.defaults.baseURL = "http://192.168.1.118:8006";
// 测试环境
// axios.defaults.baseURL = process.env.BASE_API;
axios.defaults.timeout = 100000
axios.defaults.withCredentials = true
// console.log(axios.defaults.headers['Accept-Language']);
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.responseType = 'json'

axios.interceptors.request.use(
    function(config) {
      // 处理请求之前的配置
      // if (config.method === 'post') {
      //   config.data = qs.stringify(config.data)
      // }
      return config
    },
    // function(error) {
      // 请求失败的处理
      // return Promise.reject(error)
    // }
  )
  
  // 响应拦截（配置请求回来的信息）
  axios.interceptors.response.use(
    function(response) {
      // 处理响应数据
      // loading.close()
      // console.log(response,2)
      // let date=response.data
      
      
      return response
    },
    function(error) {
      // 处理响应失败
      
      if(error.response.status===302){
            window.location.href=error.response.data.url
      }else if(error.response.status===502||error.response.status===500){
        Message.error('服务器错误')
      }else{
        Message.error(error.response.data.message)
        // console.log(111)
      }
      // console.log(error.response,2)
      return Promise.reject(error)
    }
  )

  export default axios;