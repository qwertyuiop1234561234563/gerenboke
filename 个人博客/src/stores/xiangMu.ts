import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import x1 from "@/assets/img/x1.jpg"
import x2 from "@/assets/img/x2.jpg"
export const useXiangmuStore = defineStore('xiangMu', () => {
    const xiangMu = reactive([{
        id: 1,
        img: x1,
        http: "https://jishibencangyingtou.netlify.app/#/"
    },
    {
        id: 2,
        img: x2,
        http: "https://tianqichaxun.netlify.app/"
    }])
    return { xiangMu }
})