<template>
    <div id="daoHang">
       <RouterLink to="/">首页</RouterLink>
       <RouterLink to="/">项目</RouterLink>
       <RouterLink to="/">博客</RouterLink>
        <RouterLink to="/">经验</RouterLink>
       <RouterLink to="/">其他</RouterLink>
    </div>
</template>
<script setup lang="ts" name="daoHang">
import { RouterLink,RouterView } from 'vue-router';
</script>
<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    a{
        display: block;
        padding: 10px auto;
        color: #333;
        text-decoration: none;
        text-align: center;
        width: 350px;
        height: 100px;
        line-height: 100px;
    }
    #daoHang{
        width: 350px;
        height: 100%;
        background-color: #f0f0f000;

    }
</style>