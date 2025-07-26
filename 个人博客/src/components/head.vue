<template>
<div class="head">
    <div class="me">
        <ul>
            <li @click="aboutMe">个人简介</li>
            <li><i class="iconfont icon-tianqi-qing"></i></li>
        </ul>
    </div>
    <div class="about">
        <i class="iconfont icon-search"></i>
        <img src="@\assets\img\touxiang.jpg" alt="头像">
        <i class="iconfont icon-menu"  @click="aboutMe"></i>
    </div>
    <transition name="slide" mode="out-in" @mouseleave="hide">
        <div v-if="show" class="about-me">
            <img src="@/assets/img/touXiang.jpg" alt="头像" style="width: 100px; height: 100px; border-radius: 50%;">
            <h3>王继毅</h3>
            <h4>男</h4>
            <h4>微信号：w18781663225</h4>
            <p>个人说明：暂无，想细聊请加我微信</p>
        </div>
    </transition>
</div>
</template>
<script setup lang="ts" name="Head">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
const show = ref(false)
const aboutMe = () => {
    show.value = true;
}
const hide = () => {
    setTimeout(() => {
        show.value = false;
    }, 900)
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.8s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
h4{
    height: 50px;
}

i{
    font-size: 30px;
    cursor: pointer;
}
.icon-tianqi-qing{
    color: rgb(255, 204, 63);
}
.about-me {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    z-index: 9999;
    text-align: right;
}
.about-me li{
    display: block;
}
.about{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 200px;
}
.head{
    height: 91px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 91px;
}
li{
    list-style: none;
    cursor: pointer;
}
.me li:hover{
    color: aquamarine;
}
ul{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 200px;
    margin-left: 20px;
}
img{
    border-radius: 50%;
    height: 60px;
}
</style>