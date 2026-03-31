<script setup>
import {apiCollectArticle, apiUncollectArticle, apiUncolletWithCollection} from "@/network/api/collection.js";
import router from "@/router/index.js";
import {useLoginStore} from "@/stores/loginStore.js";
import {showToast} from "vant";
import {ref} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  article: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(["uncollect"]);

const loginStore = useLoginStore();

const handleCollect = (article) => {
  if (!loginStore.isLogin) {
    showToast("请先登录");
    return;
  }
  if (article.collect) {
    uncollectArticle(article.id);
  } else {
    collectArticle(article.id);
  }
};

const collectArticle = async (id) => {
  if (!loginStore.isLogin) {
    showToast("请先登录");
    return;
  }
  const toast = showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: "加载中",
  });
  try {
    await apiCollectArticle(id);
    props.article.collect = true;
    toast.close();
    showToast("收藏成功");
  } catch (err) {
    toast.close();
    showToast("收藏失败");
  }
};
const uncollectArticle = async (id) => {
  if (!loginStore.isLogin) {
    showToast("请先登录");
    return;
  }
  const toast = showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: "加载中",
  });
  try {
    await apiUncollectArticle(id);
    props.article.collect = false;
    toast.close();
    showToast("取消成功");
  } catch (err) {
    toast.close();
    showToast("取消失败");
  }
};

const handleUncollectWithCollection = async (article) => {
  if (!loginStore.isLogin) {
    showToast("请先登录");
    return;
  }
  const toast = showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: "加载中",
  });
  try {
    await apiUncolletWithCollection(article.id, article.originId);
    toast.close();
    showToast("取消成功");
    emit("uncollect", article.id);
  } catch (err) {
    console.log("error", err);
    toast.close();
    showToast("取消失败");
  }
};

const toArticleDetails = () => {
  router.push({
    path: "/webview",
    query: {
      title: "文章详情",
      url: props.article.link
    }
  });
};
</script>

<template>
  <div class="article-item" @click.stop="toArticleDetails">
    <div class="title" v-html="article.title"></div>
    <div class="bottom">
      <van-tag class="tag" color="green" plain type="primary" v-if="article.superChapterName">
        {{ article.superChapterName }}
      </van-tag>
      <van-tag class="tag" color="#25c6fc" plain type="primary" v-if="article.author">
        {{ article.author }}
      </van-tag>
      <span class="date" v-if="article.niceDate">{{ article.niceDate }}</span>
      <template v-if="type === 'collection'">
        <span @click.stop="handleUncollectWithCollection(article)">
         <van-icon color="red" name="like"/>
        </span>
      </template>
      <template v-else>
        <span @click.stop="handleCollect(article)">
          <van-icon color="red" :name="article.collect?'like':'like-o'"/>
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-item {
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid #663a3a3c;

  .bottom {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .date {
      font-size: 12px;
      color: #bfbfbf;
      margin-right: auto;
    }
  }
}

.tag {
  margin-right: 10px;
}
</style>