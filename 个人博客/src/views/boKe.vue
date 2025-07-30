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
import frontMatter from 'front-matter';
interface PostItem {
  id: string;
  meta: {
    title: string;
    date: string;
    tags: string[];
  };
}
declare module 'front-matter' {
  interface FrontMatterAttributes {
    title: string
    date: string
    tags?: string[]
    cover?: string
    [key: string]: any  // 允许其他自定义字段
  }
}

const posts = ref<PostItem[]>([]);
const hoverActive = ref<string | null>(null);

// 日期格式化
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN');
};

onMounted(async () => {
  try {
    const modules = import.meta.glob('/public/articles/*.md', {
      as: 'raw',
      eager: true
    });

    // ✅ 使用Promise.all处理异步解析
    const postPromises = Object.entries(modules).map(async ([path, content]) => {
      const id = path.split('/').pop()?.replace('.md', '') || '';
      try {
        const parsed = await parseMarkdown(content); // 等待解析完成
        return {
          id,
          meta: {
            title: parsed.meta.title,
            date: parsed.meta.date,
            tags: parsed.meta.tags,
          }
        };
      } catch (err) {
        console.error(`文章 ${id} 解析失败:`, err);
        return {
          id,
          meta: {
            title: `解析失败: ${id}`,
            date: '1970-01-01',
            tags: [],
            cover: ''
          }
        };
      }
    });

    const loadedPosts = await Promise.all(postPromises);
    
    posts.value = loadedPosts
      .filter(post => !post.meta.title.includes('解析失败'))
      .sort((a, b) => 
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
      );
      
  } catch (err) {
    console.error('初始化加载失败:', err);
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