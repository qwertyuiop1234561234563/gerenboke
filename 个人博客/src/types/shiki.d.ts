// src/types/shiki.d.ts
declare module 'shiki' {
    export function getHighlighter(options: {
        theme: string
        langs: string[]
    }): Promise<any>

    export const BUNDLED_LANGUAGES: {
        id: string
        scopeName: string
        aliases?: string[]
    }[]
}