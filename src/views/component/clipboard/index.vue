<template >
  <div>
    <div class="container">
      <div class="copy">
        <el-button type="primary" size="small" @click="copy">Copy</el-button>
      </div>
      <p>{{ html.text }}</p>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs } from "vue";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const { toClipboard } = useClipboard();

    const state = reactive({
      html: {
        text: '<template >\n<div>\n<el-button type="primary" icon="el-icon-edit" size="small"  @click="copy">Copy</el-button>\n</div>\n</template >\nimport { reactive, toRefs } from "vue";\nimport useClipboard from "vue-clipboard3";\nimport { ElMessage  } from "element-plus";\n<script> \nexport default {\nsetup() {\nconst { toClipboard } = useClipboard();\nconst state = reactive({ html:{text:要复制内容};\n });\n  const copy = async () => {\n try {\n  await toClipboard(state.html.text);\nElMessage({\n type: "success",\n message: "已复制"\n   })\n } catch (e) {\n console.error(e);\n  }\n }\n return { copy, ...toRefs(state) };\n};\n};\n<script>',
      },
    });

    const copy = async () => {
      try {
        await toClipboard(state.html.text);
        ElMessage({
          type: "success",
          message: "已复制",
        });
      } catch (e) {
        console.error(e);
      }
    };

    return { copy, ...toRefs(state) };
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 80vh;
  word-wrap: normal;
  word-break: break-all;
  white-space: pre;
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  margin-top: 0;
  border-radius: 4px;
  z-index: 0;
  padding: 1em;
  line-height: 1.5;
  color: #ccc;
  background: #2d2d2d;
}
.copy {
  width: 100%;
  text-align: right;
}
</style>
