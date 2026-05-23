// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   base: '/juno/', // 👈 must match the repo name
//   plugins: [react(), tailwindcss()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// User page at https://jnhuang02.github.io → base is '/'
// For custom 404 on GitHub Pages with BrowserRouter:
// 1) npm run build
// 2) cp dist/index.html dist/404.html
// 3) npm run deploy
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
