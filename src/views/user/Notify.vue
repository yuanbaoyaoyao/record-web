<template>
  <div class="notify">
    <div>
      <h2 class="notify-title">消息通知</h2>
    </div>
    <hr />
    <div class="notify-select">
      <!-- 使用过滤 -->
      <ul class="notify-select-detail">
        <li>
          <el-button
            type="text"
            @click="handleGetAllReminders"
            :style="{ color: selectedNotifyType == 1 ? '#409eff' : 'black' }"
            >全部消息</el-button
          >
        </li>
        <li>
          <el-button
            type="text"
            @click="handleGetOrderReminders"
            :style="{ color: selectedNotifyType == 2 ? '#409eff' : 'black' }"
            >订单消息</el-button
          >
        </li>
        <li>
          <el-button
            type="text"
            @click="handleGetFeedbackReminders"
            :style="{ color: selectedNotifyType == 3 ? '#409eff' : 'black' }"
            >反馈消息</el-button
          >
        </li>
        <li>
          <el-button
            type="text"
            @click="hancleGetAnnouncements"
            :style="{ color: selectedNotifyType == 4 ? '#409eff' : 'black' }"
            >公告消息</el-button
          >
        </li>
      </ul>
      <div class="notify-content">
        <div v-for="(data, index) in notifyList" :key="index">
          <router-link to="/orders">
            <div
              v-if="
                data.orderProductId &&
                (selectedNotifyType == 1 || selectedNotifyType == 2)
              "
              class="notify-content-detail"
            >
              <el-icon>
                <document-copy />
              </el-icon>
              <div class="notify-order-sn">订单号：{{ data.orderSn }}</div>
              <div>：有新的提醒</div>
            </div>
          </router-link>
          <router-link to="feedback">
            <div
              v-if="
                data.userFeedbackId &&
                (selectedNotifyType == 1 || selectedNotifyType == 3)
              "
              class="notify-content-detail"
            >
              <el-icon>
                <warning />
              </el-icon>
              <div class="notify-feedback-title">
                反馈：{{ data.feedbackTitle }}
              </div>
              <div>：有新的提醒</div>
            </div>
          </router-link>

          <div
            v-if="
              data.announcementId &&
              (selectedNotifyType == 1 || selectedNotifyType == 4)
            "
            class="notify-content-detail"
          >
            <el-icon><Mic /></el-icon>
            <div class="notify-feedback-title">公告：{{ data.title }}</div>
            <div>：{{ data.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import {
  listUserReminderAPI,
  updateUserReminderAPI,
  updateUserReminderListAPI,
  deleteUserReminderAPI,
  deleteUserReminderListAPI,
} from "../../api/user-reminder";
import { listAnnouncementAPI } from "../../api/announcement";
import storage from "../../utils/storage";
import { DocumentCopy, Warning, Mic } from "@element-plus/icons-vue";
const notifyList = ref([]);
const selectedNotifyType = ref(1);

const handleGetAllReminders = () => {
  selectedNotifyType.value = 1;
};
const handleGetOrderReminders = () => {
  selectedNotifyType.value = 2;
};
const handleGetFeedbackReminders = () => {
  selectedNotifyType.value = 3;
};
const hancleGetAnnouncements = () => {
  selectedNotifyType.value = 4;
};

const getReminders = () => {
  let tempForm = {
    userId: storage.get("USER_ID"),
  };
  listUserReminderAPI(tempForm).then((res) => {
    notifyList.value = res.data;
    listAnnouncementAPI().then((res) => {
      for (let data of res.data) {
        data.announcementId = data.id;
        notifyList.value.push(data);
      }
    });
  });
};
getReminders();
</script>
<style scoped>
hr {
  width: 1004px;
}
a {
  text-decoration: none;
  color: black;
}
a:active {
  /* color: #409eff; */
  text-decoration: none;
}
.notify {
  margin: 25px;
}
.notify-title {
  font-weight: 500;
}
.notify-select {
  display: flex;
  flex-direction: column;
}
.notify-select-detail {
  margin: 0;
  margin-left: 10px;
  float: left;
  list-style-type: none;
  display: grid;
  grid-template-columns: auto auto auto auto;
  width: 400px;
  padding: 0px;
}
.notify-select-detail :deep().el-button {
  min-height: 0px !important;
  padding: 0;
  padding-bottom: 10px;
  color: black;
}
.notify-list {
  margin: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: 11% 11% 11% 11%;
  justify-items: center;
  width: 1004px;
  padding: 0px;
}
.notify-list-detail {
  padding: 24px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.notify-list-borderedit {
  border-left: solid 2px;
}
.notify-content {
  display: flex;
  justify-content: start;
  flex-direction: column;
  height: 500px;
  overflow-y: scroll;
  margin-top: 10px;
}
.notify-content-detail {
  display: flex;
  font-size: large;
  padding-bottom: 20px;
  align-items: center;
}
.notify-content-detail:hover {
  color: cornflowerblue;
}
.notify-content-detail .el-icon {
  font-size: xx-large;
  margin-right: 20px;
}
.notify-feedback-title,
.notify-order-sn {
  width: 250px;
}
</style>