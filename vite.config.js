import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function apiChatPlugin() {
  return {
    name: 'api-chat-dev-server',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { default: handler } = await import('./api/chat.js');
              req.body = body;
              res.status = (code) => { res.statusCode = code; return res; };
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              };
              await handler(req, res);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiChatPlugin()],
  resolve: {
    extensions: ['.jsx', '.tsx', '.js', '.ts', '.json']
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          router: ['react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: false,
  },
})
