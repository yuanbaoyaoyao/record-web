<template>
    <div class="collect">
        <div>
            <h2 class="collect-title">我的收藏</h2>
        </div>
        <hr />
        <div class="collect-content">
            <el-row>
                <el-col v-for="(o, index) in 3" :key="o" :span="6" :offset="index > 0 ? 2 : 0">
                    <el-card shadow="never" :body-style="{ padding: '0px' }">
                        <el-link href="http://www.baidu.com" target="_blank" :underline="false">
                            <img
                                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                class="image"
                            />
                        </el-link>
                        <div style="padding: 14px">
                            <el-link
                                href="http://www.baidu.com"
                                target="_blank"
                                :underline="false"
                            >Yummy hamburger</el-link>
                            <div class="bottom">
                                <time class="time">{{ currentDate }}</time>
                            </div>
                        </div>
                        <div class="button">
                            <el-button type="primary">删除</el-button>
                            <el-button type="primary">查看详情</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
const currentDate = ref(new Date())
</script>
<style scoped>
hr {
    width: 1004px;
}
.el-card{
    border: transparent !important;
    margin-left: 40px;
}
:deep().el-button {
    transition-property: opacity;
    transition-duration: 1s;
    opacity: 0;
}
.collect-content:hover :deep().el-button {
    transition-property: opacity;
    transition-duration: 1s;
    opacity: 1;
}
.collect {
    margin: 25px;
}
.collect-title {
    font-weight: 500;
}
.collect-content {
    display: grid;
    grid-template-columns: auto auto;
}
.collect-table {
    min-width: 760px;
}
.box-card {
    width: 280px;
    height: 280px;
    margin: 15px;
}
</style>