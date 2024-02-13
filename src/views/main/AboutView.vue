<template>
  <div class="about">
    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";

const codeValue = ref(
  "public class Main {\n" +
    "    public static void main(String[] args) {\n" +
    "        \n" +
    "    }\n" +
    "}"
);

const onCodeChange = (v: string) => {
  codeValue.value = v;
  console.log(v);
};
</script>

<style scoped></style>
