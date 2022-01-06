<template>
    <div class="sidebar-layout">
        <el-row>
            <el-col>
                <el-menu :default-active="onRoutes" router>
                    <div>
                        <span class="sidebar-title">个人中心</span>
                    </div>
                    <el-menu-item index="/notify" route="/notify">
                        <el-icon>
                            <bell />
                        </el-icon>
                        <span>消息通知</span>
                    </el-menu-item>
                    <el-menu-item index="/deliveryAddress" route="/deliveryAddress">
                        <el-icon>
                            <house />
                        </el-icon>
                        <span>收货地址</span>
                    </el-menu-item>
                    <el-menu-item index="/collects" route="/collects">
                        <el-icon>
                            <collection />
                        </el-icon>
                        <span>我的收藏</span>
                    </el-menu-item>
                    <el-menu-item index="/feedback" route="/feedback">
                        <el-icon>
                            <warning />
                        </el-icon>
                        <span>我的反馈</span>
                    </el-menu-item>
                    <hr />
                    <span class="sidebar-title">订单中心</span>
                    <el-menu-item index="/orders" route="/orders">
                        <el-icon>
                            <document-copy />
                        </el-icon>
                        <span>我的订单</span>
                    </el-menu-item>
                    <el-menu-item index="/rate" route="/rate">
                        <el-icon>
                            <circle-check />
                        </el-icon>
                        <span>我的评价</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="/apply" route="/apply">
                        <el-icon>
                            <sold-out />
                        </el-icon>
                        <span>我的申请</span>
                    </el-menu-item>-->
                    <hr />
                    <div>
                        <span class="sidebar-title">账户管理</span>
                    </div>
                    <el-menu-item index="/userInfo" route="/userInfo">
                        <el-icon>
                            <user />
                        </el-icon>
                        <span>个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="/passwordEdit" route="/passwordEdit">
                        <el-icon>
                            <key />
                        </el-icon>
                        <span>修改密码</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import {
    User, House, Collection, Warning, DocumentCopy, CircleCheck, SoldOut, Bell, Key
} from '@element-plus/icons-vue'
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
})
</script>
<style scoped>
hr {
    margin: 10px;
}
span {
    margin: 5px;
}
.el-menu-item {
    height: 45px;
}
.sidebar-title {
    padding-left: 20px;
    font-size: large;
    font-weight: 500;
    line-height: 52px;
    color: #333;
}
.sidebar-layout {
    width: 147px;
}
</style>