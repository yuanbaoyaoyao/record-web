<template>
  <div>
    <div class="layout-header">
      <v-header />
    </div>
    <div class="account-setting">
      <div class="setting-header">
        <div class="setting-avatar">
          <el-avatar :src="userAvatar"></el-avatar>
        </div>
        <div class="setting-userInfo">
          <div class="setting-username">{{ userName }}</div>
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
import vHeader from "../components/Header.vue";
import vAccountSidebar from "../components/AccountSidebar.vue";
import { computed } from "@vue/runtime-core";
import storage from "../utils/storage";
const userName = computed(() => {
  return storage.get("USER_NAME");
});
const userAvatar = computed(() => {
  return storage.get("USER_AVATAR");
});
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
.setting-username {
  text-align: center;
}
.setting-center-content{
  height: 651px;
}
</style>