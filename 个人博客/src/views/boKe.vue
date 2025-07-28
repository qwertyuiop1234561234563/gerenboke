<template>
  <div class="post-container">
    <ul>
      <li v-for="(post,index) in posts" :key="post.id">
        <RouterLink :to="`/post/${post.id}`">
          {{ post.title }}
        </RouterLink>
      </li>
    </ul>
    
  </div>
</template>
<script setup lang="ts" name="boKe">

import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/posts.ts'
import { parseMarkdown } from '@/utils/markdown.ts' // 导入工具函数
import { RouterLink } from 'vue-router'

const postStore = usePostStore()
const{posts} = storeToRefs(postStore)
</script>



<style scoped>
 /* @import 'github-markdown-css/github-markdown-dark.css';  */

.markdown-body {
  padding: 20px;
}
ul{
  list-style: none;
  padding: 0;
}
li{
  margin: 10px 0;
}
a{
  text-decoration: none;
  color:inherit !important;
  font-size : 1.2rem;
}
a:hover{
  background-color: rgb(146, 146, 146);
  color: rgb(56, 56, 56);
}
</style>