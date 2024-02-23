<template>
  <div class="about">
    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
    <div style="padding-top: 24px; height: 20px">
      <button @click="setValue">修改值</button>
    </div>
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

const setValue = () => {
  codeValue.value = "新的值";
  console.log(codeValue);
};

const onCodeChange = (v: string) => {
  codeValue.value = v;
  console.log(v);
};
</script>

<style scoped></style>
