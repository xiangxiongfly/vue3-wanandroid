import request from "@/network/request.js";

export function apiGetChapterList() {
    return request.get({url: "/wxarticle/chapters/json"})
}

export function apiGetChapterDetail(id, page) {
    return request.get({url: `wxarticle/list/${id}/${page}/json`})
}