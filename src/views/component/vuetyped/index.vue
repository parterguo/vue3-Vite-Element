<!--
 * @Descripttion: 
 * @version: 
 * @Author: YaBing
 * @Date: 2023-04-13 10:08:58
 * @LastEditors: YaBing
 * @LastEditTime: 2023-04-25 17:15:09
-->
<template>
  <div>
    <div class="mdui-progress mdui-color-pink-a200">
      <div class="mdui-progress-indeterminate"></div>
    </div>
    <!-- 打字机 -->
    
    <div style="display: flex;">
      <span style="margin-left:10px;margin-top: 10px;" v-if="state.statusShow">对方正在输入中.....</span>
    </div>
    <div>
      <div class="card">
        <el-input v-model="state.content" placeholder="输入" />
        <el-button type="primary" class="mdui-ripple" @click="onSubmit">确定</el-button>
      </div>
      <div class="chat">
        <div class="left">
          <div class="left-item"  >
            <vuetyped :strings="['红豆生南国,红豆生长在南国的土地上']" :loop="false" :smart-backspace="true" :show-cursor="false"  @onComplete="AdoSmth()"> 
            <div class="item">
              <el-avatar  src="https://img2.baidu.com/it/u=372601434,3534902205&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"            />
          </div>
            <div class="typing-box">
              <div class="typing" />
            </div>
          </vuetyped>
          </div>
        </div>
        <div class="right"  v-if="state.flow" >
          <div class="rigth-item"  >
            <vuetyped :strings="['春来发几枝,每逢春天不知长多少新枝。']" :loop="false" :smart-backspace="true" :show-cursor="false" @onComplete="BdoSmth()"> 
          
            <div class="typing-box">
              <div class="typing" />
            </div>
            <div class="item">
            <el-avatar  src="https://img1.baidu.com/it/u=570016865,823055038&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"            />
          </div>
          </vuetyped>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div class="right" style="margin-top: 120px;"  v-if="state.flow1" >
          <div class="rigth-item" >
            <vuetyped :strings="['愿君多采撷,希望你能尽情地采集它们']" :loop="false" :smart-backspace="true" :show-cursor="false"  @onComplete="CdoSmth()">  
           
            <div class="typing-box">
              <div class="typing" />
            </div>
            <div class="item">
            <el-avatar  src="https://img1.baidu.com/it/u=570016865,823055038&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"            />
          </div>
          </vuetyped>
          </div>
        </div>
        <div class="left"  style="margin-top: 60px;"  v-if="state.flow2">
          <div class="left-item">
            <vuetyped :strings="['此物最相思,因为它最能寄托相思之情']" :loop="false" :smart-backspace="true" :show-cursor="false" @onComplete="DdoSmth()"    > 
            <div class="item">
              <el-avatar  src="https://img2.baidu.com/it/u=372601434,3534902205&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"         />
          </div>
            <div class="typing-box">
              <div class="typing" />
            </div>
          </vuetyped>
          </div>
        </div>

        
      </div>
      
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const state = reactive({
  content:'',
  statusShow:false,
  flow:false,
  flow1:false,
  flow2:false,
  flow3:false,
  flow4:false,
 
});
const onSubmit  = () => {
  state.seNameList.push(state.content)
  console.log( state.seNameList)
};
// 检测左边聊天结束 
const AdoSmth=()=>{
  state.flow=true;
  // state.statusShow=false;
}
const BdoSmth=()=>{
  state.flow2=true;
  // state.statusShow=true;
  
}
const CdoSmth=()=>{
  // state.statusShow=true;
  // state.flow1=true;
}
const DdoSmth=()=>{
    state.flow1=true;
  // state.statusShow=false;
 console.log('我执行完了应该 执行我是你大爷了')
}



</script>
<style lang="scss" scoped>
.chat {
  width: 100%;
  margin-top: 20px;
  .left {
    width: 50%;
    float: left;
    .left-item{
      width: 100%;
      .item{
       margin-right: 10px;
      }
    }
  }
  .right {
    // width: 50%;
    margin-top: 100px;
    float: right;
    .rigth-item{
    width: 100%;
     .item{
       margin-right: 10px;
      }
    }
  }
}
.overall-header-left {
  align-self: center;
  justify-self: center;
  font-size: 32px; /* 要给容器设置font-size */
}
.typing-box{
  max-width: 300px;
  background: greenyellow;
  padding: 10px;
  border-radius: 10px;
}
.typing {
  font-weight: 700;
  /* font-size: 32px; */
}
.card {
  display: flex;
  position: fixed;
  bottom: 20px;
}
</style>
