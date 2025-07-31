---
title: "关于axios"
date: 2025-07-31 
tags: ["axios", "前端"]
---
---

### **1. 安装 Axios**
**作用**：将 Axios 添加到你的项目中，使其可以用于发送 HTTP 请求。  
**命令**：
```bash
npm install axios
# 或
yarn add axios
```
**说明**：安装后，你可以在项目中通过 `import axios from 'axios'` 引入 Axios。

---

### **2. 基本使用**
#### **导入 Axios**
**作用**：在代码中引入 Axios 库，以便使用其功能。  
**代码**：
```javascript
import axios from 'axios';
```

#### **发起 GET 请求**
**作用**：从服务器获取数据。  
**代码**：
```javascript
axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data); // 打印响应数据
  })
  .catch(error => {
    console.error('请求失败:', error); // 处理错误
  });
```
**说明**：
- `axios.get(url)`：发送 GET 请求到指定 URL。
- `.then()`：处理成功响应，`response.data` 是服务器返回的数据。
- `.catch()`：捕获请求失败的错误。

#### **发起 POST 请求**
**作用**：向服务器发送数据（如提交表单）。  
**代码**：
```javascript
axios.post('https://api.example.com/data', {
    name: 'John',
    age: 30
  })
  .then(response => {
    console.log(response.data); // 打印响应数据
  });
```
**说明**：
- `axios.post(url, data)`：发送 POST 请求，第二个参数是请求体数据。
- 服务器通常会返回操作结果（如成功或失败消息）。

---

### **3. 请求方法**
**作用**：支持所有 HTTP 方法，覆盖常见的 API 操作。  
**常用方法**：
| 方法       | 用途                          | 示例                                     |
|------------|-------------------------------|------------------------------------------|
| `GET`      | 获取数据                      | `axios.get('/users')`                    |
| `POST`     | 提交数据（创建资源）           | `axios.post('/users', { name: 'John' })` |
| `PUT`      | 更新数据（替换整个资源）       | `axios.put('/users/1', { name: 'Mike' })`|
| `DELETE`   | 删除数据                      | `axios.delete('/users/1')`               |
| `PATCH`    | 部分更新数据（修改部分字段）   | `axios.patch('/users/1', { age: 31 })`   |

---

### **4. 请求配置**
**作用**：自定义请求行为（如超时、请求头、参数等）。  
**代码**：
```javascript
axios.get('https://api.example.com/data', {
  params: { ID: 12345 },      // URL 查询参数（如 `/data?ID=12345`）
  headers: { 'X-Token': 'abc' }, // 自定义请求头
  timeout: 5000,               // 超时时间（毫秒）
  responseType: 'json'         // 响应数据类型（默认是 JSON）
});
```
**常用配置项**：
- `baseURL`：所有请求的基础 URL（如 `https://api.example.com`）。
- `params`：URL 参数（自动拼接到 URL）。
- `headers`：自定义请求头（如认证 Token）。
- `timeout`：超时时间（超时后请求会被取消）。
- `withCredentials`：跨域请求时是否携带 Cookie（默认 `false`）。

---

### **5. 并发请求**
**作用**：同时发送多个请求，并在所有请求完成后统一处理结果。  
**代码**：
```javascript
const request1 = axios.get('/user/123');
const request2 = axios.get('/user/123/permissions');

axios.all([request1, request2])
  .then(axios.spread((response1, response2) => {
    console.log(response1.data, response2.data); // 两个请求的结果
  }));
```
**说明**：
- `axios.all()`：接收一个请求数组，并行发送。
- `axios.spread()`：将多个响应的结果解构到单独的参数中。

---

### **6. 创建实例**
**作用**：为特定 API 创建一个预配置的 Axios 实例（避免重复配置）。  
**代码**：
```javascript
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: { 'X-Auth-Token': '123' }
});

// 使用实例
api.get('/data').then(response => {
  console.log(response.data);
});
```
**适用场景**：
- 多个请求共享相同配置（如基础 URL、认证头）。
- 隔离不同模块的请求（如用户模块、订单模块）。

---

### **7. 拦截器**
**作用**：在请求或响应被处理前，全局拦截并修改它们。  

#### **请求拦截器**
**用途**：在发送请求前添加通用逻辑（如添加认证 Token）。  
**代码**：
```javascript
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer token'; // 添加 Token
    return config; // 必须返回修改后的配置
  },
  error => {
    return Promise.reject(error); // 处理错误
  }
);
```

#### **响应拦截器**
**用途**：统一处理响应数据或错误（如提取数据或处理 401 错误）。  
**代码**：
```javascript
axios.interceptors.response.use(
  response => {
    return response.data; // 直接返回响应数据（跳过 response 对象）
  },
  error => {
    if (error.response.status === 401) {
      alert('请重新登录！');
    }
    return Promise.reject(error);
  }
);
```

---

### **8. 取消请求**
**作用**：手动取消未完成的请求（如用户离开页面时）。  
**代码**：
```javascript
const source = axios.CancelToken.source();

axios.get('/user/123', {
  cancelToken: source.token
}).catch(error => {
  if (axios.isCancel(error)) {
    console.log('请求被取消:', error.message);
  }
});

// 取消请求（参数为取消原因）
source.cancel('用户取消了操作');
```
**适用场景**：
- 页面切换时取消未完成的请求。
- 用户主动取消长时间请求。

---

### **9. 错误处理**
**作用**：捕获请求失败的不同类型错误（如网络错误、服务器错误）。  
**代码**：
```javascript
axios.get('/user/123')
  .catch(error => {
    if (error.response) {
      // 服务器返回了错误状态码（如 404、500）
      console.log('服务器错误:', error.response.status);
    } else if (error.request) {
      // 请求已发出但无响应（如网络断开）
      console.log('无响应:', error.request);
    } else {
      // 其他错误（如配置错误）
      console.log('请求配置错误:', error.message);
    }
  });
```

---

### **10. 全局配置**
**作用**：设置所有请求的默认值（避免重复配置）。  
**代码**：
```javascript
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = 'Bearer token';
axios.defaults.timeout = 5000;
```
**注意**：实例的配置会覆盖全局配置。

---

### **11. 文件上传**
**作用**：通过 `multipart/form-data` 格式上传文件。  
**代码**：
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]); // 添加文件

axios.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data' // 必须设置请求头
  }
});
```

---

### **12. 文件下载**
**作用**：下载文件并保存到本地。  
**代码**：
```javascript
axios.get('/download', {
  responseType: 'blob' // 指定响应类型为二进制数据
}).then(response => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'file.pdf'); // 设置下载文件名
  document.body.appendChild(link);
  link.click(); // 触发下载
  link.remove(); // 清理 DOM
});
```

---

### **总结**
Axios 的核心功能：
1. **简单易用**：链式调用（`.then()`/`.catch()`）处理异步请求。
2. **灵活配置**：支持全局、实例级和单次请求的配置。
3. **强大功能**：拦截器、取消请求、并发控制等。
4. **兼容性**：支持浏览器和 Node.js。

通过合理使用这些功能，你可以高效地实现：
- 用户认证（JWT Token）。
- API 数据交互（CRUD 操作）。
- 文件上传/下载。
- 错误统一处理。