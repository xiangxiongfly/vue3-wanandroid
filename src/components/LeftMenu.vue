<script setup>
import {KEY_USER_INFO} from "@/global/constants.js";
import {useLoginStore} from "@/stores/loginStore.js";
import {localCache} from "@/utils/cache.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import DefLogo from "@/assets/img/wanandroid_logo.png";
import {useRouter} from "vue-router";

const logo = ref(DefLogo);
const router = useRouter();
const loginStore = useLoginStore();

const {userInfo} = storeToRefs(loginStore);

const toLogin = () => {
  if (!userInfo.value) {
    router.push("/login");
  }
};
const toCollection = () => {

};
const handleLogout = () => {
  if (userInfo.value) {
    showDialog({
      title: "提示",
      message: "是否退出登录?",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "取消"
    }).then(() => {
      console.log("退出登录");
      localCache.removeCache(KEY_USER_INFO);
      loginStore.actionLogout();
    }).catch(() => {
      console.log("取消");
    });
  }
};
</script>

<template>
  <div>
    <div class="top">
      <van-image :src="logo" class="logo"/>
      <span class="nickname" @click="toLogin">{{ userInfo ? userInfo.nickname : "登录" }}</span>
    </div>
    <van-cell title="收藏的文章" :border="false" icon="like" @click="toCollection"/>
    <van-cell title="退出" :border="false" icon="clear" @click="handleLogout"/>
  </div>
</template>

<style scoped lang="scss">
.top {
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  .logo {
    width: 40%;
  }

  .nickname {
    color: #fff;
    margin-top: 15px;
  }
}
</style>