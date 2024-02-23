<template>
  <div id="problemView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="problemContent">
          <a-tab-pane key="problemContent" title="题目描述">
            <a-card :title="problem.title">
              <a-card>
                <a-descriptions align="left" :column="{ xs: 1, md: 2, lg: 2 }">
                  <a-descriptions-item label="时间限制：">
                    {{ problem.judgeConfig?.timeLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制：">
                    {{ problem.judgeConfig?.memoryLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="提交总数：">
                    {{ problem.submitNum ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="通过总数：">
                    {{ problem.acceptedNum ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="难度：">
                    {{ problem.difficulty ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="出题人：">
                    {{ problem.userVO?.userName ?? 0 }}
                  </a-descriptions-item>
                </a-descriptions>
              </a-card>
              <MdViewer :value="statement" />
            </a-card>
          </a-tab-pane>
          <a-tab-pane
            key="mySubmissions"
            title="我的提交"
            disabled
          ></a-tab-pane>
          <a-tab-pane key="discussion" title="查看题解"
            >目前没有题解
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline" size="large">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              default-value="java"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>c</a-option>
              <a-option>python</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <code-editor
          :value="form.code"
          :language="form.language"
          :handle-change="onCodeChange"
        />
        <a-divider :size="0" />
        <a-card>
          <a-button type="primary" @click="doSubmit">提交</a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
import { Message } from "@arco-design/web-vue";
import {
  ProblemControllerService,
  ProblemVO,
  SubmissionAddRequest,
  SubmissionControllerService,
} from "../../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const problem = ref<ProblemVO>({
  title: "",
  difficulty: 0,
  // todo 标签
  problemContent: {
    content: "",
    inputDescription: "",
    outputDescription: "",
    samples: [
      {
        input: "",
        output: "",
      },
    ],
    note: "",
  },
  judgeConfig: {
    timeLimit: 0, // MS
    memoryLimit: 0, // MB
    stackLimit: 0, // MB
    codeLengthLimit: 0, // KB
  },
  answer: "",
  userVO: {
    id: 0,
    userName: "Happig",
  },
});

const statement = ref(
  "## 题目描述\n" +
    "## 输入描述\n" +
    "## 输出描述\n" +
    "## 样例\n" +
    "### 输入\n" +
    "### 输出\n" +
    "## 说明"
);

const getStatement = () => {
  let value =
    "## 题目描述\n" +
    problem.value.problemContent?.content +
    "\n## 输入描述\n" +
    problem.value.problemContent?.inputDescription +
    "\n## 输出描述\n" +
    problem.value.problemContent?.outputDescription;
  let len = problem.value.problemContent?.samples
    ? problem.value.problemContent?.samples.length
    : 0;
  for (let i = 0; i < len; i++) {
    const input = problem.value.problemContent?.samples
      ? problem.value.problemContent?.samples[i].input
      : "";
    const output = problem.value.problemContent?.samples
      ? problem.value.problemContent?.samples[i].output
      : "";
    value =
      value +
      "\n## 样例" +
      (i + 1) +
      "\n" +
      "### 输入\n" +
      input +
      "\n### 输出\n" +
      output;
  }
  value = value + "\n## 说明\n" + problem.value.problemContent?.note + "\n";
  statement.value = value;
};

const loadData = async () => {
  const res = await ProblemControllerService.getProblemVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    problem.value = res.data as any;
    getStatement();
  } else {
    Message.error({
      content: "id 为 " + props.id + " 的题目加载失败, " + res.message,
    });
  }
};

onMounted(() => {
  loadData();
});

const form = ref<SubmissionAddRequest>({
  code: "",
  language: "java",
});

const doSubmit = async () => {
  if (!problem.value?.id) {
    return;
  }
  const res = await SubmissionControllerService.doSubmitUsingPost({
    problemId: problem.value.id,
    ...form.value,
  });
  if (res.code === 0) {
    Message.success({
      content: "提交成功",
    });
  } else {
    Message.error({
      content: "提交失败" + " " + res.message,
    });
  }
};

const onCodeChange = (code: string) => {
  form.value.code = code;
};
</script>

<style scoped>
#problemView {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
