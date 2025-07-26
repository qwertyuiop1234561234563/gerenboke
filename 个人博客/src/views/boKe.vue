<!-- src/views/PostView.vue -->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/posts.ts'
import { parseMarkdown } from '@/utils/markdown.ts' // 导入工具函数

const route = useRoute()
const postStore = usePostStore()
const post = computed(() => {
  const found = postStore.posts.find(p => p.id === Number(route.params.id))
  return found || { title: '文章不存在', content: '请检查URL' } // 默认值
})

// 将 Markdown 转为 HTML
const htmlContent = computed(() => {
  return parseMarkdown(post.value.content)
})
</script>

<template>
  <div class="post-container">
    <h1>{{ post.title }}</h1>
    <!-- 渲染 Markdown 内容 -->
    <div class="markdown-body" v-html="htmlContent"></div>
  </div>
</template>

<style scoped>
/* 添加 GitHub 风格的 Markdown 样式 */
@import 'github-markdown-css/github-markdown-dark.css';

.markdown-body {
  padding: 20px;
}
</style>