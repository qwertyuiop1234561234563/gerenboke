<template>
  <div class="post-container">
    <RouterLink 
      v-for="post in posts"
      :key="post.id"
      :to="`/post/${post.id}`"
      class="post-link"
      @mouseenter="hoverActive = post.id"
      @mouseleave="hoverActive = null"
      :class="{ 'active': hoverActive === post.id }"
    >
      <h2>{{ post.meta.title }}</h2>
      <p class="date">{{ formatDate(post.meta.date) }}</p>
      <p class="tags">
        <span v-for="(tag, index) in post.meta.tags" :key="index">
          {{ tag }}<span v-if="index < post.meta.tags.length - 1">, </span>
        </span>
      </p>
    </RouterLink>
  </div>
</template>
<script setup lang="ts" name="boKe">
import { parseMarkdown } from '@/utils/markdown';
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';

interface PostItem {
  id: string;
  meta: {
    title: string;
    date: string;
    tags: string[];
  };
}

const posts = ref<PostItem[]>([]);
const hoverActive = ref<string | null>(null);

// 日期格式化
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN');
};

// 获取文章列表
onMounted(async () => {
  try {
    // ✅ 使用正确的路径映射
    const modules = import.meta.glob('/public/articles/*.md', { 
      as: 'url',
      import: 'default'
    });

    const loadingPromises = Object.entries(modules).map(async ([path, getUrl]) => {
      const url = await getUrl();
      const id = path.split('/').pop()?.replace('.md', '') || '';
      
      // ✅ 添加请求日志
      console.log(`正在处理文章: ${id}`, url);
      
      const { meta } = await parseMarkdown(url);
      return { id, meta };
    });

    posts.value = await Promise.all(loadingPromises);
    posts.value.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
    
    // ✅ 打印最终结果
    console.log('加载完成的文章列表:', posts.value);
  } catch (error) {
    console.error('加载文章列表失败:', error);
  }
});
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