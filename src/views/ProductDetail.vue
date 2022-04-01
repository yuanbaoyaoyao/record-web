<template>
    <div>
        <div class="layout-header">
            <v-header />
        </div>
        <div class="productDetail">
            <div class="productDetail-header">
                <div class="productDetail-header-title">
                    <div class="productDetail-header-logo">
                        <a href="#">
                            <img
                                src="../assets/sysLogo.svg"
                                style="display:block;width:110px;height:auto"
                            />
                        </a>
                    </div>
                    <span class="productDetail-header-detail">耗材详情</span>
                </div>
                <div class="productDetail-header-search">
                    <div class="productDetail-header-search-input">
                        <el-input
                            v-model="input"
                            placeholder="Please input"
                            :prefix-icon="Search"
                            clearable
                        />
                    </div>
                    <div class="search-button">
                        <el-button type="primary">Search</el-button>
                    </div>
                </div>
            </div>
            <div class="productDetail-bottom">
                <el-image :src="productSkusAvatar"></el-image>
                <div class="productDetail-content">
                    <div class="prodicutDetail-title">{{ productTitle }}</div>
                    <hr />
                    <div class="productDetail-model-select">
                        <span class="productDetail-select">选择型号</span>
                        <div class="productDetail-select-button">
                            <el-select
                                v-model="productSkusTitle"
                                class="m-2"
                                placeholder="请选中型号"
                                size="large"
                                @change="handleChangeProductSkus()"
                            >
                                <el-option
                                    v-for="item in productSkusOptions"
                                    :key="item.title"
                                    :label="item.title"
                                    :value="item.title"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="productDetail-info">
                        <span>{{ productSkusInfo }}</span>
                        <span>库存数量：{{ productSkusStock }}</span>
                    </div>
                    <div class="productDetail-number-select">
                        <span class="productDetail-select">选择数量</span>
                        <div class="productDetail-select-button">
                            <el-input-number
                                size="large"
                                v-model="num"
                                :min="1"
                                :max="10"
                                @change="handleChange"
                            />
                        </div>
                    </div>
                    <!-- <div class="productDetail-summary">
                    <div class="productDetail-summary-top">
                        <div class="productDetail-summary-info">summary-info</div>
                        <div class="productDetail-summary-price">summary-price</div>
                    </div>
                    <div class="productDetail-moneyCount">moneyCount</div>
                    </div>-->
                    <div class="productDetail-button">
                        <el-button>
                            <el-icon>
                                <shopping-cart />
                            </el-icon>加入购物车
                        </el-button>
                        <el-button>
                            <el-icon>
                                <star />
                            </el-icon>
                            <span>喜欢</span>
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import vHeader from "../components/Header.vue"
import { Star, ShoppingCart } from '@element-plus/icons';
import { ref, computed } from 'vue';
import { listProductAllAPI } from '../api/product'
import { listProductSkusSearchAPI } from '../api/product-skus'
import store from "../store"
import storage from '../utils/storage';

const search = ref('')
const input = ref('')
const productTitle = computed(() => {
    if (store.getters.productTitle != '') {
        return store.getters.productTitle
    } else {
        return storage.get("PRODUCT_TITLE")
    }
})

const productSkusTitle = computed(() => {
    if (store.getters.productSkusTitle != '') {
        return store.getters.productSkusTitle
    } else {
        return storage.get("PRODUCT_SKUS_TITLE")
    }
})

const productSkusInfo = computed(() => {
    if (store.getters.productSkusInfo != '') {
        return store.getters.productSkusInfo
    } else {
        return storage.get("PRODUCT_SKUS_INFO")
    }
})

const productSkusStock = computed(() => {
    if (store.getters.productSkusStock != '') {
        return store.getters.productSkusStock
    } else {
        return storage.get("PRODUCT_SKUS_STOCK")
    }
})

const productSkusNumber = computed(() => {
    if (store.getters.productSkusNumber != '') {
        return store.getters.productSkusNumber
    } else {
        return storage.get("PRODUCT_SKUS_NUMBER")
    }
})

const productSkusAvatar = computed(() => {
    if (store.getters.productSkusAvatar != '') {
        return store.getters.productSkusAvatar
    } else {
        return storage.get("PRODUCT_SKUS_AVATAR")
    }
})

const productSkusOptions = ref([])
const num = ref(1)
const handleChange = (value) => {
    console.log(value)
}
const getProductSkusInfo = () => {
    listProductSkusSearchAPI().then(res => {
        productSkusOptions.value = res.data.records
        console.log("productSkusOptions", productSkusOptions.value)
    })
}
const handleChangeProductSkus = (value) => {
    store.commit("SET_PRODUCT_SKUS_TITLE", value)

}
getProductSkusInfo()
</script>
<style scoped>
.layout-header{
    margin-bottom: 30px;
}
hr {
    margin: 20px 0 20px 0;
    color: #b0b0b080;
}
.productDetail {
    display: flex;
    flex-direction: column;
    width: 1190px !important;
    margin: auto;
}
.productDetail-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.productDetail-header {
    margin: 25px;
}
.productDetail-header-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.productDetail-header-detail {
    font-size: xx-large;
    font-family: "Courier New", Courier, monospace;
    margin: 5px;
}
.productDetail-header-search {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
}
.productDetail-header-search-input {
    width: 300px;
    border-radius: 15px;
}
.productDetail-header-search-input :deep() .el-input__inner,
.el-button.el-button--primary {
    height: 50px;
}
.productDetail-bottom {
    display: grid;
    grid-template-columns: 50% auto;
    background-color: white;
    margin-top: 10px;
    height: 460px;
}
.productDetail-bottom > .img {
    margin: 10px 0 10px 30px;
}
.productDetail-content {
    margin: 30px 10px 30px 0;
    display: grid;
    grid-template-rows: 10% 5% 18% 22% 22%;
}
:deep().el-image__inner {
    width: 420px;
    height: 400px;
    margin: 30px 20px 30px 60px;
}
.prodicutDetail-title {
    font-size: xxx-large;
    font-weight: 500;
}
.productDetail-info {
    display: grid;
    grid-template-rows: 50% auto;
    margin: 20px 0 10px;
    font-size: x-large;
    color: #b0b0b0;
}
.productDetail-price {
    font-size: 18px;
    margin: 12px 0 12px;
}
.productDetail-model-select,
.productDetail-number-select .productDetail-select,
.productDetail-select-button {
    margin: 10px 0 10px 0;
    font-size: x-large;
    width: 180px;
}
.productDetail-select-button :deep()input.el-input__inner {
    font-size: x-large;
}

.productDetail-summary {
    padding: 30px;
    margin-bottom: 30px;
    margin-top: 20px;
    background-color: rgba(241, 238, 238, 0.76);
}
.productDetail-summary-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.productDetail-moneyCount {
    margin-top: 20px;
    font-size: 24px;
}
.productDetail-button button {
    height: 50px;
    font-size: large;
}
.productDetail-button button:first-of-type {
    width: 200px;
}
.productDetail-button button:last-of-type {
    width: 150px;
}
</style>