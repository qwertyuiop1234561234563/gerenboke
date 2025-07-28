<template>
    <div class="logo">
        <i class="iconfont icon-crown"></i>
        <h2>个人博客</h2>
    </div>
</template>
<script setup lang="ts" name="logo">

</script>
<style scoped>
i{
    transition: all 1s;
}
i:hover{
    background-color: rgb(255, 255, 255);
    color: #000;
}
.iconfont{
    font-size: 40px;
    margin-right: 10px;
    background-color: aqua;
    border-radius: 50%;
    color: aliceblue;
}
.logo {
    display: flex;
    padding: 10px;
    height: 100px;
    width: 350px;
    text-align: left;
    margin-left: 20px;
    align-items: center;
}
</style>