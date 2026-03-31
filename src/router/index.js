import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/main",
        },
        {
            path: "/main",
            component: () => import("@/views/main/Main.vue"),
        },
        {
            path: "/treedetail",
            component: () => import("@/views/main/tree/detail/TreeDetail.vue"),
        },
        {
            path: "/chapterdetail",
            component: () => import("@/views/main/chapter/detail/ChapterDetail.vue"),
        },
        {
            path: "/search",
            component: () => import("@/views/search/Search.vue"),
        },
        {
            path: "/login",
            component: () => import("@/views/login/Login.vue"),
        },
        {
            path: "/collection",
            component: () => import("@/views/collection/Collection.vue"),
        },
        {
            path: "/webview",
            component: () => import("@/views/webview/WebView.vue"),
        }
    ],
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        console.log("scrollBehavior: ", to, from, savedPosition);
        if (savedPosition) {
            return savedPosition;
        }
        // 始终回到顶部
        return {top: 0, left: 0};
    }
});

export default router;
