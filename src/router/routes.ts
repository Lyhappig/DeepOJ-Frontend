import { RouteRecordRaw } from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";
import HomeView from "@/views/main/HomeView.vue";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主面板",
    redirect: "/home",
    component: BasicLayout,
    children: [
      {
        path: "/home",
        name: "首页",
        component: HomeView,
      },
      {
        path: "/problem",
        name: "题库",
        component: () => import("@/views/problem/ProblemsView.vue"),
      },
      {
        path: "/problem/add",
        name: "创建题目",
        component: () => import("@/views/problem/ProblemAddView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },
      {
        path: "/problem/:id",
        name: "做题",
        props: true,
        component: () => import("@/views/problem/ProblemView.vue"),
        meta: {
          hideInMenu: true,
        },
      },
      {
        path: "/problem/manage",
        name: "管理题目",
        component: () => import("@/views/problem/ProblemManageView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },
      {
        path: "/problem/update",
        name: "更新题目",
        component: () => import("@/views/problem/ProblemUpdateView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
          hideInMenu: true,
        },
      },
      {
        path: "/about",
        name: "关于",
        component: () => import("@/views/main/AboutView.vue"),
      },
      {
        path: "/user",
        name: "个人中心",
        component: HomeView,
        meta: {
          hideInMenu: true,
        },
      },
    ],
  },
  {
    path: "/authenticate",
    name: "登录注册",
    redirect: "/login",
    component: () => import("@/layouts/AuthLayout.vue"),
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/login",
        name: "用户登录",
        component: () => import("@/views/auth/UserLoginView.vue"),
      },
      {
        path: "/register",
        name: "用户注册",
        component: () => import("@/views/auth/UserRegisterView.vue"),
      },
    ],
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: () => import("@/views/main/HomeView.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "无权限页面",
    component: () => import("@/views/NoAuthView.vue"),
    meta: {
      hideInMenu: true,
    },
  },
];
