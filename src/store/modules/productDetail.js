import storage from "../../utils/storage"

const productDetail = {
    state: {
        productTitle: '',
        productId: '',
        productSKusIsLike: '',
        productSkusTitle: '',
        productSkusId: '',
        productSkusAvatar: '',
        productSkusInfo: '',
        productSkusNumber: '',
        productSkusStock: '',
        productSkusSearchList: [],
        isSearch: false
    },
    mutations: {
        SET_PRODUCT_TITLE: (state, productTitle) => {
            state.productTitle = productTitle
            storage.set("PRODUCT_TITLE", productTitle)
        },
        SET_PRODUCT_ID: (state, productId) => {
            state.productId = productId
            storage.set("PRODUCT_ID", productId)
        },
        SET_PRODUCT_SKUS_IS_LIKE: (state, productSKusIsLike) => {
            state.productSKusIsLike = productSKusIsLike
            storage.set("PRODUCT_SKUS_IS_LIKE", productSKusIsLike)
        },
        SET_PRODUCT_SKUS_TITLE: (state, productSkusTitle) => {
            state.productSkusTitle = productSkusTitle
            storage.set("PRODUCT_SKUS_TITLE", productSkusTitle)
        },
        SET_PRODUCT_SKUS_ID: (state, productSkusId) => {
            state.productSkusId = productSkusId
            storage.set("PRODUCT_SKUS_ID", productSkusId)
        },
        SET_PRODUCT_SKUS_AVATAR: (state, productSkusAvatar) => {
            state.productSkusAvatar = productSkusAvatar
            storage.set("PRODUCT_SKUS_AVATAR", productSkusAvatar)
        },
        SET_PRODUCT_SKUS_INFO: (state, productSkusInfo) => {
            state.productSkusInfo = productSkusInfo
            storage.set("PRODUCT_SKUS_INFO", productSkusInfo)
        },
        SET_PRODUCT_SKUS_NUMBER: (state, productSkusNumber) => {
            state.productSkusNumber = productSkusNumber
            storage.set("PRODUCT_SKUS_NUMBER", productSkusNumber)
        },
        SET_PRODUCT_SKUS_STOCK: (state, productSkusStock) => {
            state.productSkusStock = productSkusStock
            storage.set("PRODUCT_SKUS_STOCK", productSkusStock)
        },
        SET_PRODUCT_SKUS_SEARCH_LIST: (state, productSkusSearchList) => {
            state.productSkusSearchList = productSkusSearchList
        },
        SET_IS_SEARCH: (state, isSearch) => {
            state.isSearch = isSearch
        }
    }
}

export default productDetail