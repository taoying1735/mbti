# MBTI 性格测试

一个基于 React + TypeScript 开发的 MBTI 性格测试应用。

## 功能特点

- 提供简易版（20题）、标准版（45题）和专业版（93题）三种测试
- 详细的性格分析报告
- 可视化的测试结果展示
- 历史记录管理
- 支持结果分享和导出

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Zustand (状态管理)
- React Router (路由管理)
- Lucide React (图标)

## 开发环境设置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
src/
  ├── components/     # 可复用组件
  ├── data/          # 测试题目和类型描述数据
  ├── pages/         # 页面组件
  ├── store/         # 状态管理
  ├── types/         # TypeScript 类型定义
  └── utils/         # 工具函数
```

## 部署

项目使用 Vite 构建，可以轻松部署到任何静态网站托管服务：

1. 运行 `npm run build`
2. 将 `dist` 目录部署到托管服务

## 许可证

MIT