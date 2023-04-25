/*
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-09-24 10:00:17
 * @LastEditors: YaBing
 * @LastEditTime: 2023-04-25 11:25:00
 */
/* jshint esversion: 6 */
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import '../node_modules/element-plus/dist/index.css';
import '/@/style/index.css';
import store from '/@/store/index';
import router from "/@/router/router";// 引入router
import '/@/mock/index.js';//mock数据
import App from '/@/App.vue';
import * as echarts from 'echarts';
import vuetyped from 'vue3typed' //打字机
//顶部页面加载条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
const app = createApp(App);
app.user=echarts;
app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(vuetyped);
app.mount('#app');

NProgress.configure({
    easing: 'ease',
    speed: 500,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3
});
//路由监听
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});
//路由跳转结束
router.afterEach(() => {
    NProgress.done();
});

// VUE_APP_MOCK的值为true，并且在开发环境下
// if (process.env.VUE_APP_MOCK && process.env.NODE_ENV === 'development') {
//     require('./mock/index');
//   }