<template>
  <div class="post-container">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">文章加载失败</div>
    <article v-else-if="article">
      <header>
        <h1>{{ article.meta.title }}</h1>
        <div class="meta">
          <time :datetime="article.meta.date">{{ formatDate(article.meta.date) }}</time>
          <span class="tags">
            <span v-for="tag in article.meta.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </span>
        </div>
      </header>

      <div class="content" v-html="article.html"></div>

      <footer>
        <RouterLink to="/boke" class="back-link">← 返回列表</RouterLink>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { loadArticleById,type Article } from '@/utils/loader';
import { marked } from 'marked';

const route = useRoute();
const article = ref<Article | null>(null);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const id = route.params.id as string;
    article.value = await loadArticleById(id);
    
    // 如果有代码高亮需求
    // document.querySelectorAll('pre code').forEach((block) => {
    //   hljs.highlightElement(block);
    // });
  } catch (err) {
    console.error('加载文章失败:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped>
.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

article {
  line-height: 1.6;
}

header {
  margin-bottom: 30px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.meta {
  display: flex;
  gap: 15px;
  color: #666;
  margin-bottom: 20px;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 2px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
}

.content {
  margin-bottom: 40px;
}

.back-link {
  display: inline-block;
  margin-top: 30px;
  color: #42b983;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>