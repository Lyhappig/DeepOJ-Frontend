<template>
  <div id="problemAddView">
    <h2>创建题目</h2>
    <a-form :model="form" label-align="left" size="large">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入题目标题" />
      </a-form-item>
      <a-form-item field="difficulty" label="难度">
        <a-input-number
          v-model="form.difficulty"
          :style="{ width: '140px' }"
          placeholder="请输入题目难度"
          mode="button"
          class="input-demo"
          :min="0"
          :max="4000"
          :step="100"
        />
      </a-form-item>
      <a-form-item label="题目内容" :content-flex="false" :merge-props="false">
        <a-form-item field="problemContent.content" label="题面">
          <MdEditor
            :value="form.problemContent.content"
            :handle-change="onContentChange"
          />
        </a-form-item>
        <a-form-item field="problemContent.inputDescription" label="输入描述">
          <MdEditor
            :value="form.problemContent.inputDescription"
            :handle-change="onInputChange"
          />
        </a-form-item>
        <a-form-item field="problemContent.outputDescription" label="输出描述">
          <MdEditor
            :value="form.problemContent.outputDescription"
            :handle-change="onOutputChange"
          />
        </a-form-item>
        <a-form-item
          label="题目样例"
          :content-flex="false"
          :merge-props="false"
        >
          <a-form-item
            v-for="(sample, index) of form.problemContent.samples"
            :label="`样例 ${index + 1}`"
            :key="index"
          >
            <a-space direction="vertical" style="min-width: 480px">
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-form-item
                    :field="`problemContent.samples[${index}].input`"
                    :label="`样例输入`"
                    :key="index"
                  >
                    <a-input v-model="sample.input" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item
                    :field="`problemContent.samples[${index}].input`"
                    :label="`样例输出`"
                    :key="index"
                  >
                    <a-input v-model="sample.output" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-button
                @click="handleDeleteJudgeCases(index)"
                :style="{ marginLeft: '10px' }"
                status="danger"
                >删除
              </a-button>
            </a-space>
          </a-form-item>
          <div>
            <a-button
              @click="handleAddJudgeCases"
              type="outline"
              status="success"
              >添加样例
            </a-button>
          </div>
        </a-form-item>
        <a-form-item field="problemContent.note" label="提示">
          <MdEditor
            :value="form.problemContent.note"
            :handle-change="onNoteChange"
          />
        </a-form-item>
      </a-form-item>
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-form-item field="judgeConfig.timeLimit" label="时间限制(MS)">
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                placeholder="1000"
                class="input-demo"
                :min="100"
                :max="15000"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="judgeConfig.memoryLimit" label="空间限制(MB)">
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                placeholder="256"
                class="input-demo"
                :min="4"
                :max="1024"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="judgeConfig.memoryLimit" label="栈限制(MB)">
              <a-input-number
                v-model="form.judgeConfig.stackLimit"
                :default-value="128"
                class="input-demo"
                :min="32"
                :max="256"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              field="judgeConfig.memoryLimit"
              label="代码长度限制(KB)"
            >
              <a-input-number
                v-model="form.judgeConfig.codeLengthLimit"
                placeholder="16"
                class="input-demo"
                :min="1"
                :max="32"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item field="answer" label="题解">
        <CodeEditor
          :value="form.answer"
          :handle-change="onCodeChange"
          style="flex: 1"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { ProblemControllerService } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import CodeEditor from "@/components/CodeEditor.vue";

const form = reactive({
  title: "标题",
  difficulty: 1000,
  // todo 标签
  problemContent: {
    content: "题面",
    inputDescription: "输入描述",
    outputDescription: "输出描述",
    samples: [
      {
        input: "样例一输入",
        output: "样例一输出",
      },
    ],
    note: "提示",
  },
  judgeConfig: {
    timeLimit: 1000, // MS
    memoryLimit: 256, // MB
    stackLimit: 128, // MB
    codeLengthLimit: 16, // KB
  },
  answer: "题目答案",
  // todo judgeCase 文件压缩包
  judgeCases: [
    {
      inputPath: "/home/ans1.in",
      outputPath: "/home/ans2.out",
    },
  ],
});

const doSubmit = async () => {
  const res = await ProblemControllerService.addProblemUsingPost(form);
  if (res.code === 0) {
    console.log("成功创建题目: ", form);
    Message.success({
      content: "创建成功",
    });
  } else {
    Message.error({
      content: "创建失败" + " " + res.message,
    });
  }
};

const onContentChange = (value: string) => {
  form.problemContent.content = value;
};

const onInputChange = (value: string) => {
  form.problemContent.inputDescription = value;
};

const onOutputChange = (value: string) => {
  form.problemContent.outputDescription = value;
};

const onNoteChange = (value: string) => {
  form.problemContent.note = value;
};

const handleAddJudgeCases = () => {
  form.problemContent.samples.push({
    input: "",
    output: "",
  });
};
const handleDeleteJudgeCases = (index: number) => {
  form.problemContent.samples.splice(index, 1);
};

const onCodeChange = (value: string) => {
  form.answer = value;
};
</script>

<style scoped>
#problemAddView {
}
</style>
