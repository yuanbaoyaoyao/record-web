<template>
    <div class="products">
        <v-dashboard-header />
        <div class="products-content">
            <div class="products-filter">
                <!-- title动态 -->
                <div class="products-filter-title">products-filter-title</div>
                <div>
                    <ul class="products-filter-content">
                        <li>轻薄笔记本1</li>
                        <li>轻薄笔记本2</li>
                        <li>轻薄笔记本3</li>
                        <li>轻薄笔记本4</li>
                        <li>轻薄笔记本5</li>
                        <li>轻薄笔记本6</li>
                    </ul>
                </div>
            </div>
            <div>
                <el-row>
                    <el-col v-for="(o, index) in 6" :key="o" :span="4" :offset="index > 0 ? 2 : 0">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <el-link href="http://www.baidu.com" target="_blank" :underline="false">
                                <el-image style="width: 200px; height: 200px" :src="url" :fit="fit"></el-image>
                                <span>Yummy hamburger</span>
                            </el-link>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Star, DocumentChecked, Warning, Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
import VDashboardHeader from '../components/DashboardHeader.vue';
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
:deep().el-card {
    transition-property: transform;
    transition-duration: 0.5s;
    animation: cardShadow 0.5s;
    animation-fill-mode: forwards;
}
:deep().el-card:hover {
    transition-property: transform;
    transition-duration: 0.5s;
    transform: translateY(-2px);
    animation: cardShadow_hover 0.5s;
    animation-fill-mode: forwards;
}
@keyframes cardShadow_hover {
    from {
        box-shadow: 0px 0px 0px 0px rgb(252, 249, 249);
    }
    to {
        box-shadow: 0px 0px 5px 2px rgb(161, 159, 159);
    }
}
@keyframes cardShadow {
    from {
        box-shadow: 0px 0px 5px 2px rgb(161, 159, 159);
    }
    to {
        box-shadow: 0px 0px 0px 0px rgb(252, 249, 249);
    }
}

:deep() td {
    display: flex;
}
:deep().el-card__body {
    width: 200px;
}
.el-row {
    display: grid !important;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto auto auto auto;
    justify-items: center;
}
:deep().el-col-offset-2 {
    margin-left: 0;
}
:deep().el-col-4 {
    max-width: 100%;
}
.products-filter-content {
    display: flex;
    margin: 0;
    padding-left: 10px;
}
.products-filter-content > li {
    margin-right: 10px;
}
.products {
    display: flex;
    flex-direction: column;
    width: 1190px !important;
    margin: auto;
}

.products-filter {
    display: flex;
    border: solid 1px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
.products-filter-title {
    border-right: solid 1px;
    padding-left: 10px;
    padding-right: 10px;
}
.products-content {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 15px;
}
</style>