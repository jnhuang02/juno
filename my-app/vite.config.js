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

// base set to '/' for root deployment; change to '/REPO_NAME/' or './' if needed for gh-pages
export default defineConfig({
  base: '/',  // Use repository name for GitHub Pages subdirectory
  plugins: [react(), tailwindcss()],
})
