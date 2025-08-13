---
title: "transition标签的使用"
date: 2025-08-13 19:47
tags: ["前端","vue"]
---

### 基本用法

```html
<transition name="fade">
  <div v-if="show">会过渡的内容</div>
</transition>
```

### 过渡类名

Vue 会自动检测 CSS 过渡类名，有 6 个不同的类名：

1. `v-enter-from` / `v-leave-from` - 进入/离开的起始状态
2. `v-enter-active` / `v-leave-active` - 进入/离开的活动状态
3. `v-enter-to` / `v-leave-to` - 进入/离开的结束状态

如果设置了 `name` 属性（如 `name="fade"`），则 `v-` 前缀会替换为 `fade-`

### 示例：淡入淡出效果

```html
<template>
  <button @click="show = !show">切换</button>
  <transition name="fade">
    <p v-if="show">Hello Vue Transition</p>
  </transition>
</template>

<script>
export default {
  data() {
    return { show: true }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

### 进阶用法

#### 1. 使用 JavaScript 钩子

```html
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @enter-cancelled="enterCancelled"
  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  @leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

#### 2. 列表过渡 (`<transition-group>`)

```html
<transition-group name="list" tag="ul">
  <li v-for="item in items" :key="item.id">
    {{ item.text }}
  </li>
</transition-group>
```