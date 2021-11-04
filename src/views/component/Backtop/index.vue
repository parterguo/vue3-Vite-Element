<!--
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-10-22 13:41:43
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2021-11-04 11:03:54
-->
<template>
  <div>
    <el-table :data="dataList.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase())
      )" border style="width: 100%;" :header-cell-style="headClass"  :cell-style="rowClass">
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
      <el-table-column prop="time" label="时间" />
      <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="请输入关键词查询" />
      </template>
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" >查看</el-button >
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button >
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" >删除</el-button >
      </template>
    </el-table-column>
    </el-table>

    <div class="pages">
      <el-pagination background  layout="prev, pager, next" :total="total"  @current-change="current_change"></el-pagination>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
import { postBacktopList } from "../../../api/index";
export default {
  setup() {
    onMounted(async () => {
     getDataList();

    });
   
    const state = reactive({
      dataList: [],
       search: '',
      listParams:{
         pageIndex: 1,
         pageSize: 10
      },
      total:0,
    });
     // 列表接口请求
    const getDataList = (async ()=>{
    const { data } = await postBacktopList(JSON.stringify(state.listParams));
          state.dataList = data.data.rows;
          state.total=data.data.total;
          console.log("请求数据", data);
    })
    // 分页切换
    const current_change =((pageSize)=>{
      state.listParams.pageIndex=pageSize;
      getDataList();
    })
    // 表头居中
    const headClass=(()=>{
      return  "text-align:center";
    })

    // 表格数据居中
    const rowClass=(()=>{
        return "text-align:center"
    })
    rowClass();
    headClass();
    return {
      ...toRefs(state),
      getDataList,
      rowClass,
      headClass,
      current_change
    };
  },
};
</script>
<style scoped>
.pages{
  width: 100%;
  margin-left:auto;
  text-align: right;
  margin-top: 30px;
}
</style>