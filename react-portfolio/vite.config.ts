import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vitePluginTailwindMangle from 'unplugin-tailwindcss-mangle/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: '',
  plugins: [react(), tailwindcss(), ...(command === 'build' ? [vitePluginTailwindMangle()] : [])],
}))
