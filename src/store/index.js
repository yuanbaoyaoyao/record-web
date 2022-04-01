import { createStore } from "vuex";

// import app from "./modules/app";
import permission from "./modules/permission";
// import tag from "./modules/tag";
import user from "./modules/user"
import productDetail from "./modules/productDetail"
import getters from "./getters"

const store = createStore({
    modules: {
        // app,
        permission,
        // tag,
        productDetail,
        user
    },
    getters
})

export default store