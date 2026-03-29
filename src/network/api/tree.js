import request from "@/network/request.js";

export function apiGetTreeList() {
    return request.get({url: "/tree/json"})
}

export function apiGetTreeDetailList(id, page) {
    return request.get({url: `/article/list/${page}/json?cid=${id}`})
}