<template>
  <div id="problemsView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="id" label="题号">
        <a-input v-model="searchParams.id" placeholder="输入题号" />
      </a-form-item>
      <a-form-item field="title" label="标题">
        <a-input v-model="searchParams.title" placeholder="输入题目标题" />
      </a-form-item>
      <div class="searchLabel">难度区间 :</div>
      <a-form-item
        field="minDifficulty"
        style="max-width: 80px; margin-right: 16px"
      >
        <a-input v-model="searchParams.minDifficulty" />
      </a-form-item>
      <div class="searchLabel">—</div>
      <a-form-item field="maxDifficulty" style="max-width: 80px">
        <a-input v-model="searchParams.maxDifficulty" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSearch">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider :size="0" />
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        current: searchParams.current,
        pageSize: searchParams.pageSize,
        total: Number(total),
        showTotal: true,
        showJumper: true,
        showPageSize: true,
      }"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
    >
      <template #acceptedNumRate="{ record }">
        {{
          `${record.submitNum ? record.acceptedNum / record.submitNum : 0} %
          (${record.acceptedNum} / ${record.acceptedNum})`
        }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toProblemPage(record)"
            >查看
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  Problem,
  ProblemControllerService,
  ProblemQueryRequest,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const total = ref(0);
const dataList = ref([]);

const searchParams = ref<ProblemQueryRequest>({
  id: undefined,
  title: "",
  minDifficulty: undefined,
  maxDifficulty: undefined,
  current: 1,
  pageSize: 10,
});

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const onPageSizeChange = (pageSize: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: pageSize,
  };
};

const loadData = async () => {
  const res = await ProblemControllerService.listProblemVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
    // console.log("管理题目信息: ", dataList.value);
  } else {
    Message.error({
      content: "加载失败" + " " + res.message,
    });
  }
};

/**
 * 监听 searchParams.value.current 变量，改变时触发页面的重新加载
 */
watch(
  () => searchParams.value.current,
  () => {
    loadData();
  }
);

/**
 * 页面加载时请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "难度",
    dataIndex: "difficulty",
  },
  {
    title: "通过率",
    slotName: "acceptedNumRate",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

/**
 * 跳转到题目详情页面
 * @param problem
 */
const toProblemPage = (problem: Problem) => {
  router.push({
    path: `/problem/${problem.id}`,
  });
};

const doSearch = () => {
  if (searchParams.value.current !== 1) {
    searchParams.value = {
      ...searchParams.value,
      current: 1,
    };
  } else {
    loadData();
  }
};
</script>

<style scoped>
#problemsView {
  max-width: 1280px;
  margin: 0 auto;
}

#problemsView .searchLabel {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  line-height: 32px;
  white-space: nowrap;
}
</style>
