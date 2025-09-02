---
title: "transform扩展"
date: 2025-08-25 13:58
tags: ["html", "前端"]
---

---

🎯 一、核心语法

```css
transform: none | transform-functions;
```

· none：默认值，不进行任何变换。
· transform-functions：一个或多个变换函数（见下文）。

---

🔧 二、常用变换函数（最核心部分）

1. 位移（Moving）

函数 作用 示例
translateX(x) 水平移动 transform: translateX(50px);
translateY(y) 垂直移动 transform: translateY(-20%);
translate(x, y) 同时移动 transform: translate(100px, 50px);
translateZ(z) 3D Z轴移动 transform: translateZ(100px);
translate3d(x, y, z) 3D移动 transform: translate3d(10px, 20px, 30px);

2. 旋转（Rotating）

函数 作用 示例
rotate(angle) 2D旋转 transform: rotate(45deg);
rotateX(angle) 绕X轴3D旋转 transform: rotateX(60deg);
rotateY(angle) 绕Y轴3D旋转 transform: rotateY(45deg);
rotateZ(angle) 绕Z轴3D旋转 transform: rotateZ(90deg);
rotate3d(x, y, z, angle) 自定义轴旋转 transform: rotate3d(1, 1, 1, 45deg);

3. 缩放（Scaling）

函数 作用 示例
scaleX(x) 水平缩放 transform: scaleX(1.5);
scaleY(y) 垂直缩放 transform: scaleY(0.5);
scale(x, y) 同时缩放 transform: scale(1.2, 0.8);
scale3d(x, y, z) 3D缩放 transform: scale3d(1, 1, 2);

4. 倾斜（Skewing）

函数 作用 示例
skewX(ax) 水平倾斜 transform: skewX(15deg);
skewY(ay) 垂直倾斜 transform: skewY(-10deg);
skew(ax, ay) 同时倾斜 transform: skew(15deg, -10deg);

5. 矩阵（Matrix）

函数 作用 示例
matrix(a, b, c, d, tx, ty) 2D矩阵变换 transform: matrix(1, 0, 0, 1, 100, 50);
matrix3d(...) 3D矩阵变换 复杂，一般用工具生成

---

🎪 三、组合变换

可以同时使用多个变换函数，顺序很重要（从右向左执行）：

```css
.transform-example {
  transform: rotate(45deg) translateX(100px) scale(1.2);
  /* 先旋转45度，再向右移动100px，最后放大1.2倍 */
}
```

---

⚡ 四、搭配 transition 实现动画

```css
.box {
  transition: transform 0.5s ease-in-out;
}

.box:hover {
  transform: scale(1.1) rotate(5deg);
}
```

---

🌟 五、3D变换关键属性

要启用3D变换，需要在父元素上设置：

```css
.parent {
  perspective: 1000px;          /* 透视深度，值越小透视效果越强 */
  transform-style: preserve-3d; /* 子元素保持3D位置 */
}

.child {
  transform: rotateY(45deg);
}
```

---

💡 六、实用示例

1. 元素居中（古老但有效的方法）

```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

2. 悬停放大效果

```css
.card {
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}
```

3. 3D翻转卡片

```css
.card {
  perspective: 1000px;
}

.card-inner {
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}
```

---

🚫 七、注意事项

1. 性能：transform 和 opacity 是性能最好的CSS属性（通常不会触发重排）
2. 堆叠上下文：transform 会创建新的堆叠上下文和包含块
3. 百分比参照：translateX(50%) 是元素自身宽度的50%，而非父元素
4. 硬件加速：3D变换通常会触发GPU加速，提高动画性能

---

🎓 八、记忆口诀

"移旋缩放斜"（位移、旋转、缩放、倾斜）
"顺序很重要，3D要透视"

掌握 transform 能让你的页面交互更加生动有趣！建议多在开发者工具中实时调试体验效果。