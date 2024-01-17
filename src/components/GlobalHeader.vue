<template>
  <a-row id="globalHeader" :wrap="false">
    <a-col flex="24px" />
    <a-col flex="100px">
      <div class="title-bar">
        <img class="logo" src="../assets/oj-logo.png" />
        <div class="title">DeepOJ</div>
      </div>
    </a-col>
    <a-col flex="auto">
      <div>
        <a-menu
          mode="horizontal"
          :selected-keys="[route.path]"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { routes } from "@/router/routes";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

const store = useStore();
const router = useRouter();
const route = useRoute();

const visibleRoutes = computed(() => {
  const mainPages = routes[0]?.children as Array<RouteRecordRaw>;
  return mainPages.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// // 默认主页
// const selectKeys = ref([route.path]);
// // 路由跳转后，更新选中的菜单
// router.afterEach((to, from, failure) => {
//   selectKeys.value = [to.path];
//   console.log(selectKeys.value);
// });

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
#globalHeader {
  justify-content: center;
  align-items: center;
}

.title-bar {
  display: flex;
  align-items: center;
}

.title-bar .logo {
  height: 48px;
}

.title-bar .title {
  color: black;
  margin-left: 16px;
  font-size: 16px;
}
</style>
