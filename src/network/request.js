import {BASE_URL, TIMEOUT} from "@/network/config.js";
import axios from "axios";

class NetworkRequest {
    constructor(baseURL, timeout = 10000) {
        this.instance = axios.create({
            baseURL,
            timeout,
        });

        // 请求拦截器
        this.instance.interceptors.request.use(config => {
            return config;
        }, err => {
            return Promise.reject(err);
        });
        // 响应拦截器
        this.instance.interceptors.response.use(res => {
            return res.data;
        }, err => {
            return Promise.reject(err);
        });
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance
                .request({
                    ...config,
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    get(config) {
        return this.request({
            ...config,
            method: "GET",
        });
    }

    post(config) {
        return this.request({
            ...config,
            method: "POST",
        });
    }
}

export default new NetworkRequest(BASE_URL, TIMEOUT);