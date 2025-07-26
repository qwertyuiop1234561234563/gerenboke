// src/utils/markdown.ts
import { marked } from 'marked'
import { getHighlighter, setCDN } from 'shiki'

// 1. 设置CDN路径（使用国内可访问的镜像）
setCDN('https://cdn.jsdelivr.net/npm/shiki@0.14.1/')

// 2. 定义类型安全的初始化函数
const initHighlighter = async () => {
    try {
        return await getHighlighter({
            theme: 'github-dark',  // 注意这里是theme而不是themes
            langs: ['javascript', 'typescript', 'html', 'css', 'json'],
        })
    } catch (error) {
        console.error('Shiki初始化失败:', error)
        return null
    }
}

// 3. 全局缓存高亮器实例
let highlighter: Awaited<ReturnType<typeof initHighlighter>>

// 4. 修正后的Markdown解析函数
export const parseMarkdown = async (md: string) => {
    if (!highlighter) {
        highlighter = await initHighlighter()
    }

    marked.setOptions({
        highlight: (code, lang) => {
            if (!highlighter) return code
            try {
                return highlighter.codeToHtml(code, { lang })
            } catch {
                return code
            }
        }
    })

    return marked.parse(md)
}