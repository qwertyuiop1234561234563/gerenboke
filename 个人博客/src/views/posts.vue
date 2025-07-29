<template>
<article v-if="post">
    <header>
      <h1>{{ post.meta.title }}</h1>
      <img 
        v-if="post.meta.cover" 
        :src="post.meta.cover" 
        alt="封面图"
      >
    </header>
    
    <div 
      class="markdown-body" 
      v-html="post.content"
    ></div>
    <RouterLink to="/boke">返回</RouterLink>
  </article>
</template>
<script setup lang="ts" name="posts">
import { ref ,onMounted} from 'vue'
import { useRoute ,RouterLink} from 'vue-router'
import { parseMarkdown } from '@/utils/markdown'


const route = useRoute()
const post = ref<{
  meta: any
  content: string
}>()

onMounted(async () => {
  const id = route.params.id
  const path = `/src/articles/${id}.md`
  post.value = await parseMarkdown(path)
})
</script>
<style scoped>
.post {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
h1{
  text-align: center;
  font-size: 50px;
}
.markdown-body {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 20px;
}
a{
  text-decoration: none;
  color: brown;
  font-size: 30px;
}
</style>