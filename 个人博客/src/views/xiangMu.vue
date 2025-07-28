<template>
    <div>
        <ul>
            <li v-for="(xiangmu,index) in xiangMu" :key="xiangmu.id">
                <img :src="xiangmu.img" alt="图片">
                <a :href="xiangmu.http" target="_blank">点击跳转</a>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts" name="xiangMu">
import { storeToRefs } from 'pinia';
import { useXiangmuStore } from '@/stores/xiangMu';
const stores = useXiangmuStore()
const {xiangMu }=storeToRefs(stores)
</script>
<style scoped>
li{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
img{
    width: 500px;
    height: 300px;
    border-radius: 15px;
}
a{
    text-decoration: none;
    color: rgb(114, 189, 255);
    margin-right: 150px;
}
a:hover{
    color: rgb(133, 133, 133);
}
</style>