<script setup>
import {computed, onMounted, ref} from "vue";
import {apiGetNavList} from "@/network/api/nav.js";

const contentRef = ref()
const active = ref(0)
const items = ref([])

onMounted(() => {
  getNavList()
})

const getNavList = async () => {
  const {data} = await apiGetNavList()
  items.value = data
}

const handleChange = (value) => {
  contentRef.value.scrollTop = 0
}
</script>

<template>
  <div class="nav">
    <van-sidebar class="sidebar" v-model="active" @change="handleChange">
      <van-sidebar-item v-for="item in items" :key="item.cid" :title="item.name"/>
    </van-sidebar>
    <div class="content" ref="contentRef">
      <van-space wrap>
        <template v-if="items[active]">
          <van-tag v-for="item in items[active].articles" :key="item.id" plain round type="primary" size="large"
                   style="padding: 10px 15px;">
            {{ item.title }}
          </van-tag>
        </template>
      </van-space>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav {
  height: 100%;
  display: flex;
  flex-direction: row;

  .sidebar {
    width: 100px;
    overflow-y: scroll;
  }

  .content {
    flex: 1;
    padding: 10px;
    overflow-y: scroll;
  }
}
</style>