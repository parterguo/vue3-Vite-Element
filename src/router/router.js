/*
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-09-24 10:20:17
 * @LastEditors: YaBing
 * @LastEditTime: 2023-04-25 11:19:59
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
                title: 'vue3学习'
            },
            component: () => import ('/@/views/component/test/setup.vue')
        },
        {
            path: '/echarts',
            name: 'echarts',
            meta: {
                title: '八卦图表'
            },
            component: () => import ('/@/views/dshboard/dashboard/echarts/test.vue')
        },
        {
            path: '/vuetyped',
            name: 'vuetyped',
            meta: {
                title: '打字机'
            },
            component: () => import ('/@/views/component/vuetyped/index.vue')
        },
        
      
        ]
    },
    // {
    //     path: '/three',
    //     name: 'three',
    //     meta: {
    //         title: 'three学习'
    //     },
    //     component: () => import ('/@/views/component/three/index.vue')
    // },
    
    
    {
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