import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
    * **建立 `tailwind.config.js`**：
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
     require('tailwind-scrollbar-hide')
  ],
}
    * **建立 `postcss.config.js`**：
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

