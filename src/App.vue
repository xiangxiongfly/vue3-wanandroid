<script setup>
</script>

<template>
  <router-view v-slot="props">
    {{ console.log("props内容：", props) }}
    <keep-alive>
      <component :is="props.Component"></component>
    </keep-alive>
  </router-view>
</template>

<style>
</style>
