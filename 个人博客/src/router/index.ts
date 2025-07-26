import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import XiangMu from '@/views/xiangMu.vue'
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
        }
    ]
})

export default router
