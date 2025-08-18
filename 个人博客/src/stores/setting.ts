import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useLayoutStore = defineStore('layoutStroe', () => {
    const fold = ref(false)
    const refsh = ref(false)
    const changeIcon = () => {
        fold.value = !fold.value
    }
    return { fold, changeIcon, refsh }
})