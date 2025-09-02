---
title: "MySQL左右外连接"
date: 2025-08-26 16:48
tags: ["数据库"]
---

---

📊 核心区别对比

特性 左外连接（LEFT JOIN） 右外连接（RIGHT JOIN）
基准表 左表（FROM 后的表） 右表（JOIN 后的表）
返回结果 左表所有记录 + 右表匹配记录 右表所有记录 + 左表匹配记录
未匹配到的右表字段 用 NULL 填充 用 NULL 填充
使用频率 ⭐⭐⭐⭐⭐（更常用） ⭐⭐（较少用）
可替代性 不可用右连接直接替代 可用左连接重写替代

---

🎯 可视化理解

左外连接（LEFT JOIN）

```
左表所有记录 ———→ 匹配的右表记录
    │
    └—→ 无匹配？右表字段显示为 NULL
```

右外连接（RIGHT JOIN）

```
匹配的左表记录 ←——— 右表所有记录
                     │
                     └—→ 无匹配？左表字段显示为 NULL
```

---

📝 示例数据

假设有两个表：

employees 员工表

id name department_id
1 张三 101
2 李四 102
3 王五 NULL

departments 部门表

id name
101 技术部
103 销售部

---

🧪 实际查询示例

1. 左外连接（LEFT JOIN）

```sql
SELECT 
    e.name AS 员工姓名,
    d.name AS 部门名称
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

结果：保留所有员工，即使没有部门

员工姓名 部门名称
张三 技术部
李四 NULL
王五 NULL

2. 右外连接（RIGHT JOIN）

```sql
SELECT 
    e.name AS 员工姓名,
    d.name AS 部门名称
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
```

结果：保留所有部门，即使没有员工

员工姓名 部门名称
张三 技术部
NULL 销售部

---

🔄 等价转换

任何右外连接都可以转换为左外连接（只需调换表顺序）：

```sql
-- 右连接
SELECT * FROM table_a RIGHT JOIN table_b ON a.id = b.id;

-- 等价左连接
SELECT * FROM table_b LEFT JOIN table_a ON a.id = b.id;
```

---

💡 使用场景建议

使用 LEFT JOIN 当：

· 需要查询"所有用户及其订单"（即使用户没有订单）
· 统计"所有产品及其销售情况"（即使产品未销售）
· 查找"所有学生及其考试成绩"（即使学生缺考）

使用 RIGHT JOIN 当：

· 需要查询"所有部门及其员工"（及时部门没有员工）
· 特殊情况下的数据完整性检查

---

⚠️ 注意事项

1. 性能：在大型表中，LEFT JOIN 和 RIGHT JOIN 性能基本相同
2. 可读性：LEFT JOIN 更符合从左到右的阅读习惯
3. 习惯：90% 的场景使用 LEFT JOIN 即可满足需求
4. NULL 值：连接后未匹配的字段都会显示为 NULL

---

🎓 记忆口诀

"左连左为主，右连右为尊"
"左表全保留，右表匹配凑"
"右表全保留，左表匹配有"

建议优先使用 LEFT JOIN，因为它的可读性更好且更常用。RIGHT JOIN 通常只在特定场景或为了保持查询对称性时使用。