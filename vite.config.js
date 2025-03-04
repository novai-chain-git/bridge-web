import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import UnoCSS from 'unocss/vite';
import legacy from '@vitejs/plugin-legacy';
import { compression } from 'vite-plugin-compression2';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import path from 'path';

// https://vitejs.dev/config/
export default (config) => {
  const envData = loadEnv(config.mode, process.cwd());
  console.log('envData：', envData);
  return defineConfig({
    base: '',
    outDir: 'dist',
    esbuild: {
      // 删除 console debugger
      // drop: ['console', 'debugger']
      supported: {
        bigint: true
      }
    },
    build: {
      assetsDir: 'static'
      // cssCodeSplit: true,
      // rollupOptions: {
      //   input: 'index.html',
      //   output: {
      //     // 打包优化
      //     chunkFileNames: 'static/js/[name]-[hash].js',
      //     entryFileNames: 'static/js/[name]-[hash].js',
      //     assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      //     manualChunks(id) {
      //       if (id.includes('node_modules')) {
      //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
      //       }
      //     }
      //   }
      // }
    },
    server: {
      host: true,
      port: 5177
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        buffer: 'buffer'
      }
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/style/element/index.scss' as *;`
        }
      }
    },
    // optimizeDeps: {
    //   esbuildOptions: {
    //     define: {
    //       global: 'globalThis' // 将 global 替换为 globalThis
    //     },
    //     plugins: [
    //       NodeGlobalsPolyfillPlugin({
    //         buffer: true // 启用 buffer Polyfill
    //       })
    //     ]
    //   }
    // },
    plugins: [
      vue(),
      UnoCSS(),
      Components({
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ],
        include: [/\.[j]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', 'pinia', 'vue-router'],
        dts: 'auto-imports.d.ts',
        dirs: ['src/api', 'src/components', 'src/store/modules'],
        vueTemplate: true
      }),
      compression(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      nodePolyfills({
        include: ['buffer'],
        globals: {
          Buffer: true
        }
      })
    ]
  });
};
