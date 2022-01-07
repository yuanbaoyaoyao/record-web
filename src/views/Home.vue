<template>
    <div class="layout">
        <div class="layout-header">
            <v-header />
        </div>
        <div class="layout-center">
            <!-- <v-sidebar /> -->
            <div class="content">
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
</template>
<script setup>
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