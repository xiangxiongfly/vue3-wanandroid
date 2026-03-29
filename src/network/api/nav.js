import request from "@/network/request.js";

export function apiGetNavList() {
    return request.get({url: "navi/json"})
}