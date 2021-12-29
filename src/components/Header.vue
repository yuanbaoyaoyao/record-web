<template>
    <div class="header">
        <div class="header-left">
            <el-button :icon="Avatar" type="text">用户名</el-button>
        </div>
        <div class="header-right">
            <el-button :icon="ShoppingCart" type="text">购物车</el-button>
            <el-button :icon="FolderOpened" type="text">收藏夹</el-button>
            <el-button :icon="ChatDotSquare" type="text">反馈</el-button>
        </div>
    </div>
</template>
<script setup>
import { Avatar, ShoppingCart, FolderOpened, ChatDotSquare } from '@element-plus/icons-vue';
</script>
<style>
.header {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 38px;
    top: 0px;
    left: 0px;
    right: 0px;
    background: #f5f5f5;
}
.header,
.header-right {
    display: flex;
    justify-content: space-between;
}
.el-button--text{
    font-size: 15px !important;
    color: #6c6c6c !important;
}
.header-right>.el-button--text{
    margin-right: 15px;
}
.header-left>.el-button--text{
    margin-left: 15px;
}
</style>