<template>
    <div class="dashboard">
        <div class="dashboard-header">
            <div class="dashboard-logo">耗材管理系统</div>
            <div class="dashboard-search">search</div>
            <div class="dashboard-blank"></div>
        </div>
        <div class="dashboard-content">
            <div class="dashboard-content-left">
                <div>耗材选择</div>
                <div class="dashboard-consumables-list">
                    <ul v-for="(item,index) in listData" :key="index">
                        <li class="dashboard-consumables-list-detail">
                            <a :href="item.linkname" target="_blank">{{ item.name }}</a>
                            <span>/</span>
                            <a :href="item.linkevent" target="_blank">{{ item.event }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="dashboard-content-center">
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3>{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="dashboard-content-right">
                <div class="dashboard-user">avatar</div>
                <div class="dashboard-user-history">history</div>
            </div>
        </div>
    </div>
</template>
<script setup>
const listData = [
    {
        name: "qwe",
        linkname: "http://www.baidu.com",
        event: "need a card",
        linkevent: "www.baidu.com"
    },
    {
        name: "qwe",
        linkname: "http://www.baidu.com",
        event: "need a card",
        linkevent: "www.baidu.com"
    },
    {
        name: "qwe",
        linkname: "http://www.baidu.com",
        event: "need a card",
        linkevent: "www.baidu.com"
    },
    {
        name: "qwe",
        linkname: "http://www.baidu.com",
        event: "need a card",
        linkevent: "www.baidu.com"
    },
]
</script>
<style>
ul {
    list-style: none;
}
.dashboard {
    display: flex;
    flex-direction: column;
}
.dashboard-header,
.dashboard-content {
    display: flex;
}
.dashboard-header,
.dashboard-content {
    justify-content: space-between;
}
.dashboard-content {
    background-color: white;
    border-radius: 15px;
}
.dashboard-consumables-list-detail {
}
</style>