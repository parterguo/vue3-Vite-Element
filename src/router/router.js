/*
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-09-24 10:20:17
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2021-11-03 14:24:31
 */
import {createRouter, createWebHashHistory} from "vue-router";
import Home from "/@/views/home/index.vue";
const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
     {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '工作台'
                },
                component: () => import ("/@/views/dashboard/index.vue")
            }, 
            {
                path: '/clipboard',
                name: 'clipboard',
                meta: {
                    title: '粘贴板'
                },
                component: () => import ('/@/views/component/clipboard/index.vue')
            },
            {
                path: '/backtop',
                name: 'backtop',
                meta: {
                    title: '表格'
                },
                component: () => import ('/@/views/component/Backtop/index.vue')
            },
            {
              path: '/wangeditor',
              name: 'wangeditor',
              meta: {
                  title: '富文本编辑器'
              },
              component: () => import ('/@/views/component/wangeditor/index.vue')
          },
          {
            path: '/user',
            name: 'user',
            meta: {
                title: 'websoket聊天室'
            },
            component: () => import ('/@/views/component/user/index.vue')
        },
          {
            path: '/test',
            name: 'test',
            meta: {
                title: '测试页'
            },
            component: () => import ('/@/views/dashboard/echarts/test.vue')
        },
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ("/@/views/login/index.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    var token=sessionStorage.getItem('token');
    if (!token && to.path !== '/login') {
        next('/login');
    } 
     else {
        next();
    }
});

export default router;