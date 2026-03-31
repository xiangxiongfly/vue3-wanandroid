<script setup>
import {onMounted, ref} from "vue";
import {useLoginStore} from "@/stores/loginStore.js";
import {apiGetHotkeys, apiQueryList} from "@/network/api/search.js";
import ArticleItem from "@/components/ArticleItem.vue";

const loginStore = useLoginStore();
const keywords = ref("");
const hotkeys = ref([]);
let page = 0;
const items = ref([]);
const loading = ref(false);
const error = ref(false);
const finished = ref(false);
const currentKeywords = ref("");

loginStore.initKeywordsList();

const onSearch = (val) => {
  currentKeywords.value = val;
  loginStore.addKeywords(val);
  page = 0;
  items.value = [];
  getQueryList();
};

const onCancel = () => {
  currentKeywords.value = "";
  items.value = [];
};

const clickTag = (val) => {
  currentKeywords.value = val;
  loginStore.addKeywords(val);
  keywords.value = val;
  page = 0;
  items.value = [];
  getQueryList();
};

const clearRecords = () => {
  loginStore.clearKeywords();
};

onMounted(() => {
  getHotkeys();
});

const getHotkeys = async () => {
  const {data} = await apiGetHotkeys();
  hotkeys.value = data;
};

const getQueryList = async () => {
  try {
    const {data} = await apiQueryList(page, currentKeywords.value);
    const {datas, curPage, pageCount} = data;
    items.value.push(...datas);
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
</script>

<template>
  <div class="search">
    <van-nav-bar title="搜索" fixed left-text="返回" left-arrow @click-left="$router.back()"/>
    <van-search
        v-model="keywords"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
    <div class="container">
      <div v-if="items.length===0">
        <div class="search-records">
          <div class="title">
            <span>搜索记录</span>
            <span style="color:red;" @click="clearRecords">清空记录</span>
          </div>
          <van-space wrap="wrap">
            <van-tag v-for="item in loginStore.keywordsList" :key="item" type="primary" size="large" plain
                     @click="clickTag(item)">
              {{ item }}
            </van-tag>
          </van-space>
        </div>
        <div class="line"></div>
        <div class="hot-search">
          <div class="title">
            <span>热门搜索</span>
          </div>
          <van-space wrap="wrap">
            <van-tag v-for="item in hotkeys" :key="item.id" type="primary" size="large" plain
                     @click="clickTag(item.name)">
              {{ item.name }}
            </van-tag>
          </van-space>
        </div>
      </div>
      <div v-else>
        <van-list v-model:loading="loading" v-model:error="error"
                  :finished="finished"
                  finished-text="没有更多了"
                  error-text="请求失败，点击重新加载"
                  onLoad="getQueryList"
        >
          <ArticleItem v-for="article in items" :key="article.id" :article="article"></ArticleItem>
        </van-list>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 10px;

  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .search-records {
    display: flex;
    flex-direction: column;
  }

  .hot-search {
    display: flex;
    flex-direction: column;
  }
}
</style>