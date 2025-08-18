<template>
  <div id="app">
    <div id="left" :class="{fold:layoutStore.fold}">
      <Logo />
      <DaoHang />
    </div>
    <transition name="right-fade" mode="out-in">
      <div
        id="right"
        :key="String(layoutStore.refsh)"
      >
        <Head />
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts" name="App">
import { RouterView } from 'vue-router';
import Logo from './components/logo.vue';
import DaoHang from './components/daoHang.vue';
import Head from './components/head.vue';
import '@/assets/main.css'
import { useLayoutStore } from '@/stores/setting';
const layoutStore = useLayoutStore()
import { watch ,ref,nextTick} from 'vue';
const flag = ref(true)
watch(()=>layoutStore.refsh,()=>{
    flag.value = false
    setTimeout(()=>{
        flag.value = true
    }, 300) // 300ms 可根据动画时长调整
})
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
#left{
  background-color: rgb(255, 255, 255);
  color: #363636;
}
#right {
  flex: 1;
  width: 100%;
  overflow: hidden; /* 防止内容溢出 */
  transition: margin-left 1s;
}
.fold + #right {
margin-left: 60px; /* 折叠后的值 */
}
.scale {
  transform: scale(0.98);
  opacity: 0.7;
}
.fold{
  width: 60px;
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

/* 添加的过渡效果样式 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

/* 右侧切换动画 */
.right-fade-enter-active, .right-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.right-fade-enter-from, .right-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.right-fade-enter-to, .right-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>