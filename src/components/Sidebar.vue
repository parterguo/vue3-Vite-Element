<template>
<div>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      :background-color="AllColor"
      text-color="#fff"
      active-text-color="#fff"
      unique-opened
      router
    >
      <div class="sidebar-title">
        <img src="../assets/yanhua.png" alt="">
      </div>
      <template v-for="item in items" >
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>
                   <i :class="subItem.icon"></i>
                   <span> {{ subItem.title }}</span>
                  </template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                  <i :class="subItem.icon"></i>
                  <span> {{ subItem.title }}</span>        
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const items = [
      {
        icon: "el-icon-location",
        index: "/dashboard",
        title: "工作台",   
      },
       {
        icon: "el-icon-menu",
        index: "",
        title: "组件",
        subs:[
          {index:"/clipboard",title:'粘贴板',},
          {index:"/backtop",title:'表格'},
          {index:"/wangeditor",title:'富文本编辑器'},
        ],
      },
      // {
      //   icon: "el-icon-document",
      //   index: "/404",
      //   title: "404页面",
      // },
    ];

    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore();

    const collapse = computed(() => store.state.collapse);
    const  AllColor= computed(()=>store.state.AllColor);
    // 侧边栏折叠
    const collapseChage = () => {
      store.commit("handleCollapse", !collapse.value);
    };
    return {
      items,
      onRoutes,
      collapseChage,
      collapse,
      AllColor,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 0px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.el-menu--collapse{
  width: 66px !important;
}
.sidebar > ul {
  height: 100%;
}
.collapse-tab {
  height: 35px;
  line-height: 35px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  padding-top: 10px;
  cursor: pointer;
}
.sidebar-title{
  width: 30px;
  height: 30px;
  margin:  0 auto;
  text-align: center;
  padding-top: 30px;
  color: #fff;
}
.sidebar-title img{
  width: 100%;
  height: 100%;
  
}
</style>
