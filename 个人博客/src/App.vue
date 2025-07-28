<template>
  <div id="app">
    <div id="left">
      <Logo />
      <DaoHang />
    </div>
    <div id="right">
      <Head/>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts" name="App">
import { RouterView } from 'vue-router';
import Logo from './components/logo.vue';
import DaoHang from './components/daoHang.vue';
import Head from './components/head.vue';
import '@/assets/main.css'
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  
  display: flex;
  min-height: 100vh; /* 确保全高 */
}

#left {
  width: 350px;
  background-color: #f0f0f031;
  box-shadow: 1px 0 1px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

#right {
  flex: 1;
  position: relative;
  overflow: hidden; /* 防止内容溢出 */
}
</style>

<!-- 添加全局样式 -->
<style>
/* 全局Swiper样式 */
.swiper-pagination {
  position: absolute !important;
  bottom: 30px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: 10 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.swiper-pagination-bullet {
  width: 12px !important;
  height: 12px !important;
  margin: 0 8px !important;
  background: #d8d8d8 !important;
  opacity: 1 !important;
  transition: all 0.3s !important;
}

.swiper-pagination-bullet-active {
  background: #919191 !important;
  width: 40px !important;
  border-radius: 4px !important;
}
/* src/assets/main.css */
:root {
    --bg-color: #ffffff;
    --text-color: #222222;
    --primary-color: #42b983;
}

.dark {
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
    --primary-color: #66d3fa;
}

nav {
    background-color: var(--bg-color);
    color: var(--bg-color);
    transition: background-color 0.3s, color 0.3s;
    /* 平滑过渡 */
}
main{
    background-color: var(--main-bg);
    color: var(--text-color);
}
</style>