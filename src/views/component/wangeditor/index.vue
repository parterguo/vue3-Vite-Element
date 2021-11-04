<!--
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-10-25 10:09:36
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2021-10-29 10:17:36
-->
<template>
    <div>
    <div ref='editor' class="editor"></div>
    <el-button type="success" @click='syncHTML' style="margin:10px 0px;">同步内容</el-button>
    <div :innerHTML='content.html'></div>
    </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';
import WangEditor from 'wangeditor';
export default {
    name: 'app',
    setup() {
        const editor = ref('');
        const content = reactive({
            html: '',
            text: '',
        });
        let instance;
        onMounted(() => {
          // 配置编辑区代码  //文档地址https://www.wangeditor.com/doc/pages/01-%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8/02-%E8%AE%BE%E7%BD%AE%E9%AB%98%E5%BA%A6.html
            instance = new WangEditor(editor.value);
           //  z-index为0
           instance.zIndex.baseZIndex=0;
          //  高度为500px;
           instance.config.height=500;
          //  工具栏提示
           instance.config.menuTooltipPosition = 'down';
            console.log('哈哈',instance.config);
            Object.assign(instance.config, {
                onchange() {
                },
            });
            instance.create();
        });
        onBeforeUnmount(() => {
            instance.destroy();
            instance = null;
        });
        const syncHTML = () => {
            content.html = instance.txt.html();
            console.log(content.html);
        };
        return {
            syncHTML,
            editor,
            content,
        };
    },
};
</script>
<style scoped>
.w-e-toolbar{
  z-index: 0 !important;
}

</style>