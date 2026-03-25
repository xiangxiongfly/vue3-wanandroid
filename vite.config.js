import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import {VantResolver} from "@vant/auto-import-resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // vueDevTools(),
        AutoImport({
            resolvers: [VantResolver()],
        }),
        Components({
            resolvers: [VantResolver()],
        })
    ],
    server: {
        proxy: {
            // 处理“/path”前缀的路径
            "/api": {
                // 替换目标接口
                target: "https://www.wanandroid.com",
                // 表示开启代理，允许跨域
                changeOrigin: true,
                // 重写路径，删除"/path"
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        },
    },
});
