<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {apiGetTreeDetailList} from "@/network/api/tree.js";
import ArticleItem from "@/components/ArticleItem.vue";

const router = useRouter();
const route = useRoute();
const {name, children} = JSON.parse(route.query.data);
const active = ref(0);
const finisheds = ref([]);
const loadings = ref([]);
const errors = ref([]);
const pages = ref([]);
const lists = ref([]);

for (let i = 0; i < children.length; i++) {
  pages.value[i] = 0;
  lists.value[i] = [];
}

const getDetailList = async () => {
  try {
    const cId = children[active.value].id;
    const page = pages.value[active.value];
    const {data} = await apiGetTreeDetailList(cId, page);
    const {datas, curPage, pageCount} = data;
    lists.value[active.value].push(...datas);
    loadings.value[active.value] = false;
    if (curPage === pageCount) {
      finisheds.value[active.value] = true;
    } else {
      pages.value[active.value]++;
    }
  } catch (err) {
    loadings.value[active.value] = false;
    errors.value[active.value] = true;
  }
};

const onClickLeft = () => {
  router.back();
};
</script>

<template>
  <div class="tree-detail">
    <van-nav-bar
        fixed
        :title="name"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"/>
    <van-tabs v-model:active="active" sticky offset-top="46" shrink>
      <van-tab v-for="(item, index) in children" :key="item.name" :title="item.name">
        <van-list :finished="finisheds[index]" v-model:error="errors[index]" v-model:loading="loadings[index]"
                  error-text="请求失败，点击重新加载"
                  finished-text="没有更多了"
                  @load="getDetailList">
          <ArticleItem v-for="item in lists[active]" :key="item.id" :article="item"/>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="scss">
.van-list {
  padding-top: 44px;
}
</style>















