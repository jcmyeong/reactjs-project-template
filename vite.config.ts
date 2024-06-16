import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default ({ mode }:{ mode: string}) => {
  const env = loadEnv(mode, process.cwd());
  const VITE_PORT = env.VITE_PORT ?? '3000'

  return defineConfig({
    resolve: {
      // alias: {
      //   "@": path.resolve(__dirname, "./src"),
      // },
      alias: [
        {
          find: '@components', replacement: resolve(__dirname, 'src/components'),
        },
        {
          find: '@pages', replacement: resolve(__dirname, 'src/pages'),
        },
        {
          find: '@constants', replacement: resolve(__dirname, 'src/constants'),
        },
        {
          find: '@context', replacement: resolve(__dirname, 'src/context'),
        },
        {
          find: '@service', replacement: resolve(__dirname, 'src/service'),
        },
        {
          find: '@assets', replacement: resolve(__dirname, 'src/assets'),
        },
        {
          find: '@hooks', replacement: resolve(__dirname, 'src/hooks'),
        },
        {
          find: '@styles', replacement: resolve(__dirname, 'src/styles'),
        },
        {
          find: '@utils', replacement: resolve(__dirname, 'src/utils'),
        },
      ],
    },
    plugins: [react()],
    server: {
      port: parseInt(VITE_PORT),
    },
  })
}