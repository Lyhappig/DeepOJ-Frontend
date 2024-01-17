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
        component: () => import("@/views/main/HomeView.vue"),
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
    path: "/auth",
    name: "登录注册",
    component: () => import("@/layouts/AuthLayout.vue"),
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/auth/login",
        name: "用户登录",
        component: () => import("@/views/auth/UserLoginView.vue"),
      },
      {
        path: "/auth/register",
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
    path: "/admin",
    name: "管理员可见",
    component: () => import("@/views/AdminView.vue"),
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.ADMIN,
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
