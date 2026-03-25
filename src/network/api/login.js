import request from "@/network/request.js";

export function apiLogin(username, password) {
    return request.post({
        url: "/user/login",
        data: {
            username,
            password
        }
    });
}