---
title: "制作个人博客系统"
date: 2025-07-28 09:45
tags: ["vue", "前端"]
cover: "/images/vue-cover.jpg"
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

interface ParsedMarkdown {
    meta: {
        title: string;
        date: string;
        tags: string[];
    };
    content: string;
}

export const parseMarkdown = async (url: string): Promise<ParsedMarkdown> => {
    try {
        // ✅ 关键修改1：添加请求日志
        console.log('正在请求Markdown:', url);

        const response = await fetch(url);
        if (!response.ok) {
            console.error('请求失败:', response.status);
            throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();
        // ✅ 关键修改2：添加原始内容日志
        console.log('获取到原始内容:', text.slice(0, 100) + '...');

        const parsed = frontMatter<FrontMatterAttributes>(text);
        // ✅ 关键修改3：添加解析结果日志
        console.log('解析后的meta:', parsed.attributes);

        return {
            meta: {
                title: parsed.attributes.title || '无标题',
                date: parsed.attributes.date || new Date().toISOString(),
                tags: parsed.attributes.tags || [],
            },
            content: marked.parse(parsed.body),
        };
    } catch (error) {
        console.error(`解析Markdown失败: ${url}`, error);
        return {
            meta: {
                title: '解析失败',
                date: new Date().toISOString(),
                tags: ['错误'],
            },
            content: '<p>文章加载失败</p>',
        };
    }
};
```
2.问题2
```javascript
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

```
3.
```javascript
onMounted(async () => {
  const id = route.params.id
  const path = `/public/articles/${id}.md`
  post.value = await parseMarkdown(path)
})
```