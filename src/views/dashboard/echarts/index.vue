<!--
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-09-28 15:52:32
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2021-10-09 15:01:13
-->
<template>
  <div
    class="barChart"
    :style="{ width: echaWidth + 'px', height: echaHeight + 'px' }"
  >
    <div class="barTile">
      <div class="baricon">{{ icon }}</div>
      <p>{{ title }}</p>
    </div>
    <slot name="content">
    </slot>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    echaWidth: {
      type: Number,
      default: 300,
    },
    echaHeight: {
      type: Number,
      default: 300,
    },
    title: {
      type: String,
      default: "我是默认title",
    },
  },
  created() {
    console.log(this.icon);
  },
  setup() {
    return {};
  },
};
</script>
<style scoped>
.barChart {
  position: relative;
  top: 20px;
  left: 0;
  box-shadow: 0px 0px 3px 0px #3af5cc inset;
  background: linear-gradient(to left, #3af5cc, #3af5cc) left top no-repeat,
    linear-gradient(to bottom, #3af5cc, #3af5cc) left top no-repeat,
    linear-gradient(to left, #3af5cc, #3af5cc) right top no-repeat,
    linear-gradient(to bottom, #3af5cc, #3af5cc) right top no-repeat,
    linear-gradient(to left, #3af5cc, #3af5cc) left bottom no-repeat,
    linear-gradient(to bottom, #3af5cc, #3af5cc) left bottom no-repeat,
    linear-gradient(to left, #3af5cc, #3af5cc) right bottom no-repeat,
    linear-gradient(to left, #3af5cc, #3af5cc) right bottom no-repeat;
  background-size: 3px 20px, 20px 3px, 3px 20px, 20px 3px;
}
.barTile {
  height: 40px;
  display: flex;
  line-height: 40px;
  border-radius: 50px;
  background: #3af5cc;
  position: absolute;
  color: #fff;
  left: 50%;
  margin-left: -50px;
  top: -20px;
  padding: 0px 20px;
}
.baricon {
  text-align: center;
  margin: 0 auto;
}

</style>