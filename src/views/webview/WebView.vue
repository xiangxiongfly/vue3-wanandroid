<script setup>

import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const webviewTitle = ref("");
const webviewUrl = ref("");

const route = useRoute();
const {title, url} = route.query;
webviewTitle.value = title;
webviewUrl.value = url;
</script>

<template>
  <div class="article-details">
    <van-nav-bar :title="webviewTitle" left-text="返回" left-arrow @click-left="$router.back()"/>
    <iframe
        :src="webviewUrl"
        frameborder="0"
        class="iframe"
        sandbox="allow-same-origin allow-scripts"
    ></iframe>
  </div>
</template>

<style scoped lang="scss">
.article-details {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .iframe {
    flex: 1;
  }
}
</style>