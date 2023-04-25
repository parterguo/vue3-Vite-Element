<!--
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-09-26 15:28:36
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2021-11-03 13:40:00
-->
<template>

  <div class="common">
    <Side></Side>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
           <Header></Header>
      <el-affix :offset="0">
        <Tags></Tags>
      </el-affix>

      <div class="content">

        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
          <e-setting class="settings"></e-setting>
        </router-view>
      </div>

    </div>
  </div>
</template>

<script>

import Header from "/@/components/Header.vue";
import Side from "/@/components/Sidebar.vue";
import eSetting from "/@/components/setting.vue";
import { computed } from "vue";
import Tags from "/@/components/Tags.vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const tagsList = computed(() =>
      store.state.tagsList.map((item) => item.name)
    );
    const collapse = computed(() => store.state.collapse);
    return {
      tagsList,
      collapse,
    };
  },
  components: {
    Header,
    Side,
    eSetting,
    Tags,
  },
};
</script>

<style>
</style>
