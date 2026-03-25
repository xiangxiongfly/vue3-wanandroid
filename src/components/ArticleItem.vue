<script setup>
const props = defineProps({
  article: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <div class="article-item">
    <div class="title">{{ article.title }}</div>
    <div class="bottom">
      <van-tag class="author" plain type="primary" v-if="article.author">{{ article.author }}</van-tag>
      <span class="time" v-if="article.niceDate">{{ article.niceDate }}</span>
      <span class="collect">{{ article.collect ? "已收藏" : "未收藏" }}</span>
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

    .author {
      color: #25c6fc;
      margin-right: 10px;
    }

    .time {
      margin-right: auto;
    }
  }

}
</style>