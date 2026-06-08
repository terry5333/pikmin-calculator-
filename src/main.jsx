```react
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // 引入全域的 CSS 樣式

// 找到 index.html 裡面那個 id 為 'root' 的 div
// 然後把我們的 App 元件渲染 (顯示) 在裡面
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

```
