<template>
  <div id="app">
    <RouterView />
  </div>
</template>
<style>
#app {
}
</style>
<script setup lang="ts">
import { onMounted } from "vue";

const doInit = () => {
  console.log("hello, 欢迎使用 DeepOJ");
};

onMounted(() => {
  doInit();
});
</script>
