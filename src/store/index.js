/*
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-10-27 10:28:13
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2022-01-04 16:46:08
 */
import { createStore } from 'vuex'

export default createStore({
    state: {
        tagsList: [],
        collapse: false,
        token: '',
        checked:false,
        AllColor:'#324157',
        isTags:true

    },
    mutations: {
        // 设置全局背主题颜色
        set_color(state,color){
            state.AllColor=color
        },
        // 是否显示Tags
        set_Tags(state,val){
          state.isTags=val
          console.log("tags",state.isTags)
        },
        // 存储token
        set_token(state, token) {
            state.token = token
            sessionStorage.token = token
        },
        // 删除token
        del_token(state) {
            state.token = ''
            sessionStorage.removeItem('token')
        },
        // 是否记住记住密码
        setChecked(state,data){
            state.checked=data;
            sessionStorage.checked = data;
        },
        delTagsItem(state, data) {
            state
                .tagsList
                .splice(data.index, 1);
        },
        setTagsItem(state, data) {
            state
                .tagsList
                .push(data)
        },
        clearTags(state) {
            state.tagsList = []
        },
        closeTagsOther(state, data) {
            state.tagsList = data;
        },
        closeCurrentTag(state, data) {
            for (let i = 0, len = state.tagsList.length; i < len; i++) {
                const item = state.tagsList[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        data
                            .$router
                            .push(state.tagsList[i + 1].path);
                    } else if (i > 0) {
                        data
                            .$router
                            .push(state.tagsList[i - 1].path);
                    } else {
                        data
                            .$router
                            .push("/");
                    }
                    state
                        .tagsList
                        .splice(i, 1);
                    break;
                }
            }
        },
        // 侧边栏折叠
        handleCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {}
})