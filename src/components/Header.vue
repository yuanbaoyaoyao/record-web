<template>
    <div class="header">
        <div class="header-left">
            <router-link to="/">
                <div class="header-icon">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                </div>
                <span>耗材管理系统</span>
            </router-link>
            <router-link to="accountSetting">
                <div class="header-icon">
                    <el-icon>
                        <Avatar />
                    </el-icon>
                </div>
                <span>元宝</span>
            </router-link>
        </div>
        <div class="header-right">
            <router-link to="cart">
                <div class="header-icon">
                    <el-icon>
                        <ShoppingCart />
                    </el-icon>
                </div>
                <span>购物车</span>
            </router-link>
            <router-link to="collects">
                <div class="header-icon">
                    <el-icon>
                        <FolderOpened />
                    </el-icon>
                </div>
                <span>收藏夹</span>
            </router-link>
            <hr />
            <router-link to="feedback">
                <div class="header-icon">
                    <el-icon>
                        <ChatDotSquare />
                    </el-icon>
                </div>
                <span>反馈</span>
            </router-link>
        </div>
    </div>
</template>
<script setup>
import { HomeFilled, Avatar, ShoppingCart, FolderOpened, ChatDotSquare } from '@element-plus/icons-vue';
</script>
<style scoped>
.header {
    position: absolute;
    box-sizing: border-box;
    /* width: 100%; */
    width: 1190px;
    height: 38px;
    top: 0px;
    left: 0px;
    right: 0px;
    background: #f5f5f5;
}
.header,
.header-right,
.header-left {
    display: flex;
    justify-content: space-between;
}
.header {
    margin: auto;
}
a {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    text-decoration: none;
    font-size: 15px !important;
    color: #6c6c6c !important;
    margin: 10px;
}
.header-icon {
    margin-top: 2px;
}
</style>