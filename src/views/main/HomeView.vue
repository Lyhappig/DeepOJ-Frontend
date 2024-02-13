<template>
  <div class="home">
    <MdEditor :value="mdValue" :handle-change="onMdChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue"; // @ is an alias to /src

const mdValue = ref();

const onMdChange = (v: string) => {
  mdValue.value = v;
  console.log(v);
};
</script>

<style scoped></style>
