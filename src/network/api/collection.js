import request from "@/network/request.js";

export function apiCollectArticle(id) {
    return request.post({url: `/lg/collect/${id}/json`});
}

// 取消文章列表的收藏
export function apiUncollectArticle(id) {
    return request.post({url: `/lg/uncollect_originId/${id}/json`});
}

export function apiGetCollectionList(page) {
    return request.get({url: `/lg/collect/list/${page}/json`});
}

// 取消收藏列表的收藏
export function apiUncolletWithCollection(id, originId) {
    return request.post({url: `/lg/uncollect/${id}/json`, data: {originId}});
}