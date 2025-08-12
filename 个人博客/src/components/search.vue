<template>
  <div class="global-search">
      
      <input
        v-model="query"
        placeholder="搜索文章..."
        @input="handleSearch"
        @keydown.esc="closeResults"
      />
    <div v-if="showResults" class="results-container">
      <div v-if="results.length" class="results">
        <RouterLink
          v-for="item in results"
          :key="item.id"
          :to="`/post/${item.id}`"
          class="result-item"
          @click="closeResults"
        >
          <h3 v-html="highlight(item.meta.title, query)"></h3>
        </RouterLink>
      </div>
      <div v-else-if="query" class="empty">
        没有找到匹配的文章
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch ,onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { loadAllArticles,type Article } from '@/utils/loader';
import { debounce } from 'lodash-es';

const router = useRouter();
const query = ref('');
const showResults = ref(false);
const articles = ref<Article[]>([]);

// 加载文章数据
onMounted(async () => {
  articles.value = await loadAllArticles();
});

// 搜索结果
const results = computed(() => {
  if (!query.value.trim()) return [];
  
  const q = query.value.toLowerCase();
  return articles.value
    .filter(article => {
      return (
        article.meta.title.toLowerCase().includes(q) ||
        article.content.toLowerCase().includes(q)
      );
    })
    .map(article => ({
      ...article,
      excerpt: article.content.substring(0, 150) + '...'
    }));
});

// 高亮文本
const highlight = (text: string, query: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// 防抖搜索
const handleSearch = debounce(() => {
  showResults.value = query.value.length > 0;
}, 300);

// 关闭结果面板
const closeResults = () => {
  showResults.value = false;
};

// 路由变化时关闭搜索
watch(
  () => router.currentRoute.value.path,
  () => {
    closeResults();
  }
);
</script>

<style scoped>
.global-search {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.global-search input {
  width: 100%;
  padding: 10px 40px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
}

.results-container {
  position: absolute;
  width: 170%;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 5px;
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.results {
  padding: 10px 0;
}

.result-item {
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
}

.result-item:hover {
  background: #f5f5f5;
}

.result-item h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

.result-item p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.empty {
  padding: 15px;
  text-align: center;
  color: #666;
}

mark {
  background: yellow;
  padding: 0 2px;
}
</style>