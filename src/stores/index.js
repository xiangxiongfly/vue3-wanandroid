import {useLoginStore} from "@/stores/loginStore.js";
import {createPinia} from "pinia";

const store = (app) => {
    const pinia = createPinia();
    app.use(pinia);
    const loginStore = useLoginStore()
    loginStore.loadUserInfo()
};
export default store;