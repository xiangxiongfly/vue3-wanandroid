<script setup>
import ArticleItem from "@/components/ArticleItem.vue";
import {apiGetCollectionList} from "@/network/api/collection.js";
import {ref} from "vue";

const articles = ref([]);
let page = 0;
const loading = ref(false);
const error = ref(false);
const finished = ref(false);
const getCollectionList = async () => {
  try {
    const {data} = await apiGetCollectionList(page);
    const {datas, curPage, pageCount} = data;
    articles.value.push(...datas);
    loading.value = false;
    if (curPage === pageCount) {
      finished.value = true;
    } else {
      page++;
    }
  } catch (err) {
    loading.value = false;
    error.value = true;
  }
};

const uncollect = (id) => {
  const index = articles.value.findIndex(item => item.id === id);
  if (index > -1) {
    articles.value.splice(index, 1);
  }
};
</script>

<template>
  <van-nav-bar title="收藏的文章" fixed left-text="返回" left-arrow @click-left="$router.back()"/>
  <van-list error-text="请求失败，点击重新加载"
            finished-text="没有更多了"
            v-model:error="error"
            v-model:loading="loading"
            :finished="finished"
            @load="getCollectionList"
  >
    <ArticleItem v-for="article in articles" :key="article.id" :article="article" :type="'collection'"
                 @uncollect="uncollect"></ArticleItem>
  </van-list>
</template>

<style scoped lang="scss">
.van-list {
  margin-top: 46px;
}
</style>