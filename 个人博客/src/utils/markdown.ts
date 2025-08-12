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
export interface ParsedMarkdown {
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