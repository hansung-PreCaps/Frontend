import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.enble.site', // 무중단 서버의 기본 URL
        changeOrigin: true, // CORS 문제 해결
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api'를 제거하고 실제 API 서버로 전달
      },
    },
  },
});
