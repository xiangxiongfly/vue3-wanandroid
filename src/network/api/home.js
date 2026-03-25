import request from "@/network/request.js";

export function apiGetBanners() {
    return request.get({url: "/banner/json"});
}

export function apiGetArticles(page) {
    return request.get({url: `/article/list/${page}/json`,});
}