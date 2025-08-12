---
title: "js原型链"
date: 2025-08-11 20:54
tags: ["前端","js"]
---
---

### **1. 比喻解释**
想象一家**冰淇淋工厂**：
- **`constructor`**：工厂的蓝图（比如 `IceCreamFactory` 构造函数）
- **`prototype`**：工厂的共享原料仓库（所有冰淇淋实例共用的属性和方法）
- **`__proto__`**：每个冰淇淋的"提货单"（指向原料仓库的引用）

---

### **2. 核心概念关系图**
```
[实例对象].__proto__ === [构造函数].prototype
[构造函数].prototype.constructor === [构造函数]本身
```

---

### **3. 具体代码示例**
#### ① 创建构造函数
```javascript
function IceCream(flavor) {
  this.flavor = flavor; // 实例自有属性
}

// 在原型上添加共享方法
IceCream.prototype.eat = function() {
  console.log(`Eating ${this.flavor} ice cream!`);
};
```

#### ② 实例化对象
```javascript
const myIceCream = new IceCream('vanilla');
```

---

### **4. 三者的具体关系**
#### （1）**实例对象**与**原型**
```javascript
myIceCream.__proto__ === IceCream.prototype; // true
```
- 实例的 `__proto__` 指向构造函数的 `prototype`
- 当访问 `myIceCream.eat()` 时，JS 会通过 `__proto__` 找到原型上的方法

#### （2）**原型**与**构造函数**
```javascript
IceCream.prototype.constructor === IceCream; // true
```
- 原型的 `constructor` 指回构造函数本身
- 这是构造函数和原型之间的"双向引用"

#### （3）**完整链条验证**
```javascript
myIceCream.__proto__.constructor === IceCream; // true
myIceCream instanceof IceCream; // true
```

---

### **5. 原型链图示**
```
myIceCream
  │
  ├── flavor: "vanilla" (实例自有属性)
  │
  └── __proto__: IceCream.prototype
         │
         ├── eat: function() {...} (共享方法)
         │
         └── constructor: function IceCream() {...}
                │
                └── prototype: IceCream.prototype (循环引用)
```

---

### **6. 动态修改原型的影响**
```javascript
// 修改原型对象会影响所有实例
IceCream.prototype.melt = function() {
  console.log(`${this.flavor} is melting!`);
};

myIceCream.melt(); // "vanilla is melting!"
```

---

### **7. 特殊案例：内置类型的原型**
```javascript
// 数组的原型链
const arr = [];
arr.__proto__ === Array.prototype; // true
Array.prototype.__proto__ === Object.prototype; // true

// 函数也是对象
function test() {}
test.__proto__ === Function.prototype; // true
Function.prototype.__proto__ === Object.prototype; // true
```

---

### **8. 关键总结**
| 概念 | 指向目标 | 作用 | 类比 |
|------|----------|------|------|
| `prototype` | 构造函数的原型对象 | 存放共享属性和方法 | 工厂的原料仓库 |
| `__proto__` | 实例的原型对象 | 实现原型继承的访问链 | 冰淇淋的提货单 |
| `constructor` | 构造函数本身 | 标识对象由谁创建 | 工厂的建造图纸 |

---

### **9. 面试常见问题**
**Q：为什么 `__proto__` 不是标准属性？**  
A：虽然被主流浏览器实现，更推荐使用 `Object.getPrototypeOf(obj)` 获取原型

**Q：如何实现纯净的空对象？**  
A：`const obj = Object.create(null)` （没有 `__proto__` 和原型方法）

---

通过这个冰淇淋工厂的比喻，你应该能清晰地理解这三者的关系了。记住：
- **`new` 操作的本质**：将新对象的 `__proto__` 链接到构造函数的 `prototype`
- **原型链查找**：像顺着提货单一级级找原料，直到 `Object.prototype`（终点）