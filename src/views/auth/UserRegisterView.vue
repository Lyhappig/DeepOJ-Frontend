<template>
  <div id="registerView">
    <!-- <img class="bac-img animate__animated animate__pulse" src="@/assets/bac.png" alt="" /> -->
    <a-form
      ref="registerForm"
      :model="form"
      size="large"
      class="registerForm animate__animated animate__bounceIn"
      @submit="handleSubmit"
      auto-label-width
    >
      <a-space class="loginTitle">
        <img style="height: 64px" src="../../assets/oj-logo.png" />
        <h1>DeepOJ</h1>
      </a-space>
      <a-form-item
        field="userAccount"
        :validate-trigger="['change', 'focus']"
        label="用户"
      >
        <a-input v-model="form.userAccount" placeholder="用户名输入..." />
      </a-form-item>
      <a-form-item
        field="userPassword"
        :validate-trigger="['change', 'focus']"
        label="密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="密码输入..."
        />
      </a-form-item>
      <a-form-item
        field="checkPassword"
        :validate-trigger="['change', 'focus']"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="确认密码..."
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" size="large" long
          >注册
        </a-button>
        <a-button @click="$refs.registerForm.resetFields()" size="large" long
          >重置
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import { Message } from "@arco-design/web-vue";

const router = useRouter();
const store = useStore();

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    Message.success({
      content: "注册成功",
    });
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/home",
      replace: true,
    });
  } else {
    Message.error({
      content: "注册失败" + " " + res.message,
    });
  }
};
</script>
<style scoped>
#registerView {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
  background-size: 100%;
  background-color: #0048cd;
}

#registerView .registerForm {
  max-width: 400px;
  //max-height: 600px;
  box-sizing: border-box;
  padding: 40px 40px;
  /*box-shadow: 0 0 6px #e0e0e0;*/
  border-radius: 9px;
  background-color: #fff;
}

#registerView .loginTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  margin-bottom: 16px;
}

#registerView .tips {
  color: red;
  text-align: center;
  margin-top: -9px;
}

#registerView .loginRegister {
  text-align: center;
}

@media (max-width: 390px) {
  #registerView {
    width: 350px;
  }
}

@media (max-width: 330px) {
  #registerView {
    width: 300px;
  }
}
</style>
