<template>
<div class="head">
    <div>
        <ul>
            <li>个人简介</li>
            <li><i></i></li>
        </ul>
    </div>
    <div>
        <i></i>
        <img src="" alt="头像">
        <i></i>
    </div>
</div>
</template>
<script setup lang="ts" name="Head">
import { RouterLink } from 'vue-router';
</script>
<style scoped>
.head{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
li{
    list-style: none;
}
</style>