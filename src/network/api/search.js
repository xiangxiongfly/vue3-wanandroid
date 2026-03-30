import request from "@/network/request.js";

export function apiGetHotkeys() {
    return request.get({url: "/hotkey/json"})
}

export function apiQueryList(page, keywords) {
    return request.post({url: `/article/query/${page}/json`, data: {k: keywords}})
}