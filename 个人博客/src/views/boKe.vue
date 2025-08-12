<template>
  <div class="blog-container">
    <!-- 标签筛选区 -->
    <div class="tag-filter">
      <span 
        v-for="tag in allTags" 
        :key="tag"
        @click="toggleTag(tag)"
        :class="{ 'active': activeTags.includes(tag) }"
        class="tag"
      >
        {{ tag }} ({{ tagCounts[tag] }})
      </span>
      <span 
        v-if="activeTags.length" 
        @click="clearTags"
        class="clear-tags"
      >
        清除筛选
      </span>
    </div>

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
            <span 
              v-for="tag in article.meta.tags" 
              :key="tag" 
              class="tag"
              @click.stop="toggleTag(tag)"
            >
              {{ tag }}
            </span>
          </span>
        </div>
        <p class="excerpt">{{ getExcerpt(article.content) }}</p>
      </RouterLink>
    </div>

    <!-- 空状态 -->
    <div v-if="!filteredArticles.length && !loading" class="empty">
      没有找到匹配的文章
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="error" class="error">加载文章失败，请刷新重试</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { loadAllArticles, type Article } from '@/utils/loader';
import { debounce } from 'lodash-es';

// 状态管理
const searchQuery = ref('');
const activeTags = ref<string[]>([]);
const articles = ref<Article[]>([]);
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

// 获取所有标签及其计数
const tagCounts = computed(() => {
  const counts: Record<string, number> = {};
  articles.value.forEach(article => {
    article.meta.tags?.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return counts;
});

// 获取所有不重复的标签（按数量排序）
const allTags = computed(() => {
  return Object.keys(tagCounts.value).sort((a, b) => tagCounts.value[b] - tagCounts.value[a]);
});

// 日期格式化
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN');
};

// 获取文章摘要
const getExcerpt = (content: string, length = 150) => {
  const plainText = content.replace(/<[^>]*>/g, ' ');
  return plainText.substring(0, length) + (plainText.length > length ? '...' : '');
};

// 标签操作
const toggleTag = (tag: string) => {
  const index = activeTags.value.indexOf(tag);
  if (index === -1) {
    activeTags.value.push(tag);
  } else {
    activeTags.value.splice(index, 1);
  }
};

const clearTags = () => {
  activeTags.value = [];
};

// 搜索防抖
const handleSearch = debounce(() => {}, 300);

// 筛选文章（结合搜索和标签）
const filteredArticles = computed(() => {
  let result = articles.value;
  
  // 标签筛选
  if (activeTags.value.length) {
    result = result.filter(article => 
      activeTags.value.every(tag => article.meta.tags?.includes(tag))
    );
  }
  
  // 搜索筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(article => 
      article.meta.title.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query)
    );
  }
  
  // 按日期排序
  return result.sort((a, b) => 
    new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
});
</script>

<style scoped>
.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.tag-filter {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.tag {
  padding: 4px 12px;
  background: #f0f0f0;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.tag:hover {
  background: #ddd;
}

.tag.active {
  background: #42b983;
  color: white;
}

.clear-tags {
  margin-left: 10px;
  color: #666;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
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
  text-decoration: none;
  color: inherit;
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
  align-items: center;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.excerpt {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.empty,
.loading,
.error {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>