---
title: "vue3中的监视"
date: 2025-08-16 14:28
tags: ["前端","vue"]
---
# Vue 3 中的监视(Watch)机制详解

## 一、核心监视函数

### 1. `watch` 函数

**基本用法**：
```javascript
import { ref, watch } from 'vue';

export default {
  setup() {
    const count = ref(0);
    
    watch(count, (newValue, oldValue) => {
      console.log(`count变化: ${oldValue} -> ${newValue}`);
    });
    
    return { count };
  }
}
```

**特点**：
- 可以监听单个或多个响应式数据源
- 提供新值和旧值
- 可以配置深度监视和立即执行

### 2. `watchEffect` 函数

**基本用法**：
```javascript
import { ref, watchEffect } from 'vue';

export default {
  setup() {
    const count = ref(0);
    
    watchEffect(() => {
      console.log(`当前count值: ${count.value}`);
    });
    
    return { count };
  }
}
```

**特点**：
- 自动收集依赖，无需显式指定监视源
- 立即执行一次
- 只提供回调函数，没有新/旧值

## 二、详细用法与示例

### 1. 监听多个数据源

```javascript
const firstName = ref('张');
const lastName = ref('三');

// 监听多个ref
watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  console.log(`姓名变化: ${oldFirst}${oldLast} -> ${newFirst}${newLast}`);
});

// watchEffect方式
watchEffect(() => {
  console.log(`当前全名: ${firstName.value}${lastName.value}`);
});
```

### 2. 深度监视对象

```javascript
const user = reactive({
  name: '张三',
  address: {
    city: '北京'
  }
});

// 深度监视
watch(
  () => user, 
  (newVal, oldVal) => {
    console.log('用户信息变化', newVal.address.city);
  },
  { deep: true }
);

// watchEffect会自动追踪深层属性
watchEffect(() => {
  console.log('城市:', user.address.city);
});
```

### 3. 立即执行和清理副作用

```javascript
const data = ref(null);

// 立即执行并可以清理副作用
watchEffect((onCleanup) => {
  const timer = setTimeout(() => {
    console.log('数据:', data.value);
  }, 1000);
  
  onCleanup(() => {
    clearTimeout(timer); // 组件卸载或重新运行前清理
  });
});
```

### 4. 条件性监视

```javascript
const isActive = ref(false);
const data = ref(null);

// 只有当isActive为true时才监视data
watch(
  () => isActive.value ? data.value : null,
  (newVal) => {
    if (newVal !== null) {
      console.log('活跃数据:', newVal);
    }
  }
);
```

### 5. 异步监视

```javascript
const id = ref(1);
const userData = ref(null);

watch(id, async (newId) => {
  const response = await fetch(`/api/users/${newId}`);
  userData.value = await response.json();
}, { immediate: true }); // 立即执行一次获取初始数据
```

## 三、选项式API中的监视

虽然组合式API是Vue 3的推荐写法，但选项式API仍然支持：

### 1. `watch` 选项

```javascript
export default {
  data() {
    return {
      count: 0,
      user: {
        name: '张三'
      }
    }
  },
  watch: {
    // 简单路径
    count(newVal, oldVal) {
      console.log(`count变化: ${oldVal} -> ${newVal}`);
    },
    // 深层监视
    user: {
      handler(newVal, oldVal) {
        console.log('user变化', newVal.name);
      },
      deep: true
    },
    // 立即执行
    someProp: {
      handler(newVal) {
        console.log('初始执行', newVal);
      },
      immediate: true
    }
  }
}
```

### 2. `this.$watch`

```javascript
export default {
  created() {
    this.$watch(
      () => this.count,
      (newVal, oldVal) => {
        console.log(`count变化: ${oldVal} -> ${newVal}`);
      }
    );
    
    // 可以手动取消监视
    const unwatch = this.$watch('count', () => {});
    this.unwatch = unwatch;
  },
  beforeUnmount() {
    this.unwatch(); // 取消监视
  }
}
```

## 四、性能优化技巧

### 1. 避免过度监视

```javascript
// 不好：监视整个大对象
watch(someBigObject, () => {});

// 好：只监视需要的属性
watch(() => someBigObject.importantProp, () => {});
```

### 2. 使用 `watchPostEffect` 和 `watchSyncEffect`

```javascript
import { watchPostEffect, watchSyncEffect } from 'vue';

// DOM更新后执行
watchPostEffect(() => {
  console.log('DOM已更新', document.getElementById('myEl').offsetHeight);
});

// 同步执行（很少需要）
watchSyncEffect(() => {
  // 同步执行代码
});
```

### 3. 防抖节流与监视结合

```javascript
import { debounce } from 'lodash-es';

const searchQuery = ref('');

// 防抖搜索
watch(
  searchQuery,
  debounce((newVal) => {
    search(newVal);
  }, 300)
);
```

## 五、常见问题解答

### Q1: `watch` 和 `watchEffect` 如何选择？

- 用 `watch` 当：
  - 需要新/旧值比较
  - 需要惰性执行（不立即执行）
  - 监视特定数据源

- 用 `watchEffect` 当：
  - 依赖关系复杂，不想手动指定
  - 需要立即执行
  - 代码更简洁

### Q2: 为什么有时候监视不到变化？

- 确保监视的是响应式对象（ref/reactive）
- 对于对象，可能需要 `deep: true`
- 数组变化可能需要使用 `[...array]` 创建新引用

### Q3: 如何取消监视？

```javascript
const unwatch = watch(/*...*/);
const stopEffect = watchEffect(/*...*/);

// 取消监视
unwatch();
stopEffect();
```

## 六、实际应用示例

### 1. 表单验证

```javascript
const form = reactive({
  email: '',
  password: ''
});
const errors = reactive({});

// 验证邮箱
watch(
  () => form.email,
  (email) => {
    errors.email = email.includes('@') ? '' : '请输入有效的邮箱';
  }
);

// 验证密码强度
watchEffect(() => {
  errors.password = 
    form.password.length < 8 ? '密码太短' : 
    !/[A-Z]/.test(form.password) ? '需要包含大写字母' :
    '';
});
```

### 2. 路由参数变化

```javascript
import { watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    
    watch(
      () => route.params.id,
      (newId) => {
        fetchData(newId);
      },
      { immediate: true } // 初始化时也执行
    );
  }
}
```

### 3. 本地存储自动保存

```javascript
const settings = reactive(JSON.parse(localStorage.getItem('settings')) || {
  theme: 'light',
  fontSize: 14
});

// 自动保存到本地存储
watch(
  settings,
  (newSettings) => {
    localStorage.setItem('settings', JSON.stringify(newSettings));
  },
  { deep: true }
);
```

## 总结

Vue 3 的监视系统提供了灵活的方式来响应数据变化：

| 功能/方法        | `watch`                          | `watchEffect`                   |
|------------------|----------------------------------|---------------------------------|
| **依赖收集**     | 显式指定                         | 自动收集                        |
| **立即执行**     | 可配置(`immediate: true`)        | 总是立即执行                    |
| **新旧值**       | 提供                             | 不提供                          |
| **深度监视**     | 可配置(`deep: true`)             | 总是深度追踪                    |
| **适用场景**     | 精确控制监视源                   | 依赖复杂或需要立即执行的逻辑    |

根据具体需求选择合适的监视方式，并注意性能优化和资源清理，可以构建出高效可靠的Vue 3应用。