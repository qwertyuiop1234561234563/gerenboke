<template>
  <div class="post-container">

        <RouterLink v-for="post in posts"
      :key="post.id"
      :to="`/post/${post.id}`"
      :class="{'a':e}" @mouseleave="e=!e" @mouseenter="e=!e">
          <h2>{{ post.meta.title }}</h2>
      <p>{{ post.meta.date }}</p>
      <p>类型：{{ post.meta.tags[0]}} , {{ post.meta.tags[1] }}</p>
        </RouterLink>
    
  </div>
</template>
<script setup lang="ts" name="boKe">
import { parseMarkdown } from '@/utils/markdown.ts' // 导入工具函数
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
let e = ref(false)
interface PostItem {
  id: string
  meta: {
    title: string
    date: string
    tags: Array<string>
  }
}

const posts = ref<PostItem[]>([])

// 获取文章列表
onMounted(async () => {
  // 获取所有Markdown文件
  const modules = import.meta.glob('/public/articles/*.md')
  
  // 并行加载所有文章
  const loadingPromises = Object.keys(modules).map(async (path) => {
    const id = path.split('/').pop()?.replace('.md', '') || ''
    const { meta } = await parseMarkdown(path)
    return { id, meta }
  })

  // 等待所有文章加载完成
  const loadedPosts = await Promise.all(loadingPromises)
  posts.value = loadedPosts
  
  // 按日期排序
  posts.value.sort((a, b) => 
    new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  )
})
</script>



<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
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
  transition: all 1s;
  display: block;
  height: 200px;
  border-top:1px solid rgb(143, 143, 143) ;
  padding-left: 20px;
}
.a{
  font-size: larger;
  background-color: rgb(180, 180, 180);
}
a:hover{
  background-color: rgb(88, 88, 88);
  color: rgb(225, 241, 255);
}

</style>