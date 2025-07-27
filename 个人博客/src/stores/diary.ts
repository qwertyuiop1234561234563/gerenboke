import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
export const usePostStore = defineStore('dliarys', () => {
    const posts = ref([
        {
            id: 1,
            title: 'Vue3入门指南',
            content: '## 这是Markdown内容...',
            tags: ['vue', '前端']
        }
    ])
    return { posts }
})