<template>
  <div class="post-detail">
    <article v-if="post">
      <header>
        <h1>{{ post.meta.title }}</h1>
        <p class="meta">
          <time :datetime="post.meta.date">{{ formatDate(post.meta.date) }}</time>
          <span class="tags" v-if="post.meta.tags?.length">
            · 标签：<span v-for="tag in post.meta.tags" :key="tag">{{ tag }}</span>
          </span>
        </p>
        <img 
          v-if="post.meta.cover" 
          :src="getImageUrl(post.meta.cover)" 
          alt="封面图"
          class="cover"
        >
      </header>
      
      <section 
        class="markdown-body" 
        v-html="post.content"
      ></section>

      <footer>
        <RouterLink to="/boke" class="back-link">← 返回列表</RouterLink>
      </footer>
    </article>

    <div v-else-if="loading" class="loading">加载中...</div>
    <div v-else class="error">文章加载失败，请检查链接</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { parseMarkdown } from '@/utils/markdown'

const route = useRoute()
const post = ref<{
  meta: {
    title: string
    date: string
    tags?: string[]
    cover?: string
  }
  content: string
}>()
const loading = ref(true)
const error = ref(false)

// 日期格式化
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 处理图片路径
const getImageUrl = (path: string) => {
  // 如果是网络图片直接返回
  if (path.startsWith('http')) return path
  
  // 本地图片从public目录获取
  return `/articles/${path}`
}

onMounted(async () => {
  try {
    const id = route.params.id
    
    // ✅ 方案C：统一使用import.meta.glob获取
    const modules = import.meta.glob('/public/articles/*.md', { 
      as: 'raw',
      eager: true
    })
    
    const path = `/public/articles/${id}.md`
    const content = modules[path]
    
    if (!content) {
      throw new Error(`找不到文章: ${id}`)
    }

    post.value = await parseMarkdown(content)
    console.log('加载完成:', post.value)
    
  } catch (err) {
    console.error('加载失败:', err)
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.meta {
  color: #666;
  margin-bottom: 1.5rem;
}

.tags span {
  margin-right: 0.5rem;
  padding: 0.2rem 0.5rem;
  background: #f0f0f0;
  border-radius: 4px;
}

.cover {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin: 1rem 0;
  border-radius: 8px;
}

.markdown-body {
  line-height: 1.6;
  font-size: larger;
}

.back-link {
  display: inline-block;
  margin-top: 2rem;
  color: #4a6fa5;
  text-decoration: none;
  transition: color 0.3s;
}

.back-link:hover {
  color: #2c5282;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>