<template>
  <div id="UserAuthenLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"> DeepOJ By Happig</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#UserAuthenLayout {
}

#UserAuthenLayout .content {
  padding: 20px;
  margin-bottom: 20px;
}

#UserAuthenLayout .footer {
  //background: #42b983;
  padding: 16px;
  //position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts"></script>
