<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {apiGetChapterList} from "@/network/api/chapter.js";
import {useRouter} from "vue-router";

const router = useRouter();
const chapterList = ref([]);

onMounted(() => {
  getChapterList();
});

const getChapterList = async () => {
  const {data} = await apiGetChapterList();
  chapterList.value = data;
};

function getRandomColor() {
  const str = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += str[Math.floor(Math.random() * 16)];
  }
  return color;
}

const toChapterDetail = (name, id) => {
  router.push({
    path: "/chapterdetail",
    query: {name, id},
  });
};

onUnmounted(() => {
  console.log("Chapter unmounted");
});
</script>

<template>
  <div class="chapter">
    <div class="item" v-for="item in chapterList" :key="item.id" :style="{backgroundColor:getRandomColor()}"
         @click="toChapterDetail(item.name,item.id)">
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped>
.chapter {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .item {
    width: 50%;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
}
</style>