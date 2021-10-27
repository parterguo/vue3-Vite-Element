<!--
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-10-22 13:41:43
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2021-10-22 14:40:43
-->
<template>
  <div>
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column prop="id" label="身份证" />
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="age" label="年龄" width="70" />
      <el-table-column label="性别" width="70">
        <template #default="scope">
          {{ scope.row.gender ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="province" label="地址" />
    </el-table>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
import { postBacktopList } from "../../../api/index";
export default {
  setup() {
    onMounted(async () => {
      const { data } = await postBacktopList();
      state.dataList = data.data.list;
      console.log("请求数据", data);
    });
    const state = reactive({
      dataList: [],
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style scoped>
</style>