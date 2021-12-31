<template>
    <div class="dashboard">
        <div class="dashboard-header">
            <div class="dashboard-logo">
                <a href="#">
                    <img src="../assets/sysLogo.svg" style="display:block;width:110px;height:auto" />
                </a>
            </div>
            <div>
                <div class="dashboard-search-top">
                    <div class="search-input">
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
                <div class="dashboard-search-down">
                    <a
                        :href="item.linkname"
                        target="_blank"
                        v-for="(item,index) in arraySearch"
                        :key="index"
                    >{{ item.name }}</a>
                </div>
            </div>
            <div class="dashboard-blank"></div>
        </div>
        <div class="dashboard-content">
            <div class="dashboard-content-left">
                <h4>耗材选择</h4>
                <div class="dashboard-consumables-list">
                    <ul v-for="(item,index) in listData" :key="index" class="list-ul">
                        <li class="dashboard-consumables-list-detail">
                            <div class="list-detail-icon">
                                <i :class="item.icon"></i>
                            </div>
                            <div class="list-detail-text">
                                <a :href="item.linkname" target="_blank">{{ item.name }}</a>
                                <span>/</span>
                                <a :href="item.linkevent" target="_blank">{{ item.event }}</a>
                                <span>/</span>
                                <a :href="item.linkevent" target="_blank">{{ item.event }}</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="dashboard-content-center">
                <el-carousel>
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3>{{ item }}</h3>
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
                    <div class="button-info">
                        <el-icon>
                            <star />
                        </el-icon>
                        <el-button type="text">
                            <span class="button-text">我的收藏</span>
                        </el-button>
                    </div>
                    <div class="button-info">
                        <el-icon>
                            <document-checked />
                        </el-icon>
                        <el-button type="text">
                            <span class="button-text">我的订单</span>
                        </el-button>
                    </div>
                    <div class="button-info">
                        <el-icon>
                            <warning />
                        </el-icon>
                        <el-button type="text">
                            <span class="button-text">我的反馈</span>
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Star, DocumentChecked, Warning, Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
const input = ref('')
const arraySearch = [
    {
        name: "88a",
        linkname: "http://www.baidu.com",
    },
    {
        name: "88a",
        linkname: "http://www.baidu.com",
    },
    {
        name: "88a",
        linkname: "http://www.baidu.com",
    },
    {
        name: "88a",
        linkname: "http://www.baidu.com",
    },
    {
        name: "88a",
        linkname: "http://www.baidu.com",
    },
    {
        name: "88a",
        linkname: "http://www.baidu.com",
    },
    {
        name: "88a",
        linkname: "http://www.baidu.com",
    },
]
const listData = [
    {
        icon: "fas fa-cubes",
        name: "88a",
        linkname: "http://www.baidu.com",
        event: "28a ",
        linkevent: "www.baidu.com"
    },
    {
        icon: "fas fa-cubes",
        name: "88a",
        linkname: "http://www.baidu.com",
        event: "28a ",
        linkevent: "www.baidu.com"
    },
    {
        icon: "fas fa-cubes",
        name: "88a",
        linkname: "http://www.baidu.com",
        event: "28a ",
        linkevent: "www.baidu.com"
    },
    {
        icon: "fas fa-cubes",
        name: "88a",
        linkname: "http://www.baidu.com",
        event: "28a ",
        linkevent: "www.baidu.com"
    },
    {
        icon: "fas fa-cubes",
        name: "88a",
        linkname: "http://www.baidu.com",
        event: "28a ",
        linkevent: "www.baidu.com"
    },
    {
        icon: "fas fa-cubes",
        name: "88a",
        linkname: "http://www.baidu.com",
        event: "28a ",
        linkevent: "www.baidu.com"
    },
    {
        icon: "fas fa-cubes",
        name: "88a",
        linkname: "http://www.baidu.com",
        event: "28a ",
        linkevent: "www.baidu.com"
    },
]
</script>
<style scoped>
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
.dashboard-header {
    display: grid;
    grid-template-columns: 20% 55% auto;
    justify-items: center;
    margin: 25px;
}
.dashboard-search-top {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-top: 10px;
}
.search-input {
    width: 600px;
    border-radius: 15px;
}
.search-input :deep() .el-input__inner {
    height: 50px;
}
.search-button > .el-button {
    height: 50px;
}
.dashboard-search-down {
    display: flex;
}
.dashboard-search-down > a {
    margin-left: 5px;
}
.dashboard-content {
    display: grid;
    grid-template-columns: 20% 44% auto;
    background-color: white;
    border-radius: 15px;
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
.dashboard-consumables-list-detail {
    display: grid;
    grid-template-columns: auto auto;
}
.list-detail-icon {
    text-align: center;
}
.list-detail-text {
    display: flex;
    justify-content: space-around;
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
.dashboard-logo-img {
    font-size: x-large;
}
.button-info {
    margin: auto;
    display: grid;
    grid-template-rows: auto auto;
    justify-items: center;
    align-items: center;
    font-size: x-large;
}
.button-text {
    font-size: large;
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