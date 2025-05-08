import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: import.meta.env.PROD ? '/SintenedorReact-2/' : '/'
 // base:'/SintenedorReact-2/'
})
