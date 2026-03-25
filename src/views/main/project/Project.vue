<script setup>

import {onMounted} from "vue";
import {apiGetProjectList, apiGetProjectTabs} from "@/network/api/project.js";

let page = 0;

onMounted(() => {
  const res = apiGetProjectTabs()
  console.log("project res", res)
  // apiGetProjectList()
})
</script>

<template>
  Project
</template>

<style scoped>

</style>