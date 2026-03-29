<script setup>
import {onMounted, ref} from "vue";
import {apiGetTreeList} from "@/network/api/tree.js";
import {useRouter} from "vue-router";

const router = useRouter();
const treeList = ref([])

const getTreeList = async () => {
  try {
    const {data} = await apiGetTreeList()
    treeList.value = data
  } catch (error) {
  }
}

onMounted(() => {
  getTreeList()
})

const toTreeDetail = (item) => {
  router.push({
    path: "/treedetail",
    query: {
      data: JSON.stringify({name: item.name, children: item.children})
    }
  })
}
</script>

<template>
  <van-list>
    <div class="item" v-for="item in treeList" :key="item.id" @click="toTreeDetail(item)">
      <div class="content">
        <div>{{ item.name }}</div>
        <div class="children">
          <span class="child" v-for="child in item.children">{{ child.name }}</span>
        </div>
      </div>
      <van-icon name="arrow" color="#bfbfbf"/>
    </div>
  </van-list>
</template>

<style scoped lang="scss">
.item {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 4px solid #eeeef5;

  .content {
    flex: 1;
    margin-right: 10px;
    display: flex;
    flex-direction: column;

    .children {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .child {
        font-size: 12px;
        color: #8a8a8a;
        margin-top: 10px;
        margin-right: 15px;
      }
    }
  }
}
</style>