<template>
  <div class="login">
    <main class="container-box">
      <div class="left item ib"></div>
      <div class="rights item ib">
        <el-form
          class="demo-ruleForm"
          label-position="top"
          label-width="100px"
          ref="ruleForm"
          :model="ruleForms"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="account">
            <el-input
              autocomplete="off"
              placeholder="admin"
              clearable
              v-model="ruleForms.account"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              autocomplete="off"
              placeholder="123456"
              type="password"
              clearable
              v-model="ruleForms.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked" @change="changeChecked">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="loginHandle('ruleForm')"
              round
              class="login-btn mdui-ripple"
              ><span class="login-world ">登录</span></el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </main>
  </div>
</template>
<script>
import { ref, reactive, toRefs,computed} from "vue";
import { useRouter } from "vue-router";
import { getLogin } from "../../api/index";
import { ElNotification } from "element-plus";
import { useStore } from "vuex";
export default {
  setup() {
    const checked = ref(false);
    const state = reactive({
      ruleForms: {
        account: "",
        password: "",
      },
    });
    const store = useStore(); // vue3中无法使用this 所以需要定义store
    const router = useRouter();
    const rules = {
      account: [{ required: true, message: "请输入用户名" }],
      password: [{ required: true, message: "请输入密码" }],
    };
    const ruleForm = ref(null);
    const changeChecked =(val)=>{
      store.commit("setChecked",val);
    }
    // const newChecked =sessionStorage.getItem('checked');
    // console.log(newChecked)
    // if(newChecked){
    //   checked.value=true;
    // }else{
    //   checked.value=false;

    // }
    const loginHandle = async () => {
      ruleForm.value.validate(async (valid) => {
        if (valid) {
          const { data } = await getLogin(state.ruleForms);
          if (data.code == 200) {
            console.log(data);
            //根据store中set_token方法将token保存至localStorage/sessionStorage中
            store.commit("set_token", data.token);
            sessionStorage.setItem("token", data.token);
            if (store.state.token) {
              router.push("/");
            } else {
              router.replace("/login");
            }
          } else {
            ElNotification({
              title: "提示",
              message: data.msg,
              type: "error",
            });
          }
        } else {
          ElNotification({
            title: "提示",
            message: "账号密码不能为空！",
            type: "info",
          });
          return false;
        }
      });
    };
    return {
      rules,
      checked,
      ruleForm,
      loginHandle,
      changeChecked,
      ...toRefs(state),
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
.rights {
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
