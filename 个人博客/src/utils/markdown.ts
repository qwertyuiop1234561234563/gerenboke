// src/utils/markdown.ts
import { marked } from 'marked'
import { getHighlighter, BUNDLED_LANGUAGES } from 'shiki'

// 初始化高亮器（兼容旧版API）
let highlighter: any

async function initHighlighter() {
    highlighter = await getHighlighter({
        theme: 'github-dark',
        langs: ['javascript', 'typescript', 'html', 'css', 'json']
    })
}

// 立即执行初始化
initHighlighter()

// Markdown 配置
marked.setOptions({
    highlight: (code: string, lang: string) => {
        if (!highlighter) return code
        const validLang = BUNDLED_LANGUAGES.some(l => l.id === lang) ? lang : 'text'
        return highlighter.codeToHtml(code, { lang: validLang })
    }
})

export const parseMarkdown = (md: string): string => {
    return marked.parse(md)
}