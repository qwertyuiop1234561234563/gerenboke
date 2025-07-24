<template>
    <div id="app">
        <div id="left">
             <Logo />
            <DaoHang />
        </div>
        <div>
            <RouterView></RouterView>
        </div>
    </div>
</template>
<script setup lang="ts" name="App">
import Logo from './components/logo.vue'
import DaoHang from './components/daoHang.vue'
import { RouterView } from 'vue-router';

</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
   background-color: rgb(255, 255, 255);
   background-size: cover;
   background-repeat: no-repeat;
   background-attachment: fixed;
   display: flex;
   border-radius: 15px;
   height: 100%;
   width: 1000px;
}
#left {
    width: 350px;
    height: 100%;
    background-color: #f0f0f031;
    box-shadow: 1px 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>