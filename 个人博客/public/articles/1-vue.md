---
title: "制作个人博客系统"
date: 2025-07-28 
tags: ["vue", "前端"]
---
## 为什么要做个人博客
- 主要是想在这上面发表一些自己的文章
- 也想分享一些自己在生活中遇到的一些趣事
- 后续也会开通评论系统，大家也可以发表一些自己的见解

## 主要问题
1.主要没用过markdown所以导致自己没有思路，如何去渲染以下是求助deepseek再加上自己的修改写的将markdown转变为html的工具

```javascript
// src/utils/markdown.ts
import { marked } from 'marked';
import frontMatter from 'front-matter';

interface FrontMatterAttributes {
    title: string;
    date: string;
    tags?: string[];
    [key: string]: any;
}
declare module 'front-matter' {
    interface FrontMatterAttributes {
        title: string
        date: string
        tags?: string[]
        cover?: string
    }
}
interface ParsedMarkdown {
    meta: {
        title: string;
        date: string;
        tags: string[];
    };
    content: string;
}


export const parseMarkdown = async (rawContent: string): Promise<ParsedMarkdown> => {
    try {
        // ✅ 类型安全的解析
        const parsed = frontMatter<FrontMatterAttributes>(rawContent);

        // 调试日志
        console.log('解析结果:', {
            title: parsed.attributes.title,
            date: parsed.attributes.date,
            tags: parsed.attributes.tags
        });

        return {
            meta: {
                title: parsed.attributes.title || '默认标题',
                date: parsed.attributes.date || new Date().toISOString().split('T')[0],
                tags: Array.isArray(parsed.attributes.tags) ? parsed.attributes.tags : [],

            },
            content: marked.parse(parsed.body)
        };
    } catch (error) {
        console.error('Markdown解析失败:', error);
        return {
            meta: {
                title: '解析失败',
                date: new Date().toISOString().split('T')[0],
                tags: ['错误'],

            },
            content: '<p>文章加载失败</p>'
        };
    }
};
```
2.问题2
```javascript
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
```
3.
```javascript
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
```