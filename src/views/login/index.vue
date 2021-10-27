<template>
  <div class="login">
    <main class="container-box">
      <div class="left item ib"></div>
      <div class="right item ib">
        <el-form
          class="demo-ruleForm"
          label-position="top"
          label-width="100px"
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="account">
            <el-input
              autocomplete="off"
              placeholder="用户名admin"
              clearable
              v-model="ruleForm.account"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              autocomplete="off"
              placeholder="密码123456"
              type="password"
              clearable
              v-model="ruleForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="loginHandle('ruleForm')"
              :loading="loading"
              round
              class="login-btn"
              ><span class="login-world">登录</span></el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </main>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {getLogin } from "../../api/index";
export default {
  data() {
    return {
      ruleForm: {
        account: "",
        password: "",
      },
    };
  },
  setup() {
    const checked = ref(true);
    const router = useRouter();
    const rules = {
      account: [{ required: true, message: "请输入用户名" }],
      password: [{ required: true, message: "请输入密码" }],
    };
    const loginHandle = async () => {
      const {data} = await getLogin();
      console.log(data);
      
      // router.push("/dashboard");
    };
    return {
      rules,
      checked,
      loginHandle,
    };
  },
};
</script>
<style >
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  background-attachment: fixed;
  background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0383c2255cc6acf32f8755e66394003.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635059786&t=157e19880ed74b7c62f0632cb12ea01c")
    no-repeat;
  background-size: cover;
}
.ib {
  display: inline-block;
  vertical-align: middle;
}
.container-box {
  width: 1105px;
  height: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
}
.left {
  background: url("http://wangfan.store/docs/img/login-bg.d9b2f0b8.png")
    no-repeat;
  background-size: 100% 100%;
  width: 700px !important;
}
.right {
  background-color: #fff;
  padding: 154px 64px 120px 90px;
}
.item {
  width: 50%;
}
.login-btn {
  font-size: 14px;
  text-align: center;
  margin-top: 54px;
  cursor: pointer;
  width: 100%;
}
</style>
