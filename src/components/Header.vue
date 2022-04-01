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
            <div class="header-icon">
                <el-icon>
                    <Avatar />
                </el-icon>
            </div>
            <div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        元宝
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <router-link to="accountSetting">
                                <el-dropdown-item>个人中心</el-dropdown-item>
                            </router-link>
                            <el-dropdown-item divided @click="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

            <!-- <span>元宝</span> -->
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
import { HomeFilled, Avatar, ShoppingCart, FolderOpened, ChatDotSquare, ArrowDown } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
const store = useStore()
const router = useRouter()
const route = useRoute()

const logout = () => {
    store.dispatch('LogOut').then(() => {

        router.push(`/login?redirect=${route.fullPath}`)
    })
}
</script>
<style scoped>
hr {
    color: rgb(224, 222, 222);
}
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
    align-items: center;
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