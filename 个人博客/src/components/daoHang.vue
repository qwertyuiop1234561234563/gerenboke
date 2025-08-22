<template>
    <el-col :span="12" >
      <el-menu
        :default-active="route.path"
    class="el-menu-vertical-demo"
    :collapse="fold"
    background-color="rgb(182, 182, 182)"
      >
        <el-menu-item index="/" @click="goRoute" >
          
            <el-icon><location /></el-icon>
            <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="/xiangmu" @click="goRoute">
          <el-icon><icon-menu /></el-icon>
          <template #title>项目</template>
        </el-menu-item>
        <el-menu-item index="/boke" @click="goRoute">
          <el-icon><document /></el-icon>
          <template #title>博客</template>
        </el-menu-item>
        <el-menu-item index="/about" @click="goRoute">
          <el-icon><setting /></el-icon>
          <template #title>其他</template>
        </el-menu-item>
      </el-menu>
    </el-col>

</template>
<script setup lang="ts" name="daoHang">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { RouterLink,RouterView,useRoute,useRouter } from 'vue-router';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@/stores/setting';
const store = useLayoutStore()
const {fold,refsh} = storeToRefs(store)
const router = useRouter()
const route = useRoute()
const goRoute = (to:any)=>{
  router.push({path:to.index})
}
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
    .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  
}
</style>