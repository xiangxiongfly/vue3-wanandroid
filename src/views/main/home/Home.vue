<script setup>
import {apiGetArticles, apiGetBanners} from "@/network/api/home.js";
import {nextTick, onActivated, onDeactivated, onMounted, onUnmounted, ref} from "vue";
import ArticleItem from "@/components/ArticleItem.vue";
import {showToast} from "vant";

const currentIndex = ref(0);
const isRefresh = ref(false);
const loading = ref(false);
const finished = ref(false);
const banners = ref([]);
const articles = ref([]);
let page = 0;

onMounted(async () => {
  getBanners();
  getArticles(true);
});

const handleRefresh = () => {
  getBanners();
  getArticles(true);
};

const handleLoadMore = () => {
  getArticles(false);
};

const handleSwipeChange = (index) => {
  currentIndex.value = index;
};

const getBanners = async () => {
  const {data} = await apiGetBanners();
  banners.value = data;
};

const getArticles = async (refresh = true) => {
  if (refresh) {
    finished.value = false;
    page = 0;
  } else {
    page++;
  }
  try {
    const {data} = await apiGetArticles(page);
    let {datas, pageCount} = data;
    if (refresh) {
      articles.value = datas;
      isRefresh.value = false;
    } else {
      articles.value.push(...datas);
      loading.value = false;
    }
    if (page === pageCount) {
      finished.value = true;
    }
  } catch (e) {
    showToast("加载失败");
    if (refresh) {
      isRefresh.value = false;
    } else {
      loading.value = false;
    }
  }
};

onUnmounted(()=>{
  console.log('Home unmounted');
})
</script>

<template>
  <van-pull-refresh v-model="isRefresh" success-text="刷新成功" @refresh="handleRefresh">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="handleLoadMore">
      <!-- 轮播图  -->
      <van-swipe @change="handleSwipeChange" v-if="banners.length>0">
        <van-swipe-item v-for="(item,index) in banners" :key="item.id">
          <van-image fit="fill" :src="item.imagePath"/>
        </van-swipe-item>
        <template #indicator>
          <div class="indicator">
            <span>{{ banners[currentIndex].title }}</span>
            <span>{{ currentIndex + 1 }}/{{ banners.length }}</span>
          </div>
        </template>
      </van-swipe>
      <!-- 列表 item  -->
      <ArticleItem v-for="item in articles" :key="item.id" :article="item"/>
    </van-list>
  </van-pull-refresh>
</template>

<style scoped>
.van-swipe {
  color: #fff;

  .van-swipe-item {
    font-size: 0;
  }

  .indicator {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
    position: absolute;
    bottom: 0;
  }
}
</style>