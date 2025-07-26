import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import XiangMu from '@/views/xiangMu.vue'

import BoKe from '@/views/boKe.vue'
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
        }
    ]
})

export default router
