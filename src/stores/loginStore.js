import {KEY_KEYWORDS_LIST, KEY_USER_INFO} from "@/global/constants.js";
import {apiLogin} from "@/network/api/login.js";
import {localCache} from "@/utils/cache.js";
import {defineStore} from "pinia";
import {ref, watch} from "vue";

export const useLoginStore = defineStore("loginStore", () => {
    const userInfo = ref(null);
    const keywordsList = ref([])

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

    watch(keywordsList, (newVal, oldVal) => {
        console.log("数据发生变化了", keywordsList.value)
        localCache.setCache(KEY_KEYWORDS_LIST, keywordsList.value);
    }, {deep: true});

    const initKeywordsList = () => {
        keywordsList.value = localCache.getCache(KEY_KEYWORDS_LIST) ?? []
    }

    const addKeywords = (keywords) => {
        if (!keywordsList.value.includes(keywords)) {
            keywordsList.value.unshift(keywords);
        }
    }

    const clearKeywords = () => {
        keywordsList.value = []
    }

    return {
        userInfo,
        actionLogin,
        actionLogout,
        loadUserInfo,
        keywordsList,
        addKeywords,
        clearKeywords,
        initKeywordsList
    };
});