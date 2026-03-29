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
            path: "/login",
            component: () => import("@/views/login/Login.vue"),
        }
    ],
});

export default router;
