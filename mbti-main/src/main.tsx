import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root');
if (!root) {
  throw new Error('找不到root元素');
}

const renderApp = () => {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

try {
  renderApp();
} catch (error) {
  console.error('应用渲染失败:', error);
  // 显示错误信息给用户
  root.innerHTML = '<div>应用加载失败，请刷新页面重试</div>';
}
