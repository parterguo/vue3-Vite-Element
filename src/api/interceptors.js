/*
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-09-24 11:16:54
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2021-11-03 16:27:36
 */
/* jshint esversion: 6 */
import axios from "axios";
import router from  "../router/router";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// axios.defaults.baseURL = process.env.VITE_APP_BASE_API;
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '':'http://test.qushiwan.cn';
axios.defaults.withCredentials = true;
axios.defaults.headers= {'Content-Type': 'application/x-www-form-urlencoded'};
// axios 配置
axios.defaults.timeout = 5000;
// http request 拦截器
var token=sessionStorage.getItem('token');
axios.interceptors.request.use(
  config => {
    if (token==''||token == undefined||token==null) {
      //  router.push({ path: '/' });
     
    }else{
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  err => {
   
    return Promise.reject(err);
  });

axios.interceptors.request.use(
  config => {
      return config;
  },
  error => {
      return Promise.reject(error);
  }
);

 
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
