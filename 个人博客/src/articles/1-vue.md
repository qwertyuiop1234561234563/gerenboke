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
import { marked } from 'marked'
import frontMatter from 'front-matter'

// 定义Front Matter的类型
interface FrontMatterAttributes {
    title: string
    date: string
    tags?: string[]
    [key: string]: any // 允许其他自定义字段
}

// 定义返回类型
interface ParsedMarkdown {
    meta: {
        title: string
        date: string
        tags: string[]
    }
    content: string
}

export const parseMarkdown = async (filePath: string): Promise<ParsedMarkdown> => {
    try {
        // 1. 动态加载Markdown文件内容
        const module = await import(/* @viteIgnore */ filePath)
        const response = await fetch(module.default)
        const text = await response.text()

        // 2. 使用类型安全的解析
        const parsed = frontMatter<FrontMatterAttributes>(text)

        // 3. 转换Markdown为HTML
        const html = marked.parse(parsed.body)

        return {
            meta: {
                title: parsed.attributes.title || '无标题',
                date: parsed.attributes.date || '1970-01-01',
                tags: parsed.attributes.tags || []
            },
            content: html
        }
    } catch (error) {
        console.error(`解析失败: ${filePath}`, error)
        return {
            meta: {
                title: '解析失败',
                date: '0000-00-00',
                tags: []
            },
            content: '<p>文章加载失败</p >'
        }
    }
}
```
2.问题2
```javascript
onMounted(async () => {
  const id = route.params.id
  const path = `/src/articles/${id}.md`
  post.value = await parseMarkdown(path)
})
```