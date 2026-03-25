import {KEY_USER_INFO} from "@/global/constants.js";
import {apiLogin} from "@/network/api/login.js";
import {localCache} from "@/utils/cache.js";
import {defineStore} from "pinia";
import {ref} from "vue";

export const useLoginStore = defineStore("loginStore", () => {
    const userInfo = ref(null);

    const actionLogin = async (username, password) => {
        const {data} = await apiLogin(username, password);
        userInfo.value = {id: data.id, username: data.username, nickname: data.nickname};
        localCache.setCache(KEY_USER_INFO, userInfo.value);
    };

    const actionLogout = () => {
        userInfo.value = null;
        localCache.removeCache(KEY_USER_INFO);
    };

    const loadUserInfo = () => {
        const user = localCache.getCache(KEY_USER_INFO);
        if (user) {
            userInfo.value = user;
        }
    };

    return {
        userInfo,
        actionLogin,
        actionLogout,
        loadUserInfo
    };
});