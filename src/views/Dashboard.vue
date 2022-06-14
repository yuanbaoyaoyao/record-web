<template>
  <div class="dashboard">
    <v-dashboard-header />
    <div class="dashboard-content">
      <div class="dashboard-content-left">
        <h4>常用耗材选择</h4>
        <div class="common-consumables">
          <el-row
            v-for="(item, index) in listProductData.slice(0, 9)"
            :key="index"
          >
            <el-button type="text">
              <el-col>{{ item }}</el-col>
            </el-button>
          </el-row>
        </div>
        <el-button size="small" @click="linkToProductSkus()"
          >查看所有在库耗材</el-button
        >
      </div>
      <div class="dashboard-content-center">
        <el-carousel>
          <el-carousel-item
            v-for="(item, index) in listRotationsData"
            :key="index"
          >
            <el-image :src="item.avatar" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="dashboard-content-right">
        <div class="dashboard-user-avatar">
          <el-avatar
            :size="80"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <h3>欢迎</h3>
        </div>
        <div class="dashboard-user-notice" @click="handleOpenAnnouncement">
          <span class="notice-title">
            <b>公告</b>
          </span>
          <transition @enter="enter" :css="false">
            <div
              v-if="showAnimation"
              class="notice-content notice-content-enter-active"
            >
              {{ announcement }}
            </div>
          </transition>
        </div>
        <div class="dashboard-user-button">
          <router-link to="/collects" class="link-info">
            <el-icon>
              <star />
            </el-icon>
            <span class="link-text">我的收藏</span>
          </router-link>
          <router-link to="/orders" class="link-info">
            <el-icon>
              <document-checked />
            </el-icon>
            <span class="link-text">我的订单</span>
          </router-link>
          <router-link to="/apply" class="link-info">
            <el-icon>
              <sold-out />
            </el-icon>
            <span class="link-text">填表申请耗材</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="dashboard-likes">
      <span class="dashboard-likes-title"> 猜你喜欢 </span>
      <div class="dashboard-likes-items">
        <el-row v-for="(item, index) in listLikesData" :key="index">
          <el-button type="text">
            <el-col>
              <img
                :src="item.avatar"
                alt=""
                style="width: 180px; height: 180px; object-fit: fill"
              />
              <div class="dashboard-likes-items-description">
                <span class="items-title"
                  >{{ item.productName }}/{{ item.title }}</span
                >
                <span class="items-description">{{ item.description }}</span>
                <span class="items-number">{{ item.stock }}</span>
              </div>
            </el-col>
          </el-button>
        </el-row>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="公告">
    <div
      class="announcement-details"
      v-for="(data, index) in listAnnouncementData"
      :key="index"
    >
      <div class="announcement-detail">
        <div class="announcement-detail-title">
          {{ index + 1 }}、{{ data.title }}
        </div>
        <div class="announcement-detail-content">{{ data.content }}</div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭窗口</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {
  Star,
  DocumentChecked,
  SoldOut,
  Search,
  ShoppingBag,
} from "@element-plus/icons-vue";
import { onMounted, onUpdated, ref, watch } from "vue";
import VDashboardHeader from "../components/DashboardHeader.vue";
import { listProductAllAPI } from "../api/product";
import {
  listProductSkusSearchIPageAPI,
  listProductSkusLimitAPI,
  listProductSkusLimitByNumberAPI,
} from "../api/product-skus";
import {
  listFrontShowRotationAPI,
  listFrontShowOldAPI,
  listFrontShowNewAPI,
} from "../api/front-show";
import { listAnnouncementAPI } from "../api/announcement";

import router from "../router";
const listProductData = ref([{}]);
const listProductSkusData = ref();
const listLikesData = ref();
const listRotationsData = ref();
const listAnnouncementData = ref();
const announcement = ref();
const listAnnouncementIndex = ref(0);

const showAnimation = ref(true);

const dialogFormVisible = ref(false);

const getProductInfo = () => {
  listProductAllAPI().then((res) => {
    for (let i = 0; i < res.data.length; ) {
      listProductData.value[i] = res.data[i++].title;
    }
  });
};
const getProductSkusInfo = () => {
  listProductSkusLimitAPI().then((res) => {
    listProductSkusData.value = res.data;
  });
};

const getLikes = () => {
  let tempForm = {
    number: 30,
  };
  listProductSkusLimitByNumberAPI(tempForm).then((res) => {
    listLikesData.value = res.data;
  });
};

const getRotation = () => {
  listFrontShowRotationAPI().then((res) => {
    listRotationsData.value = res.data;
  });
};

const getAnnouncement = () => {
  listAnnouncementAPI().then((res) => {
    listAnnouncementData.value = res.data;
    console.log("listAnnouncementData.value:", listAnnouncementData.value);
  });
};

const handleOpenAnnouncement = () => {
  dialogFormVisible.value = true;
};

const linkToProductSkus = () => {
  router.push("/products");
};

const enter = (el, done) => {
  announcement.value =
    listAnnouncementData.value[listAnnouncementIndex.value++].content;
  if (listAnnouncementIndex.value >= listAnnouncementData.value.length) {
    listAnnouncementIndex.value = 0;
  }
};

watch(
  (showAnimation,
  () => {
    if (showAnimation.value == false) {
      setTimeout(() => {
        showAnimation.value = true;
      }, 100);
    }
  })
);

setInterval(function () {
  showAnimation.value = false;
}, 2000);

getProductInfo();
getProductSkusInfo();
getLikes();
getRotation();
getAnnouncement();
</script>
<style scoped>
.el-col-24 {
  margin: 6px;
  border: 1px solid #dcdfe6;
  padding: 10px;
  color: #303133;
  font-size: 14px;
  border-radius: 5px;
}
.common-consumables {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  justify-content: center;
  align-content: center;
  margin-top: 10px;
}
.common-consumables .el-col-24 {
  width: 60px;
}
span,
a {
  color: #727272;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
  padding: 0px;
}
h3,
h4 {
  text-align: center;
  margin: 0px;
}
img {
  height: fit-content;
  width: fit-content;
}
.dashboard {
  display: flex;
  flex-direction: column;
  width: 1190px !important;
  margin: auto;
}
.dashboard-content {
  display: grid;
  grid-template-columns: 20% 44% auto;
  background-color: white;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding-bottom: 50px;
}
.dashboard-content-left {
  display: grid;
  grid-template-rows: 10% auto 10%;
}
.dashboard-content-left,
.dashboard-content-right,
.dashboard-content-center {
  margin: 20px;
  border-radius: 15px;
}
.el-carousel--horizontal {
  border-radius: 15px;
}
.dashboard-content-right {
  display: grid;
  grid-template-rows: auto auto;
  background-color: whitesmoke;
}
.dashboard-user-avatar {
  margin: auto;
}
.dashboard-user-notice,
.dashboard-user-button {
  margin: 5px;
}
.dashboard-user-notice {
  display: grid;
  grid-template-columns: 20% 80%;
}
.dashboard-user-button {
  display: grid;
  grid-template-columns: auto auto auto;
}
.link-info {
  margin: auto;
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  align-items: center;
  font-size: x-large;
}
.link-text {
  font-size: 18px;
  margin: 5px;
  color: rgb(94, 90, 90);
}
.notice-title {
  margin-right: 10px;
  margin-left: 20px;
  font-family: tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif !important;
  font-size: large;
  color: black;
}
.notice-content {
  height: fit-content;
  position: relative;
  overflow: hidden;
}
.notice-content div {
  width: fit-content;
  max-width: 200px;
}

.notice-content-enter-active {
  animation-name: test1;
  animation-duration: 1s;
  /* animation-iteration-count: infinite; */
}
@keyframes test1 {
  0% {
    left: 160px;
    animation-timing-function: ease;
  }
  100% {
    left: 0px;
    animation-timing-function: step-end;
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.dashboard-likes {
  background-color: white;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.dashboard-likes-title {
  padding: 20px;
  font-size: x-large;
  color: black;
}
.dashboard-likes-items {
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  justify-items: center;
}
:deep().el-col {
  display: flex;
}
.dashboard-likes-items-description {
  display: grid;
  grid-template-rows: 20% 60% 20%;
  align-content: space-between;
  width: 150px;
  margin-left: 10px;
}
.items-title,
.items-description,
.items-number {
  text-align: start;
}

.items-title {
  font-size: x-large;
}
.items-description {
  font-size: large;
}
.announcement-detail {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
.announcement-detail-title {
  font-size: x-large;
  margin-right: 10px;
  width: 100px;
}
.announcement-detail-content {
  font-size: large;
}
</style>