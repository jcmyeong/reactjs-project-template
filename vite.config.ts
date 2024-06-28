import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path, { resolve } from 'path';

// https://vitejs.dev/config/
export default ({ mode }:{ mode: string}) => {
  const env = loadEnv(mode, process.cwd());
  const VITE_PORT = env.VITE_PORT ?? '3000'

  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],
    server: {
      port: parseInt(VITE_PORT),
    },
  })
}