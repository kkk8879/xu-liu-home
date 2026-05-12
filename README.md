# Xu & Liu Home

一个温暖、轻量的静态主页项目，记录日常生活片段，并提供「奋斗中心 / 晨报」入口。

- 语言：中文（`zh-CN`）
- 技术栈：原生 `HTML + CSS + JavaScript`
- 部署方式：静态托管（已提供 Oracle Cloud Nginx 部署说明）

## 在线内容概览

页面主要由四部分组成：

1. **Hero 首屏**
- 展示站点主题「日日是好日」
- 提供「家园 / 关于 / 联系」导航
- 包含「奋斗」卡片入口，点击后展开奋斗中心

2. **奋斗中心（Effort Hub）**
- 提供晨报入口按钮
- 点击后展示晨报面板（摘要、关键观察、今日建议）
- 支持从 `/morning/latest.json` 动态加载当日内容

3. **家的小片段（Family Moments）**
- 三张生活卡片：早晨 / 午后 / 夜晚

4. **联系区域**
- 邮箱联系方式 `mailto:`

## 项目结构

```text
xu-liu-home/
├─ index.html                  # 页面结构
├─ styles.css                  # 全局样式与动效
├─ script.js                   # 交互逻辑、滚动显现、晨报加载
├─ favicon.png                 # 站点图标
├─ DEPLOY_ORACLE.md            # Oracle Cloud 部署说明
├─ deploy/
│  └─ nginx-oracle-1c1g.conf   # 1C1G 优化 Nginx 配置
└─ morning/
   ├─ latest.json              # 晨报数据（运行时读取）
   └─ latest.html              # 晨报原文链接目标
```

## 本地运行

这是纯静态项目，推荐使用任意静态服务器运行（避免 `file://` 下 `fetch` 受限）。

### 方式一：Python

```bash
python -m http.server 8080
```

访问：`http://localhost:8080`

### 方式二：Node（任选）

```bash
npx serve .
```

## 晨报动态数据说明

`script.js` 会请求：

- `/morning/latest.json`

如果存在并可访问，会覆盖页面里的默认晨报内容。

### `latest.json` 示例

```json
{
  "date": "2026-05-12",
  "summary": "盘面偏震荡，建议以分批执行与风控优先为主。",
  "highlights": [
    "成交保持活跃，资金偏好电力与制造链。",
    "午后波动放大，注意短线回撤风险。"
  ],
  "actions": [
    "采购侧：分批挂单，避免一次性追价。",
    "报价侧：保持弹性区间，预留调整空间。"
  ],
  "fullUrl": "/morning/latest.html"
}
```

## 交互与体验特性

- 首屏与模块 **滚动显现动画**（IntersectionObserver）
- 「奋斗」卡片点击后 **平滑滚动并展开奋斗中心**
- 晨报支持 **自动显示当天日期**
- 背景使用渐变、噪点与浮动光晕，营造轻柔氛围

## 部署

已内置 Oracle Cloud 免费实例（1C1G）部署文档：

- [DEPLOY_ORACLE.md](./DEPLOY_ORACLE.md)

核心流程：

1. 上传项目到服务器
2. 安装 Nginx
3. 发布到 `/var/www/...`
4. 使用 `deploy/nginx-oracle-1c1g.conf` 替换配置
5. 开放 80/443 端口
6. 可选启用 HTTPS（certbot）

## 未来可选增强

- 增加中英文切换
- 增加晨报历史归档页（按日期浏览）
- 增加无障碍优化（键盘焦点样式、ARIA 增补）
- 增加 Lighthouse 性能与 SEO 基线检查

## License

当前仓库未声明 LICENSE 文件。若需要开源分发，建议补充许可证（如 MIT）。
