---
title: "sort使用"
date: 2025-08-29 13:58
tags: ["js", "前端"]
---

---

🎯 一、基本语法

```javascript
array.sort([compareFunction])
```

· 返回值：排序后的原数组（会修改原数组）
· 默认行为：将元素转换为字符串，按 Unicode 码点排序

---

📝 二、使用示例

1. 默认排序（不推荐）

```javascript
const numbers = [10, 2, 1, 5];
numbers.sort();
console.log(numbers); // [1, 10, 2, 5] （按字符串排序）
```

2. 数字升序排序

```javascript
const numbers = [10, 2, 1, 5];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 5, 10]
```

3. 数字降序排序

```javascript
const numbers = [10, 2, 1, 5];
numbers.sort((a, b) => b - a);
console.log(numbers); // [10, 5, 2, 1]
```

4. 字符串排序

```javascript
const fruits = ['banana', 'Apple', 'cherry'];
fruits.sort();
console.log(fruits); // ['Apple', 'banana', 'cherry'] （区分大小写）

// 不区分大小写排序
fruits.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
console.log(fruits); // ['Apple', 'banana', 'cherry']
```

5. 对象数组排序

```javascript
const users = [
  { name: 'John', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 }
];

// 按年龄升序
users.sort((a, b) => a.age - b.age);
console.log(users); // [{name: 'Bob', age: 20}, {name: 'John', age: 25}, {name: 'Alice', age: 30}]

// 按姓名排序
users.sort((a, b) => a.name.localeCompare(b.name));
console.log(users); // [{name: 'Alice', age: 30}, {name: 'Bob', age: 20}, {name: 'John', age: 25}]
```

6. 多条件排序

```javascript
const students = [
  { name: 'John', grade: 'B', age: 18 },
  { name: 'Alice', grade: 'A', age: 20 },
  { name: 'Bob', grade: 'A', age: 19 }
];

// 先按年级排序，再按年龄排序
students.sort((a, b) => {
  // 第一优先级：年级
  if (a.grade !== b.grade) {
    return a.grade.localeCompare(b.grade);
  }
  // 第二优先级：年龄
  return a.age - b.age;
});

console.log(students);
// [
//   {name: 'Alice', grade: 'A', age: 20},
//   {name: 'Bob', grade: 'A', age: 19},
//   {name: 'John', grade: 'B', age: 18}
// ]
```

---

🔧 三、比较函数规则

比较函数返回值的含义：

· 负数：a 排在 b 前面
· 正数：b 排在 a 前面
· 零：顺序不变

```javascript
// 等效写法
function compare(a, b) {
  if (a < b) return -1; // a 在前
  if (a > b) return 1;  // b 在前
  return 0;             // 顺序不变
}
```

---

⚡ 四、实用技巧

1. 随机排序

```javascript
const array = [1, 2, 3, 4, 5];
array.sort(() => Math.random() - 0.5);
console.log(array); // 随机顺序，如 [3, 1, 5, 2, 4]
```

2. 按字符串长度排序

```javascript
const words = ['apple', 'hi', 'banana', 'a'];
words.sort((a, b) => a.length - b.length);
console.log(words); // ['a', 'hi', 'apple', 'banana']
```

3. 按日期排序

```javascript
const dates = [
  new Date('2023-01-15'),
  new Date('2022-12-20'), 
  new Date('2023-03-10')
];

dates.sort((a, b) => a - b); // 日期对象可以直接相减
console.log(dates); // 从早到晚排序
```

4. 保持原数组不变

```javascript
const original = [3, 1, 4, 2];
const sorted = [...original].sort((a, b) => a - b); // 创建副本再排序

console.log(original); // [3, 1, 4, 2] （未改变）
console.log(sorted);   // [1, 2, 3, 4]
```

---

💡 五、常见问题

问题1：为什么默认排序结果不对？

```javascript
// 错误示例
[10, 2, 1, 5].sort(); // [1, 10, 2, 5] （字符串排序）

// 正确做法
[10, 2, 1, 5].sort((a, b) => a - b); // [1, 2, 5, 10]
```

问题2：如何排序特殊值？

```javascript
const mixed = [1, null, 3, undefined, 2];
mixed.sort((a, b) => {
  // 将 null/undefined 排在最后
  if (a == null) return 1;
  if (b == null) return -1;
  return a - b;
});
console.log(mixed); // [1, 2, 3, null, undefined]
```

---

🎓 六、记忆口诀

"a减b，升序排；b减a，降序来"
"对象排序要指定，多条件时优先级"

---

📊 七、性能考虑

· sort() 的时间复杂度通常是 O(n log n)
· 对于大型数组，避免在比较函数中进行复杂操作
· 如果需要稳定排序（相同元素保持原顺序），确保比较函数返回 0

```javascript
// 稳定排序示例
const data = [
  { value: 1, index: 0 },
  { value: 2, index: 1 },
  { value: 1, index: 2 }
];

data.sort((a, b) => {
  // 主要排序条件
  if (a.value !== b.value) return a.value - b.value;
  // 次要排序条件（保持原顺序）
  return a.index - b.index;
});
```

掌握 sort() 方法能让你的数据排序变得非常简单！