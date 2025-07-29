<template>
    <div id="daoHang">
       <div class="c1" ><RouterLink to="/":class="{'active':a==='home'}" @click="setActive('home')"><p><i class="iconfont icon-home"></i>首页</p><i class="iconfont icon-icon-test3"></i></RouterLink></div>
       <div class="c1" ><RouterLink to="/xiangmu":class="{'active':a==='xiangmu'}" @click="setActive('xiangmu')"><p><i class="iconfont icon-home"></i>项目</p><i class="iconfont icon-icon-test3"></i></RouterLink></div>
       <div class="c1" ><RouterLink to="/boke":class="{'active':a==='boke'}" @click="setActive('boke')"><p><i class="iconfont icon-home"></i>博客</p><i class="iconfont icon-icon-test3"></i></RouterLink></div>
       <div class="c1" ><RouterLink to="/about":class="{'active':a==='about'}" @click="setActive('about')"><p><i class="iconfont icon-home"></i>其他</p><i class="iconfont icon-icon-test3"></i></RouterLink></div>
    </div>
</template>
<script setup lang="ts" name="daoHang">
import { RouterLink,RouterView } from 'vue-router';
import { ref } from 'vue';
const a=ref('home')
function setActive(e:string){
    a.value=e
}
</script>
<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    .active{
        background-color: #0000007c;
        color: #ffffff;
    }
    .c1{
        display: flex;
        justify-content: space-between;
    }
    a{
        display: flex;
        padding: 10px auto;
        color: #6dcaff;
        text-decoration: none;
        text-align: left;
        width: 350px;
        height: 100px;
        line-height: 100px;
        justify-content: space-between;
        align-items: center;
        border-radius: 20px;
    }
    a:hover{
        background-color: #0000007c;
        color: #ffffff;
    }
    #daoHang{
        width: 350px;
        height: 400px;
        background-color: #f0f0f000;
        display: flex;
        flex-wrap: wrap;
    }
    i{
        display: inline-block;
        margin-right: 20px;
        font-size: 30px;
        margin-left: 10px;
    }
    p{
        display: inline-block;
    }
</style>