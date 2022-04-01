<template>
    <div>
        <div class="layout-header">
            <v-header />
        </div>
        <div class="account-setting">
            <div class="setting-header">
                <div class="setting-avatar">
                    <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    ></el-avatar>
                </div>
                <div class="setting-userInfo">
                    <div class="setting-userName">元宝</div>
                    <div class="setting-title">个人id</div>
                </div>
            </div>
            <div class="setting-center">
                <v-account-sidebar />
                <div class="setting-center-content">
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <div>
                                <component :is="Component" />
                            </div>
                        </keep-alive>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import vHeader from "../components/Header.vue"
import vAccountSidebar from '../components/AccountSidebar.vue';
</script>
<style scoped>
.layout-header {
    margin-bottom: 40px;
}
.account-setting {
    width: 1190px !important;
    margin: auto;
}
.setting-header {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: flex-start;
    margin: 25px;
}
.setting-center {
    display: flex;
    background-color: white;
}
</style>