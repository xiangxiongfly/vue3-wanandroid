<script setup>
import LeftMenu from "@/components/LeftMenu.vue";
import Chapter from "@/views/main/chapter/Chapter.vue";
import Home from "@/views/main/home/Home.vue";
import Nav from "@/views/main/nav/Nav.vue";
import Project from "@/views/main/project/Project.vue";
import Tree from "@/views/main/tree/Tree.vue";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const tabs = [
  {title: "首页", icon: "wap-home"},
  {title: "项目", icon: "label"},
  {title: "体系", icon: "cluster"},
  {title: "导航", icon: "location"},
  {title: "公众号", icon: "star"},
];
const components = [Home, Project, Tree, Nav, Chapter];
const currentIndex = ref(0);
const currentComponent = computed(() => components[currentIndex.value]);
const contentRef = ref(null);
const scrollPositions = ref(new Array(components.length).fill(0));

const showMenu = ref(false);

const openMenu = () => {
  showMenu.value = true;
};

const toSearch = () => {
  router.push("/search");
};

// 保存指定页面的滚动位置
const saveScrollPosition = (index) => {
  if (contentRef.value) {
    scrollPositions.value[index] = contentRef.value.scrollTop;
  }
};

// 恢复指定页面的滚动位置
const restoreScrollPosition = (index) => {
  if (contentRef.value) {
    contentRef.value.scrollTop = scrollPositions.value[index];
  }
};

// 监听页面切换
watch(currentIndex, (newIndex, oldIndex) => {
  // 保存旧页面的滚动位置
  saveScrollPosition(oldIndex);
  // 恢复新页面的滚动位置
  setTimeout(() => {
    restoreScrollPosition(newIndex);
  }, 0);
});

onMounted(() => {
  // 初始化时恢复当前页面的滚动位置
  restoreScrollPosition(currentIndex.value);
});

onUnmounted(() => {
  console.log("Main unmounted");
});
</script>

<template>
  <van-nav-bar fixed @click-left="openMenu" @click-right="toSearch">
    <template #left>
      <van-icon name="bars" color="#fff" size="large"></van-icon>
      <span class="nav-title">{{ tabs[currentIndex].title }}</span>
    </template>
    <template #right>
      <van-icon name="search" color="#fff" size="large"/>
    </template>
  </van-nav-bar>

  <div class="content" ref="contentRef">
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>

  <van-tabbar fixed border safe-area-inset-bottom
              v-model="currentIndex"
              active-color="#fe6243"
              inactive-color="#707070">
    <template v-for="tab in tabs" key=":tab.name">
      <van-tabbar-item :icon="tab.icon">{{ tab.title }}</van-tabbar-item>
    </template>
  </van-tabbar>

  <van-popup v-model:show="showMenu" position="left">
    <LeftMenu/>
  </van-popup>
</template>

<style scoped lang="scss">
.van-nav-bar {
  background-color: var(--primary-color);

  .nav-title {
    color: #fff;
    font-size: 18px;
    margin-left: 15px;
    font-weight: bold;
    margin-top: 3px;
  }
}

.content {
  height: 100vh;
  overflow-y: auto;
  padding-top: 46px;
  padding-bottom: 50px;
}

.van-popup {
  width: 60%;
  height: 100%;
}
</style>