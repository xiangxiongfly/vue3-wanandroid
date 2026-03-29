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
      <van-tag class="tag" color="green" plain type="primary" v-if="article.superChapterName">
        {{ article.superChapterName }}
      </van-tag>
      <van-tag class="tag" color="#25c6fc" plain type="primary" v-if="article.author">
        {{ article.author }}
      </van-tag>
      <span class="date" v-if="article.niceDate">{{ article.niceDate }}</span>
      <span class="collect"><van-icon color="red" :name="article.collect?'like':'like-o'"/></span>
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