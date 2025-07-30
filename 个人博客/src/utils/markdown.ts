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