<template>
<div class="post">
    <h1>{{ post.title }}</h1>
    <div class="content markdown-body" v-html="htmlContent"></div>
    <RouterLink to="/boKe">← 返回列表</RouterLink>
  </div>
</template>
<script setup lang="ts" name="posts">
import { computed,ref ,onMounted} from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/posts'
import { parseMarkdown } from '@/utils/markdown'

const route = useRoute()
const postStore = usePostStore()

const post = computed(() => {
  return postStore.posts.find(p => p.id === Number(route.params.id)) || {
    title: '文章不存在',
    content: '请检查URL是否正确'
  }
})
const htmlContent=ref('')

onMounted(async () => {
    htmlContent.value = await parseMarkdown(post.value.content)
    })
</script>
<style scoped>
.post {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.markdown-body {
  margin-top: 20px;
}
</style>