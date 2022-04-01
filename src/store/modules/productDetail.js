import storage from "../../utils/storage"

const productDetail = {
    state: {
        productTitle: '',
        productSkusTitle: '',
        productSkusAvatar: '',
        productSkusInfo: '',
        productSkusNumber: '',
        productSkusStock: ''
    },
    mutations: {
        SET_PRODUCT_TITLE: (state, productTitle) => {
            state.productTitle = productTitle
            storage.set("PRODUCT_TITLE", productTitle)
        },
        SET_PRODUCT_SKUS_TITLE: (state, productSkusTitle) => {
            state.productSkusTitle = productSkusTitle
            storage.set("PRODUCT_SKUS_TITLE", productSkusTitle)
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
    }
}

export default productDetail