import '@/assets/iconfont/iconfont.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import 'github-markdown-css/github-markdown.css';
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
