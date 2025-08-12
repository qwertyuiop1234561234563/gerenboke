---
title: "js常用的方法"
date: 2025-08-11 19:49
tags: ["前端","js"]
---

---

### **一、数组方法**
#### 1. `map()` - 映射新数组
```javascript
const nums = [1, 2, 3];
const doubled = nums.map(num => num * 2); 
// [2, 4, 6]
```

#### 2. `filter()` - 筛选元素
```javascript
const evens = nums.filter(num => num % 2 === 0); 
// [2]
```

#### 3. `reduce()` - 累计计算
```javascript
const sum = nums.reduce((total, num) => total + num, 0); 
// 6
```

#### 4. `find()` / `findIndex()` - 查找元素
```javascript
const firstEven = nums.find(num => num % 2 === 0); 
// 2
const evenIndex = nums.findIndex(num => num % 2 === 0); 
// 1
```

#### 5. `some()` / `every()` - 条件检测
```javascript
const hasEven = nums.some(num => num % 2 === 0); // true
const allEven = nums.every(num => num % 2 === 0); // false
```

#### 6. `flat()` - 扁平化数组
```javascript
const arr = [1, [2, [3]]];
arr.flat(2); // [1, 2, 3]
```

---

### **二、字符串方法**
#### 1. `split()` / `join()` - 分割与合并
```javascript
'foo-bar'.split('-'); // ['foo', 'bar']
['a', 'b'].join('+'); // 'a+b'
```

#### 2. `includes()` - 包含检测
```javascript
'hello'.includes('ell'); // true
```

#### 3. `replace()` - 替换内容
```javascript
'abc123'.replace(/\d+/, 'XYZ'); // 'abcXYZ'
```

#### 4. `trim()` - 去除首尾空格
```javascript
'  text  '.trim(); // 'text'
```

#### 5. `padStart()` / `padEnd()` - 填充字符串
```javascript
'5'.padStart(2, '0'); // '05'
```

---

### **三、对象方法**
#### 1. `Object.keys()` / `values()` / `entries()`
```javascript
const obj = { a: 1, b: 2 };
Object.keys(obj); // ['a', 'b']
Object.values(obj); // [1, 2]
Object.entries(obj); // [['a', 1], ['b', 2]]
```

#### 2. `Object.assign()` - 合并对象
```javascript
Object.assign({}, {a:1}, {b:2}); // {a:1, b:2}
```

#### 3. `Object.freeze()` - 冻结对象
```javascript
const frozen = Object.freeze({ prop: 42 });
frozen.prop = 33; // 静默失败（严格模式报错）
```

---

### **四、函数方法**
#### 1. `bind()` - 绑定this
```javascript
function greet() { console.log(this.name); }
const bound = greet.bind({ name: 'Alice' });
bound(); // 'Alice'
```

#### 2. `call()` / `apply()` - 指定上下文
```javascript
greet.call({ name: 'Bob' }); // 'Bob'
Math.max.apply(null, [1, 2, 3]); // 3
```

---

### **五、异步处理**
#### 1. `Promise` 链式调用
```javascript
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

#### 2. `async/await`
```javascript
async function getData() {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
```

#### 3. `setTimeout` / `setInterval`
```javascript
setTimeout(() => console.log('延时执行'), 1000);
const timer = setInterval(() => console.log('每隔1秒'), 1000);
clearInterval(timer); // 取消
```

---

### **六、数据类型转换**
#### 1. 数字转换
```javascript
parseInt('10px'); // 10
Number('123'); // 123
+'42'; // 42 (快速转换)
```

#### 2. 字符串转换
```javascript
String(123); // '123'
123.toString(); // '123'
```

#### 3. 布尔转换
```javascript
Boolean(''); // false
!!'text'; // true
```

---

### **七、现代API（ES6+）**
#### 1. 可选链 `?.`
```javascript
const name = user?.profile?.name; // 避免报错
```

#### 2. 空值合并 `??`
```javascript
const value = input ?? 'default'; // 仅对null/undefined生效
```

#### 3. `Array.from()` 
```javascript
Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]
```

---

### **八、实用工具方法**
#### 1. `JSON.parse()` / `JSON.stringify()`
```javascript
const obj = JSON.parse('{"a":1}');
JSON.stringify(obj, null, 2); // 美化输出
```

#### 2. `Date` 处理
```javascript
new Date().toISOString(); // "2023-07-20T12:00:00.000Z"
Date.now(); // 时间戳
```

#### 3. `Math` 方法
```javascript
Math.random(); // 0~1随机数
Math.floor(3.7); // 3
Math.max(...[1, 2, 3]); // 3
```

---

### **使用建议**
1. **数组操作**：优先使用 `map/filter/reduce` 替代 `for` 循环
2. **异步处理**：现代项目首选 `async/await`
3. **安全访问**：多用 `?.` 和 `??` 减少报错
4. **性能敏感场景**：慎用 `reduce`（可能比循环慢）

掌握这些方法可以覆盖90%的日常开发需求。建议通过实际项目练习巩固，例如用 `reduce` 实现购物车金额统计，或用 `Promise.all` 处理并发请求。