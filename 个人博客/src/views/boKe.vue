<template>
  <div class="blog-container">
    <!-- 搜索框 -->
    <div class="search-box">
      <input
        v-model="searchQuery"
        placeholder="搜索文章标题或内容..."
        @input="handleSearch"
      />
    </div>

    <!-- 文章列表 -->
    <div class="article-list">
      <RouterLink
        v-for="article in filteredArticles"
        :key="article.id"
        :to="`/post/${article.id}`"
        class="article-card"
      >
        <h2>{{ article.meta.title }}</h2>
        <div class="meta">
          <span class="date">{{ formatDate(article.meta.date) }}</span>
          <span class="tags">
            <span v-for="tag in article.meta.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </span>
        </div>
        <p class="excerpt">{{ getExcerpt(article.content) }}</p>
      </RouterLink>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="error" class="error">加载文章失败，请刷新重试</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { loadAllArticles,type Article } from '@/utils/loader';
import { debounce } from 'lodash-es';

// 状态管理
const articles = ref<Article[]>([]);
const searchQuery = ref('');
const loading = ref(true);
const error = ref(false);

// 加载文章
onMounted(async () => {
  try {
    articles.value = await loadAllArticles();
  } catch (err) {
    console.error('加载文章失败:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});

// 搜索功能
const filteredArticles = computed(() => {
  if (!searchQuery.value.trim()) return articles.value;

  const query = searchQuery.value.toLowerCase();
  return articles.value.filter(article => {
    return (
      article.meta.title.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query)
    );
  });
});

const handleSearch = debounce(() => {
  // 防抖处理
}, 300);

// 辅助方法
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN');
};

const getExcerpt = (content: string, length = 150) => {
  const plainText = content.replace(/<[^>]*>/g, ' ');
  return plainText.substring(0, length) + (plainText.length > length ? '...' : '');
};
</script>

<style scoped>
.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-box {
  margin-bottom: 30px;
}

.search-box input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.article-list {
  display: grid;
  gap: 20px;
}

.article-card {
  display: block;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: all 0.3s;
}

.article-card:hover {
  border-color: #42b983;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.article-card h2 {
  margin: 0 0 10px;
  color: #333;
}

.meta {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 2px 8px;
  background: #f0f0f0;
  border-radius: 4px;
}

.excerpt {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>