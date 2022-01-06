<template>
    <div class="collect">
        <div>
            <h2 class="collect-title">我的收藏</h2>
        </div>
        <hr />
        <div class="collect-content">
            <el-row>
                <el-col v-for="(o, index) in 2" :key="o" :span="8" :offset="index > 0 ? 2 : 0">
                    <el-card :body-style="{ padding: '0px' }">
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
                            <el-button type="primary">Operating</el-button>
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
:deep().el-form-item__label {
    width: 80px !important;
}
:deep().el-input__inner,
:deep().el-textarea__inner {
    width: 550px;
}
</style>