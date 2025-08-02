---
title: "Form表单组件"
date: 2025-08-02 15:51
tags: ["elementplus", "前端"]
---

### **一、`<el-form>` 根组件属性**
| 属性 | 类型 | 默认值 | 作用 |
|------|------|--------|------|
| `model` | `object` | - | **必填**，绑定表单数据对象（如 `{ name: '', age: '' }`） |
| `rules` | `object` | - | 表单验证规则（需配合 `el-form-item` 的 `prop` 使用） |
| `inline` | `boolean` | `false` | 是否启用行内表单模式（表单项水平排列） |
| `label-position` | `'left' / 'right' / 'top'` | `'right'` | 标签文本的位置 |
| `label-width` | `string` | - | 标签宽度（如 `'100px'`） |
| `size` | `'large' / 'default' / 'small'` | `'default'` | 控制表单内组件尺寸 |
| `disabled` | `boolean` | `false` | 是否禁用所有表单项 |
| `hide-required-asterisk` | `boolean` | `false` | 是否隐藏必填字段的红色星号 |
| `validate-on-rule-change` | `boolean` | `true` | 规则变化时是否立即触发验证 |
| `scroll-to-error` | `boolean` | `false` | 验证失败时自动滚动到错误项 |

---

### **二、`<el-form-item>` 表单项属性**
| 属性 | 类型 | 默认值 | 作用 |
|------|------|--------|------|
| `prop` | `string` | - | **验证关键**，对应 `model` 的字段名（如 `'name'`） |
| `label` | `string` | - | 标签文本 |
| `label-width` | `string` | - | 覆盖根表单的 `label-width` |
| `required` | `boolean` | `false` | 是否显示必填星号（不自动触发验证，需在 `rules` 中配置） |
| `rules` | `object / array` | - | 单独配置该项的验证规则 |
| `error` | `string` | - | 手动设置验证错误信息 |
| `show-message` | `boolean` | `true` | 是否显示错误信息 |
| `size` | `'large' / 'default' / 'small'` | - | 覆盖根表单的 `size` |

---

### **三、表单验证规则（`rules` 配置）**
示例：
```javascript
rules: {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}
```
| 规则属性 | 类型 | 作用 |
|----------|------|------|
| `required` | `boolean` | 是否必填 |
| `message` | `string` | 错误提示 |
| `trigger` | `'blur' / 'change'` | 触发验证的事件 |
| `min` / `max` | `number` | 字符串/数字的最小/最大长度 |
| `type` | `'email' / 'url' / 'date'` | 内置格式验证 |
| `validator` | `function` | 自定义验证函数 |
| `pattern` | `RegExp` | 正则验证 |

---

### **四、表单方法（通过 `ref` 调用）**
| 方法 | 参数 | 作用 |
|------|------|------|
| `validate` | `(callback: Function)` | 验证整个表单，返回 Promise |
| `validateField` | `(props: string / array, callback: Function)` | 验证指定字段 |
| `resetFields` | - | 重置表单数据并移除验证结果 |
| `scrollToField` | `(prop: string)` | 滚动到指定字段 |
| `clearValidate` | `(props?: string / array)` | 清除指定字段的验证提示 |

**示例**：
```vue
<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <!-- 表单项 -->
  </el-form>
  <button @click="submit">提交</button>
</template>

<script setup>
import { ref } from 'vue';

const formRef = ref();
const form = { name: '', email: '' };

const submit = async () => {
  try {
    await formRef.value.validate();
    console.log('验证通过，提交数据:', form);
  } catch (error) {
    console.log('验证失败:', error);
  }
};
</script>
```

---

### **五、特殊功能属性**
#### 1. **动态表单验证**
```javascript
// 动态添加规则
formRef.value.setRules({
  newField: [{ required: true, message: '新增字段必填' }]
});
```

#### 2. **自定义验证函数**
```javascript
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码至少6位'));
  } else {
    callback();
  }
};

rules: {
  password: [
    { validator: validatePassword, trigger: 'blur' }
  ]
}
```

#### 3. **异步验证**
```javascript
const checkUsername = async (rule, value, callback) => {
  const isExist = await api.checkUsername(value);
  if (isExist) {
    callback(new Error('用户名已存在'));
  } else {
    callback();
  }
};
```

---

### **六、布局相关属性**
| 属性 | 作用 |
|------|------|
| `el-col` + `el-row` | 配合栅格系统实现复杂布局 |
| `el-form-item` 的 `class` | 自定义样式类名 |
| `label-suffix` | 统一设置标签后缀（如冒号） |

---

### **完整示例**
```vue
<template>
  <el-form 
    ref="formRef"
    :model="form"
    :rules="rules"
    label-position="top"
    label-width="100px"
    @submit.prevent="submit"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const formRef = ref();
const form = reactive({
  username: '',
  password: ''
});

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ]
});

const submit = async () => {
  try {
    await formRef.value.validate();
    alert('提交成功!');
  } catch (e) {
    console.error('验证失败', e);
  }
};

const reset = () => {
  formRef.value.resetFields();
};
</script>
```

掌握这些属性和方法后，可以高效实现复杂的表单交互和验证逻辑！