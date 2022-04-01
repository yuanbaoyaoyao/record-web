<template>
    <div class="dashboard">
        <v-dashboard-header />
        <div class="dashboard-content">
            <div class="dashboard-content-left">
                <h4>常用耗材选择</h4>
                <div class="common-consumables">
                    <el-row v-for="(item, index) in listProductData.slice(0,6)" :key="index">
                        <el-col>{{ item }}</el-col>
                    </el-row>
                </div>
                <el-button size="small" @click="linkToProductSkus()">查看所有在库耗材</el-button>
            </div>
            <div class="dashboard-content-center">
                <el-carousel>
                    <el-carousel-item v-for="(item, index) in listProductSkusData" :key="index">
                        <el-image :src="listProductSkusData.avatar" />
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="dashboard-content-right">
                <div class="dashboard-user-avatar">
                    <el-avatar
                        :size="80"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    ></el-avatar>
                    <h3>欢迎</h3>
                </div>
                <div class="dashboard-user-notice">
                    <span class="notice-title">
                        <b>公告</b>
                    </span>
                    <span>新鲜事儿都在这里～</span>
                </div>
                <div class="dashboard-user-button">
                    <router-link to="/collects" class="link-info">
                        <el-icon>
                            <star />
                        </el-icon>
                        <span class="link-text">我的收藏</span>
                    </router-link>
                    <router-link to="/orders" class="link-info">
                        <el-icon>
                            <document-checked />
                        </el-icon>
                        <span class="link-text">我的订单</span>
                    </router-link>
                    <router-link to="/feedback" class="link-info">
                        <el-icon>
                            <sold-out />
                        </el-icon>
                        <span class="link-text">申请未在库耗材</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Star, DocumentChecked, SoldOut, Search, ShoppingBag } from '@element-plus/icons-vue'
import { ref } from 'vue'
import VDashboardHeader from '../components/DashboardHeader.vue'
import { listProductAllAPI } from '../api/product'
import { listProductSkusSearchAPI, listProductSkusLimitAPI } from '../api/product-skus'
import router from '../router'
const listProductData = ref([{}])
const listProductSkusData = ref()

const getProductInfo = () => {
    listProductAllAPI().then(res => {
        for (let i = 0; i < res.data.length;) {
            listProductData.value[i] = res.data[i++].title
        }
    })
}
const getProductSkusInfo = () => {
    listProductSkusLimitAPI().then(res => {
        listProductSkusData.value = res.data
    })
}
const linkToProductSkus = ()=>{
    router.push("/products")
}
getProductInfo()
getProductSkusInfo()
</script>
<style scoped>
.el-col-24 {
    margin: 6px;
    border: 1px solid #dcdfe6;
    padding: 10px;
    color: #303133;
    font-size: 14px;
    border-radius: 5px;
}
.common-consumables {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: center;
    align-content: center;
    margin-top: 10px;
}
span,
a {
    color: #727272;
}
a {
    text-decoration: none;
}
ul {
    list-style: none;
    padding: 0px;
}
h3,
h4 {
    text-align: center;
    margin: 0px;
}
img {
    height: fit-content;
    width: fit-content;
}
.dashboard {
    display: flex;
    flex-direction: column;
    width: 1190px !important;
    margin: auto;
}
.dashboard-content {
    display: grid;
    grid-template-columns: 20% 44% auto;
    background-color: white;
    border-radius: 15px;
}
.dashboard-content-left{
    display: grid;
    grid-template-rows: 10% auto 10%;
}
.dashboard-content-left,
.dashboard-content-right,
.dashboard-content-center {
    margin: 20px;
    border-radius: 15px;
}
.el-carousel--horizontal {
    border-radius: 15px;
}
.dashboard-content-right {
    display: grid;
    grid-template-rows: auto auto;
    background-color: whitesmoke;
}
.dashboard-user-avatar {
    margin: auto;
}
.dashboard-user-notice,
.dashboard-user-button {
    margin: 5px;
}
.dashboard-user-button {
    display: grid;
    grid-template-columns: auto auto auto;
}
.link-info {
    margin: auto;
    display: grid;
    grid-template-rows: auto auto;
    justify-items: center;
    align-items: center;
    font-size: x-large;
}
.link-text {
    font-size: 18px;
    margin: 5px;
    color: rgb(94, 90, 90);
}
.notice-title {
    margin-right: 10px;
    font-family: tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif !important;
    font-size: large;
    color: black;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>