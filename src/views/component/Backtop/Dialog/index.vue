<!--
 * @Descripttion: 
 * @version: 
 * @Author: GuoYaBing
 * @Date: 2021-11-04 11:26:10
 * @LastEditors: GuoYaBing
 * @LastEditTime: 2021-12-31 18:12:18
-->
<template>
  <div class="conten-dialog">
    <div
      class="dialog"
      :style="{ width: DialogWidth + 'px', height: DialogHeight + 'px' }"
    >
      <div class="nav">
        <div class="title">{{ DilogTitle }}</div>
        <div class="colse" @click="close"></div>
      </div>

      <main>
        <div class="form-data">
          <el-scrollbar height="420px">
            <el-form
              label-width="100px"
              :model="formLabelAlign"
              ref="dialogfrom"
            >
              <el-form-item label="身份证：">
                <el-input
                  v-model="formLabelAlign.id"
                  v-if="DilogTitle == '编辑'"
                  disabled
                ></el-input>
                <p class="text-right" v-else>{{ formLabelAlign.id }}</p>
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input
                  v-model="formLabelAlign.name"
                  v-if="DilogTitle == '编辑'"
                ></el-input>
                <p class="text-right" v-else>{{ formLabelAlign.name }}</p>
              </el-form-item>
              <el-form-item label="年龄：">
                <el-input
                  v-model="formLabelAlign.age"
                  v-if="DilogTitle == '编辑'"
                  type="number"
                ></el-input>
                <p class="text-right" v-else>{{ formLabelAlign.age }}</p>
              </el-form-item>
              <el-form-item label="性别：">
                <!-- <el-input v-model="formLabelAlign.gender"  v-if="DilogTitle=='编辑'"></el-input> -->
                <el-select
                  v-model="formLabelAlign.gender"
                  placeholder="请选择"
                  style="width: 100%"
                  v-if="DilogTitle == '编辑'"
                >
                  <el-option
                    style="width: 300px; boder: solid 1px red"
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>

                <p class="text-right" v-else>
                  {{ formLabelAlign.gender ? "男" : "女" }}
                </p>
              </el-form-item>
              <el-form-item label="邮箱：">
                <el-input
                  v-model="formLabelAlign.email"
                  v-if="DilogTitle == '编辑'"
                ></el-input>
                <p class="text-right" v-else>{{ formLabelAlign.email }}</p>
              </el-form-item>
              <el-form-item label="地址：">
                <el-input
                  v-model="formLabelAlign.province"
                  v-if="DilogTitle == '编辑'"
                ></el-input>
                <p class="text-right" v-else>{{ formLabelAlign.province }}</p>
              </el-form-item>
              <el-form-item label="时间：">
                <!-- <el-input
                  v-model="formLabelAlign.time"
                  v-if="DilogTitle == '编辑'"
                ></el-input> -->
                <el-date-picker
                  v-model="formLabelAlign.time"
                  type="date"
                  :disabled-date="disabledDate"
                  value-format="YYYY-MM-dD"
                  v-if="DilogTitle == '编辑'"
                  @change='finish'
                >
                </el-date-picker>

                <p class="text-right" v-else>{{ formLabelAlign.time }}</p>
              </el-form-item>
              <el-form-item   v-if="DilogTitle == '编辑'">
                <el-button type="primary" @click="submitForm" size="mini" 
                  >提交</el-button
                ></el-form-item
              >
            </el-form>
          </el-scrollbar>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import { ref, reactive, toRefs, inject } from "vue";
export default {
  props: ["MyDialogData"],
  setup(props, { emit }) {
    const state = reactive({
      DialogWidth: 500,
      DialogHeight: 500,
      DilogTitle: props.MyDialogData.title,
      formLabelAlign: props.MyDialogData.rowdata,
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      options: [
        {
          value: true,
          label: "男",
        },
        {
          value: false,
          label: "女",
        },
      ],
      value1: props.MyDialogData.rowdata.gender,
    });
    // 通过emit 调用父组件关闭方法
    const close = () => {
      emit("colseDialog");
      state.formLabelAlign = "";
    };
    // 编辑时提交
    const submitForm = () => {
      props.MyDialogData.rowdata = state.formLabelAlign;
      console.log(state.formLabelAlign);
      close();
    };
    // 修改时间格式
    const finish= ((val)=>{
        console.log(val)
    })
    return {
      ...toRefs(state),
      close,
      submitForm,
      finish
    };
  },
};
</script>
<style >
.conten-dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  background-color: #000000;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}
.dialog {
  overflow: auto;
  background-color: #fff;
  position: relative;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px dashed;
  border-image: linear-gradient(45deg, gold, deeppink) 1;
  clip-path: inset(0px round 10px);
  animation: huerotate 6s infinite linear;
  filter: hue-rotate(360deg);
  overflow: hidden;
}

.nav {
  display: flex;
  align-items: center;
  border-bottom: dashed 1px #c0c4cc;
}
.colse {
  width: 25px;
  height: 25px;
  margin-left: auto;
  background: url("../../../../assets/close.png") no-repeat center;
  background-size: 100% 100%;
  margin-right: 10px;
  cursor: pointer;
}
@keyframes huerotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rorate(360deg);
  }
}

main {
  margin: 10px;
}
.title {
  font-weight: 600;
  font-size: 17px;
  margin: 10px;
}
.form-data {
  margin-top: 15px;
  height: 100%;
}

.el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
}
.el-input__icon {
  line-height: 30px !important;
}
.text-right {
  width: 80% !important;
  border-bottom: dashed 1px #c0c4cc;
}
.el-select .el-input {
  width: 80% !important;
}
.el-select-dropdown {
  min-width: 100px !important;
}
.el-input {
  width: 80% !important;
}
</style>