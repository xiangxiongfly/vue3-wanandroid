<script setup>
import {useLoginStore} from "@/stores/loginStore.js";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const loginStore = useLoginStore();
const loginModel = ref({
  username: "",
  password: "",
});
const loginRules = {
  username: [
    {
      required: true,
      message: "请输入用户名"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码"
    }
  ],
};

const handleLogin = async () => {
  await loginStore.actionLogin(loginModel.value.username, loginModel.value.password);
  router.back();
};

const handleRegister = () => {
  showToast("注册");
};
</script>

<template>
  <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.back()"/>
  <van-form @submit="handleLogin" class="form">
    <van-field name="用户名" label="用户名：" placeholder="请输入用户名" v-model="loginModel.username"
               :rules="loginRules.username"/>
    <van-field name="密码" label="密码：" placeholder="请输入密码" v-model="loginModel.password"
               :rules="loginRules.password"/>
    <van-button round block color="#fe6243" native-type="submit" class="login-btn">登录</van-button>
    <div class="register" @click="handleRegister">注册账号</div>
  </van-form>
</template>

<style scoped lang="scss">
.form {
  margin-top: 50px;
  padding: 20px;

  .login-btn {
    margin-top: 20px;
  }

  .register {
    color: #8a8a8a;
    font-size: 14px;
    margin-top: 20px;
    padding: 5px;
    text-align: center;
    text-decoration: underline;
  }
}
</style>