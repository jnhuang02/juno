// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   base: '/juno/', // 👈 must match the repo name
//   plugins: [react(), tailwindcss()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use a relative base so assets load correctly on GitHub Pages (repo pages)
export default defineConfig({
  base: './',
  plugins: [react()],
});
