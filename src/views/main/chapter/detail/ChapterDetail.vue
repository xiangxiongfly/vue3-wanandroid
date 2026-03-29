<script setup>

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {apiGetChapterDetail} from "@/network/api/chapter.js";
import ArticleItem from "@/components/ArticleItem.vue";

const router = useRouter();
const route = useRoute()
const {name, id} = route.query
const loading = ref(false);
const error = ref(false)
const finished = ref(false);
const page = ref(0)
const detailList = ref([])

const onClickLeft = () => {
  router.back()
}

const getDetailList = async () => {
  try {
    const {data} = await apiGetChapterDetail(id, page.value)
    const {datas, curPage, pageCount} = data
    detailList.value.push(...datas)
    loading.value = false
    if (curPage === pageCount) {
      finished.value = true
    } else {
      page.value++
    }
  } catch (error) {
    loading.value = false
    error.value = true
  }
}
</script>

<template>
  <div class="chapter-detail">
    <van-nav-bar
        fixed
        :title="name"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"/>
    <van-list
        v-model:loading="loading"
        :finished="finished"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="getDetailList"
        style="margin-top: 46px;"
    >
      <ArticleItem v-for="item in detailList" :key="item.id" :article="item"/>
    </van-list>

  </div>
</template>

<style scoped lang="scss">

</style>