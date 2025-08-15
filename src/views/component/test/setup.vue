<!--
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2022-03-29 17:29:54
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2022-03-30 09:51:10
-->
<template>
    <div>
        <h1>父组件：</h1>
        <div>
            <ul>
                <li>姓名:{{ userName }}</li>
                <li>年龄:{{ age }}</li>
            </ul>
            <el-button type="danger" @click.once="handChildClick">点击调用子组件方法</el-button>
        </div>
        ····························································································································································································································································································································································
        <setupChildVue ref="setupChildVues" :name="userName" @hanldeChange="hanldeChange"></setupChildVue>
    </div>
</template>
<script>
import { reactive, toRefs,ref } from "vue";
import setupChildVue from "./setupChild.vue";
export default {
    components: {
        setupChildVue
    },
    setup(props,Context) {
        const state = reactive({
            userName: 'guoyabing',
            age: '25',
            sex: '男'
        })
        // 给子组件提供的方法
        const hanldeChange = (() => {
            console.log('你点击到了！')
        })
        // 点击时调用子组件方法
        const setupChildVues= ref(null);
        const handChildClick=(()=>{
           setupChildVues.value.toParentChange()
        })
        
        
        return {
            ...toRefs(state),
            hanldeChange,
            handChildClick,
            setupChildVues
        }
    },

}
</script>