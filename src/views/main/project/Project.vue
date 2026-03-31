<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {apiGetProjectList, apiGetProjectTabs} from "@/network/api/project.js";
import {showToast} from "vant";

const tabs = ref([]);
const active = ref(0);
const finisheds = ref([]);
const errors = ref([]);
const loadings = ref([]);
const pages = ref([]);
const projectLists = ref([]);

onMounted(async () => {
  const {data} = await apiGetProjectTabs();
  tabs.value = data.map(item => ({name: item.name, id: item.id}));
  for (let i = 0; i <= tabs.value.length; i++) {
    finisheds.value[i] = false;
    errors.value[i] = false;
    loadings.value[i] = false;
    pages.value[i] = 1;
    projectLists.value[i] = [];
  }
});

onUnmounted(async () => {
  console.log("project onUnmounted");
});

const getProjectList = async () => {
  const page = pages.value[active.value];
  const id = tabs.value[active.value].id;
  try {
    const {data} = await apiGetProjectList(page, id);
    const {datas, curPage, pageCount} = data;
    loadings.value[active.value] = false;
    projectLists.value[active.value].push(...datas);
    if (curPage === pageCount) {
      finisheds.value[active.value] = true;
    }
    pages.value[active.value] += 1;
  } catch (error) {
    showToast("请求失败");
    loadings.value[active.value] = false;
    errors.value[active.value] = true;
  }
};

onUnmounted(() => {
  console.log("Project unmounted");
});
</script>

<template>
  <van-tabs v-model:active="active" sticky offset-top="46" swipeable>
    <van-tab v-for="(item,index) in tabs" :key="item.id" :title="item.name" :swipeable="true">
      <van-list :finished="finisheds[index]" v-model:loading="loadings[index]" v-model:error="errors[index]"
                error-text="请求失败，点击重新加载"
                finished-text="没有更多了"
                @load="getProjectList">
        <div v-for="item in projectLists[active]" :key="item.id" class="item">
          <van-image class="img" width="70" lazy-load :src="item.envelopePic"/>
          <div class="content">
            <div class="van-multi-ellipsis--l2 title">{{ item.title }}</div>
            <div class="van-multi-ellipsis--l2 desc">{{ item.desc }}</div>
            <div class="bottom">
              <van-tag color="#25c6fc" plain class="author">{{ item.author }}</van-tag>
              <span class="date">{{ item.niceDate }}</span>
            </div>
          </div>
        </div>
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="scss">
.item {
  height: 140px;
  padding: 10px;
  display: flex;
  flex-direction: row;

  .img {
  }

  .content {
    position: relative;
    margin-left: 15px;
    flex: 1;

    .desc {
      color: #8a8a8a;
      font-size: 12px;
      margin-top: 10px;
    }

    .bottom {
      position: absolute;
      bottom: 0;

      .author {
        margin-right: 10px;
      }

      .date {
        color: #bfbfbf;
        font-size: 12px;
      }
    }
  }
}
</style>