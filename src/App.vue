<script setup>
</script>

<template>
  <router-view v-slot="{Component}">
    <keep-alive include="Main">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style>
</style>
