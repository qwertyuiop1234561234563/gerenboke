// src/utils/articleLoader.ts
import { parseMarkdown } from './markdown';
import type { ParsedMarkdown } from './markdown';

export interface Article {
    id: string;          // 文件名（不含扩展名）
    meta: ParsedMarkdown['meta'];
    content: string;     // 原始Markdown内容（未解析为HTML）
    html: string;        // 解析后的HTML内容
}

/**
 * 动态加载所有MD文章
 */
export const loadAllArticles = async (): Promise<Article[]> => {
    try {
        // 1. 动态导入所有MD文件
        const modules = import.meta.glob('/public/articles/*.md', {
            as: 'raw',
            eager: true
        });

        // 2. 并行解析所有文章
        const articles = await Promise.all(
            Object.entries(modules).map(async ([path, content]) => {
                const id = path.split('/').pop()?.replace('.md', '') || '';
                const parsed = await parseMarkdown(content);

                return {
                    id,
                    meta: parsed.meta,
                    content: parsed.content, // 原始内容（用于搜索）
                    html: parsed.content    // 已解析为HTML（用于展示）
                };
            })
        );

        // 3. 按日期降序排序
        return articles.sort((a, b) =>
            new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
        );
    } catch (err) {
        console.error('加载文章失败:', err);
        return [];
    }
};

/**
 * 根据ID加载单篇文章
 */
export const loadArticleById = async (id: string): Promise<Article | null> => {
    try {
        const content = await import(
            /* @vite-ignore */
            `/public/articles/${id}.md?raw`
        ).then(m => m.default);

        const parsed = await parseMarkdown(content);
        return {
            id,
            meta: parsed.meta,
            content: parsed.content,
            html: parsed.content
        };
    } catch (err) {
        console.error(`加载文章 ${id} 失败:`, err);
        return null;
    }
};