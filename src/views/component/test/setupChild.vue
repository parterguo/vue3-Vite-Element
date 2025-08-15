<!--
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2022-03-29 17:36:46
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2022-03-31 18:32:23
-->
<template>
    <div>
        <h1>子组件：</h1>
        <p>苹果数量：{{ appCount }}</p>
        <el-button @click="hanldeChangeChild">点击时调用父组件方法</el-button>
        <p>坐标x：{{ x }}</p>
        <p>坐标y：{{ y }}</p>
        <!-- 弹窗 -->
        <el-button @click="open = true">传送门</el-button>
        <Teleport to="body">
            <div v-if="open" class="modals">
                <p>Hello from the modal!</p>
                <el-button @click="open = false">关闭</el-button>
            </div>
        </Teleport>
    </div>
</template>
<script>
import { computed, reactive, toRefs } from "vue";
import { useMouse } from "../../../utils/mouse.js";
export default {
    props: {
        name: String
    },
    setup(props, { emit }) {
        const state = reactive({
            appCount: 1,
            open:false
        })
        // 触摸式屏幕位置
        const { x, y } = useMouse();
        console.log(x, y)
        //  点击调用父组件方法
        const hanldeChangeChild = (() => {
            emit('hanldeChange');
        })
        // 为父组件提供方法
        const toParentChange = (() => {

            state.appCount = computed(() => {
                return 2
            })

        })
        return {
            ...toRefs(state),
            hanldeChangeChild,
            toParentChange,
            x, y

        }
    },
}
</script>
<style scoped>
.modals {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>