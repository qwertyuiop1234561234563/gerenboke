---
title: "java注解"
date: 2025-08-29 13:58
tags: ["java", "后端"]
---

---

一、核心启动与配置注解 (Foundation)

这些是每个 Spring Boot 应用都离不开的注解。

注解 作用 说明
@SpringBootApplication 主启动类注解 这是一个组合注解，包含了以下三个注解的功能，标记在主类上。
@EnableAutoConfiguration 启用自动配置 Spring Boot 的“魔法”核心，根据依赖自动配置应用。
@ComponentScan 组件扫描 自动扫描当前包及其子包下的 @Component, @Service, @Controller 等。
@Configuration 定义配置类 标记一个类为配置类，相当于传统的 XML 配置文件。

示例：

```java
// 应用程序的主入口，一切从这里开始
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

---

二、定义 Bean 的注解 (Stereotype Annotations)

这些注解用于声明一个类是由 Spring IoC 容器管理的 Bean。

注解 作用 说明
@Component 通用组件注解 一个通用的 stereotype，表示一个由 Spring 管理的组件。其他注解都是它的特化。
@Service 服务层注解 标记在业务逻辑层（Service 层）的类上。功能同 @Component，但用于语义区分。
@Repository 数据持久层注解 标记在数据访问层（DAO 层）的类上。它还会将平台特定的异常转换为 Spring 的统一异常。
@Controller Web 控制层注解 标记在 Web 控制层（MVC）的类上，用于处理 HTTP 请求。
@RestController RESTful 控制器 @Controller + @ResponseBody 的组合注解。返回的数据直接写入 HTTP 响应体，用于构建 RESTful API。
@Configuration 配置类 Bean 见上文。其内部使用 @Bean 注解的方法也会被注册为 Bean。

示例：

```java
@Service // 告诉Spring：这是一个Service，创建它的实例并管理起来
public class UserService {
    // ... business logic
}

@RestController // 告诉Spring：这是一个用来处理HTTP API请求的控制器
public class UserController {
    @Autowired
    private UserService userService; // Spring会自动注入UserService的实例

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAllUsers();
    }
}
```

---

三、依赖注入注解 (Dependency Injection)

用于将创建好的 Bean 注入到需要它的地方。

注解 作用 说明
@Autowired 自动注入 由 Spring 自动根据类型（byType）匹配并注入所需的依赖。最常用。
@Qualifier 按名称注入 当有多个相同类型的 Bean 时，用它指定要注入的 Bean 的名称（byName）。
@Resource 按名称注入 类似于 @Autowired + @Qualifier，但它是 JSR-250 标准注解，默认按名称（byName）注入。

示例：

```java
@Service
public class OrderService {
    // Spring会自动找到一个PaymentProcessor类型的Bean注入进来
    @Autowired
    private PaymentProcessor processor;

    // 如果有多个PaymentProcessor实现，用@Qualifier指定要注入的Bean名
    @Autowired
    @Qualifier("wechatPayment")
    private PaymentProcessor anotherProcessor;

    // 使用@Resource达到类似@Qualifier的效果
    @Resource(name = "alipayPayment")
    private PaymentProcessor thirdProcessor;
}
```

---

四、Web 相关注解 (Web MVC)

用于处理 Web 请求和响应。

注解 作用 说明
@RequestMapping 映射请求 通用的请求映射，可指定 URL、方法（GET/POST等）。
@GetMapping 映射 GET 请求 @RequestMapping(method = RequestMethod.GET) 的简写。
@PostMapping 映射 POST 请求 同上，用于 POST。
@PutMapping, @DeleteMapping, @PatchMapping 映射其他方法请求 同上，用于 PUT, DELETE, PATCH。
@RequestParam 获取 URL 参数 获取请求 URL 中的参数（如 /user?id=1 中的 id）。
@PathVariable 获取路径变量 获取 RESTful 风格 URL 中的变量（如 /user/{id} 中的 {id}）。
@RequestBody 获取请求体 将 HTTP 请求的 JSON/XML  body 解析并绑定到 Java 对象上。
@ResponseBody 响应体返回 将方法返回值直接写入 HTTP 响应体，而不是视图页面。
@RestController  已包含 @ResponseBody，所以上面示例的 getUsers() 直接返回对象而不是视图名。

示例：

```java
@RestController
@RequestMapping("/api/users")
public class UserApiController {

    // GET /api/users/123?detail=true
    @GetMapping("/{userId}")
    public User getUser(@PathVariable Long userId, 
                       @RequestParam(required = false) Boolean detail) {
        // userId = 123
        // detail = true
        // ... 处理逻辑
        return user;
    }

    // POST /api/users, 请求体是一个JSON字符串
    @PostMapping
    public User createUser(@RequestBody User newUser) {
        // newUser对象已经从请求体的JSON数据自动转换而来
        // ... 保存逻辑
        return savedUser;
    }
}
```

---

五、配置与属性注解 (Configuration & Properties)

注解 作用 说明
@Value 注入属性值 注入配置文件（如 application.properties）中的值或简单表达式。
@ConfigurationProperties 批量绑定属性 将配置文件中的一组属性（前缀相同）批量绑定到一个 Java Bean 的字段上。更推荐。
@PropertySource 指定属性文件 加载指定的配置文件（如 @PropertySource("classpath:myapp.properties")）。

示例： application.properties:

```properties
app.name=My Cool App
app.version=1.0.0
app.security.jwt-secret=mysecretkey
```

使用 @Value:

```java
@Service
public class AppService {
    @Value("${app.name}") // 注入单个属性
    private String appName;
}
```

使用 @ConfigurationProperties:

```java
// 首先在配置类或主类上启用
@SpringBootApplication
@ConfigurationPropertiesScan // 或者在Bean上使用@EnableConfigurationProperties
public class MyApplication { ... }

// 然后定义一个Bean来接收属性
@Component
@ConfigurationProperties(prefix = "app") // 前缀是app
public class AppConfig {
    private String name;
    private String version;
    private Security security = new Security();

    // 必须提供getter和setter
    // ... getters and setters

    public static class Security {
        private String jwtSecret;
        // ... getters and setters
    }
}

// 最后在需要的地方注入AppConfig即可
@Service
public class MyService {
    @Autowired
    private AppConfig appConfig; // 可以直接使用appConfig.getName()
}
```

---

学习建议

1. 不要死记硬背：理解每个注解的使用场景比记住它的名字更重要。
2. 从模仿开始：找一些简单的教程或项目代码，跟着写，看注解是怎么用的。
3. 动手实践：自己创建一个 Spring Boot 项目，从最简单的 @RestController 返回 "Hello World" 开始，逐步添加功能，每学一个注解就试着用一下。
4. 善用 IDE 提示：现代 IDE（如 IntelliJ IDEA）对 Spring 注解的支持非常好，会有自动提示和文档查看，不懂就按 F2 / Ctrl+Q 查看文档。
5. 分类记忆：就像我上面做的那样，把功能相似的注解放在一起记忆，会轻松很多。

希望这个列表能成为你学习路上的好帮手！祝你学习顺利！