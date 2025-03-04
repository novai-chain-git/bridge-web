// vite.config.js
import { defineConfig, loadEnv } from "file:///F:/Code/alphahomebridging/node_modules/.pnpm/vite@5.2.6_@types+node@22.9.1_lightningcss@1.27.0_sass@1.72.0_terser@5.30.0/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/Code/alphahomebridging/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.6_@types+node@22.9.1_lightningcss@1.27.0_sass@1.72.0_terser@5.30.0__vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///F:/Code/alphahomebridging/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0_vue@3.4.21__rollup@4.13.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///F:/Code/alphahomebridging/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.26.2_rollup@4.13.2_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///F:/Code/alphahomebridging/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.26.2_rollup@4.13.2_vue@3.4.21/node_modules/unplugin-vue-components/dist/resolvers.js";
import UnoCSS from "file:///F:/Code/alphahomebridging/node_modules/.pnpm/unocss@0.58.8_postcss@8.4.38_rollup@4.13.2_vite@5.2.6_@types+node@22.9.1_lightningcss@1.27.0_sass@1.72.0_terser@5.30.0_/node_modules/unocss/dist/vite.mjs";
import legacy from "file:///F:/Code/alphahomebridging/node_modules/.pnpm/@vitejs+plugin-legacy@5.3.2_terser@5.30.0_vite@5.2.6_@types+node@22.9.1_lightningcss@1.27.0_sass@1.72.0_terser@5.30.0_/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import { compression } from "file:///F:/Code/alphahomebridging/node_modules/.pnpm/vite-plugin-compression2@0.12.0_rollup@4.13.2/node_modules/vite-plugin-compression2/dist/index.mjs";
import { nodePolyfills } from "file:///F:/Code/alphahomebridging/node_modules/.pnpm/vite-plugin-node-polyfills@0.22.0_rollup@4.13.2_vite@5.2.6_@types+node@22.9.1_lightningcss@1._zpx2pneu3cbmadp5wi65o556c4/node_modules/vite-plugin-node-polyfills/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "F:\\Code\\alphahomebridging";
var vite_config_default = (config) => {
  const envData = loadEnv(config.mode, process.cwd());
  console.log("envData\uFF1A", envData);
  return defineConfig({
    base: "",
    outDir: "dist",
    esbuild: {
      // 删除 console debugger
      // drop: ['console', 'debugger']
      supported: {
        bigint: true
      }
    },
    build: {
      assetsDir: "static"
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
        "@": path.resolve(__vite_injected_original_dirname, "src/"),
        buffer: "buffer"
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
        extensions: ["vue"],
        include: [/\.vue$/, /\.vue\?vue/],
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass"
          })
        ]
      }),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass"
          })
        ],
        include: [/\.[j]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ["vue", "pinia", "vue-router"],
        dts: "auto-imports.d.ts",
        dirs: ["src/api", "src/components", "src/store/modules"],
        vueTemplate: true
      }),
      compression(),
      legacy({
        targets: ["defaults", "not IE 11"]
      }),
      nodePolyfills({
        include: ["buffer"],
        globals: {
          Buffer: true
        }
      })
    ]
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxDb2RlXFxcXGFscGhhaG9tZWJyaWRnaW5nXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxDb2RlXFxcXGFscGhhaG9tZWJyaWRnaW5nXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9Db2RlL2FscGhhaG9tZWJyaWRnaW5nL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcclxuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSc7XHJcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5JztcclxuaW1wb3J0IHsgY29tcHJlc3Npb24gfSBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbjInO1xyXG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xyXG5cclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCAoY29uZmlnKSA9PiB7XHJcbiAgY29uc3QgZW52RGF0YSA9IGxvYWRFbnYoY29uZmlnLm1vZGUsIHByb2Nlc3MuY3dkKCkpO1xyXG4gIGNvbnNvbGUubG9nKCdlbnZEYXRhXHVGRjFBJywgZW52RGF0YSk7XHJcbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XHJcbiAgICBiYXNlOiAnJyxcclxuICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgZXNidWlsZDoge1xyXG4gICAgICAvLyBcdTUyMjBcdTk2NjQgY29uc29sZSBkZWJ1Z2dlclxyXG4gICAgICAvLyBkcm9wOiBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXVxyXG4gICAgICBzdXBwb3J0ZWQ6IHtcclxuICAgICAgICBiaWdpbnQ6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIGFzc2V0c0RpcjogJ3N0YXRpYydcclxuICAgICAgLy8gY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgICAvLyByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIC8vICAgaW5wdXQ6ICdpbmRleC5odG1sJyxcclxuICAgICAgLy8gICBvdXRwdXQ6IHtcclxuICAgICAgLy8gICAgIC8vIFx1NjI1M1x1NTMwNVx1NEYxOFx1NTMxNlxyXG4gICAgICAvLyAgICAgY2h1bmtGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgIC8vICAgICBlbnRyeUZpbGVOYW1lczogJ3N0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgLy8gICAgIGFzc2V0RmlsZU5hbWVzOiAnc3RhdGljL1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF0nLFxyXG4gICAgICAvLyAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgIC8vICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgLy8gICAgICAgICByZXR1cm4gaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKTtcclxuICAgICAgLy8gICAgICAgfVxyXG4gICAgICAvLyAgICAgfVxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfVxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiB0cnVlLFxyXG4gICAgICBwb3J0OiA1MTc3XHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy8nKSxcclxuICAgICAgICBidWZmZXI6ICdidWZmZXInXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgJ0Avc3R5bGUvZWxlbWVudC9pbmRleC5zY3NzJyBhcyAqO2BcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBvcHRpbWl6ZURlcHM6IHtcclxuICAgIC8vICAgZXNidWlsZE9wdGlvbnM6IHtcclxuICAgIC8vICAgICBkZWZpbmU6IHtcclxuICAgIC8vICAgICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnIC8vIFx1NUMwNiBnbG9iYWwgXHU2NkZGXHU2MzYyXHU0RTNBIGdsb2JhbFRoaXNcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIHBsdWdpbnM6IFtcclxuICAgIC8vICAgICAgIE5vZGVHbG9iYWxzUG9seWZpbGxQbHVnaW4oe1xyXG4gICAgLy8gICAgICAgICBidWZmZXI6IHRydWUgLy8gXHU1NDJGXHU3NTI4IGJ1ZmZlciBQb2x5ZmlsbFxyXG4gICAgLy8gICAgICAgfSlcclxuICAgIC8vICAgICBdXHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBVbm9DU1MoKSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgZXh0ZW5zaW9uczogWyd2dWUnXSxcclxuICAgICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlL10sXHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKHtcclxuICAgICAgICAgICAgaW1wb3J0U3R5bGU6ICdzYXNzJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICBdXHJcbiAgICAgIH0pLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICBpbXBvcnRTdHlsZTogJ3Nhc3MnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgaW5jbHVkZTogWy9cXC5bal1zeD8kLywgL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlL10sXHJcbiAgICAgICAgaW1wb3J0czogWyd2dWUnLCAncGluaWEnLCAndnVlLXJvdXRlciddLFxyXG4gICAgICAgIGR0czogJ2F1dG8taW1wb3J0cy5kLnRzJyxcclxuICAgICAgICBkaXJzOiBbJ3NyYy9hcGknLCAnc3JjL2NvbXBvbmVudHMnLCAnc3JjL3N0b3JlL21vZHVsZXMnXSxcclxuICAgICAgICB2dWVUZW1wbGF0ZTogdHJ1ZVxyXG4gICAgICB9KSxcclxuICAgICAgY29tcHJlc3Npb24oKSxcclxuICAgICAgbGVnYWN5KHtcclxuICAgICAgICB0YXJnZXRzOiBbJ2RlZmF1bHRzJywgJ25vdCBJRSAxMSddXHJcbiAgICAgIH0pLFxyXG4gICAgICBub2RlUG9seWZpbGxzKHtcclxuICAgICAgICBpbmNsdWRlOiBbJ2J1ZmZlciddLFxyXG4gICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgIEJ1ZmZlcjogdHJ1ZVxyXG4gICAgICAgIH1c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
