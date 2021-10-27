/*
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-09-24 11:16:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-20 14:25:15
 */
/* jshint esversion: 6 */
import axios from "axios";
import router from  "../router/router";
// axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '' : 'http://v.juhe.cn';
axios.defaults.withCredentials = true;
axios.defaults.headers= {'Content-Type': 'application/x-www-form-urlencoded'};
// axios 配置
axios.defaults.timeout = 5000;
// http request 拦截器
var token=sessionStorage.getItem('token');
axios.interceptors.request.use(
  config => {
    if (token=='') {
      router.push({ path: '/login' });
     
    }else{
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
   
    return Promise.reject(err);
  });
 
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          router.push({ path: '/login' });
      }
    }
    return Promise.reject(error.response.data);
  });


export default axios;
