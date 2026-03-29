import request from "@/network/request.js";

export function apiGetProjectTabs() {
    return request.get({
        url: "/project/tree/json"
    })
}

export function apiGetProjectList(page, id) {
    return request.get({
        url: `project/list/${page}/json?cid=${id}`
    })
}
