<template>
  <div id="problemManageView">
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
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #updateTime="{ record }">
        {{ moment(record.updateTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Problem, ProblemControllerService } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";

const total = ref(0);
const dataList = ref([]);

const searchParams = ref({
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
  const res = await ProblemControllerService.listProblemByPageUsingPost(
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
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

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
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "题目内容",
    dataIndex: "problemContent",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCases",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "比赛",
    dataIndex: "contestId",
  },
  {
    title: "出题人",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "更新时间",
    slotName: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const router = useRouter();

const doUpdate = (problem: Problem) => {
  router.push({
    path: "/problem/update",
    query: {
      id: problem.id,
    },
  });
};

const doDelete = async (problem: Problem) => {
  const res = await ProblemControllerService.deleteProblemUsingPost({
    id: problem.id,
  });
  if (res.code === 0) {
    loadData();
    Message.success({
      content: "删除成功",
    });
  } else {
    Message.error({
      content: "删除失败" + " " + res.message,
    });
  }
};
</script>

<style scoped>
#problemManageView {
}
</style>
