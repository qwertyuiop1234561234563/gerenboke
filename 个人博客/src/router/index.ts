import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import XiangMu from '@/views/xiangMu.vue'
import posts from '@/views/posts.vue'
import BoKe from '@/views/boKe.vue'
import Diary from '@/views/Diary.vue'
import aboutMe from '@/views/aboutMe.vue'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/xiangmu',
            name: 'xiangMu',
            component: XiangMu
        },
        {
            path: '/boke',
            name: 'boKe',
            component: BoKe
        },
        {
            path: '/post/:id',
            name: 'Post',
            component: posts
        },
        {
            path: '/diary/:id',
            name: 'diary',
            component: Diary
        },
        {
            path: '/about',
            name: 'aboutMe',
            component: aboutMe
        }
    ]
})

export default router
