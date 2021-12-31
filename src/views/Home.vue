<template>
    <div class="layout">
        <div class="layout-header">
            <v-header />
        </div>
        <div class="layout-center">
            <!-- <v-sidebar /> -->
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>
<script setup>
import vSidebar from "../components/Sidebar.vue"
import vHeader from "../components/Header.vue"
</script>
<style>
.content {
    position: absolute;
    box-sizing: border-box;
    background: #eae8eb;
    height: 100%;
    width: 100%;
    top: 38px;
    left: 0px;
    overflow-y: scroll;
    padding: 10px;
}
</style>