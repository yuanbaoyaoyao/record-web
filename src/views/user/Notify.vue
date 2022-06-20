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

      <div class="notifyList-content">
        <el-table
          :data="notifyList"
          style="width: 100%; max-width: 1025px"
          height="450"
        >
          <el-table-column label="" width="80">
            <template #default="scope">
              <el-badge is-dot v-if="scope.row.isRead == false">
                <el-icon
                  ><Mic v-if="scope.row.type == '公告消息'" /><warning
                    v-if="scope.row.type == '反馈消息'" />
                  <document-copy v-if="scope.row.type == '订单消息'"
                /></el-icon>
              </el-badge>
              <el-icon v-else
                ><Mic v-if="scope.row.type == '公告消息'" /><warning
                  v-if="scope.row.type == '反馈消息'" />
                <document-copy v-if="scope.row.type == '订单消息'"
              /></el-icon> </template
          ></el-table-column>
          <el-table-column label="提醒类别" prop="type" width="100" />
          <el-table-column label="是否已读" prop="readOrNot" width="100" />
          <el-table-column label="提醒内容" prop="detail" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                v-if="scope.row.type != '公告消息'"
                size="small"
                @click="handleDetail(scope.$index, scope.row)"
                >查看详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="notifyList-bottom">
        <el-button
          type="info"
          v-if="selectedNotifyType == 1"
          @click="handleUpdateAll"
        >
          一键已读订单反馈信息
        </el-button>
        <el-button
          type="danger"
          v-if="selectedNotifyType == 1"
          @click="handleDeleteAll"
          >一键清理订单反馈消息</el-button
        >
        <el-button
          type="info"
          v-if="selectedNotifyType == 2"
          @click="handleUpdateAll"
        >
          一键已读订单信息
        </el-button>
        <el-button
          type="danger"
          v-if="selectedNotifyType == 2"
          @click="handleDeleteAll"
          >一键清理订单消息</el-button
        >
        <el-button
          type="info"
          v-if="selectedNotifyType == 3"
          @click="handleUpdateAll"
        >
          一键已读反馈信息
        </el-button>
        <el-button
          type="danger"
          v-if="selectedNotifyType == 3"
          @click="handleDeleteAll"
          >一键清理反馈消息</el-button
        >
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
import router from "../../router";
import { ElNotification } from "element-plus";
const notifyList = ref([]);
const notifyListToUpdate = ref([]);
const selectedNotifyType = ref(1);

const handleGetAllReminders = () => {
  getReminders();
  selectedNotifyType.value = 1;
};
const handleGetOrderReminders = () => {
  console.log("调用了handleGetOrderReminders");
  selectedNotifyType.value = 2;
  notifyList.value = [];
  notifyListToUpdate.value = [];

  let tempForm = {
    userId: storage.get("USER_ID"),
  };
  listUserReminderAPI(tempForm).then((res) => {
    for (let data of res.data) {
      if (data.orderProductId != null) {
        notifyListToUpdate.value.push(data);
        if (data.isRead == false) {
          data.readOrNot = "未读";
        } else {
          data.readOrNot = "已读";
        }
        data.type = "订单消息";
        data.detail = "订单号：" + data.orderSn + " 有新的提醒";
        notifyList.value.push(data);
      } else {
        continue;
      }
    }
  });
  console.log("notifyList.data:", notifyList.value);
};
const handleGetFeedbackReminders = () => {
  console.log("调用了handleGetFeedbackReminders");
  selectedNotifyType.value = 3;
  notifyList.value = [];
  notifyListToUpdate.value = [];

  let tempForm = {
    userId: storage.get("USER_ID"),
  };
  listUserReminderAPI(tempForm).then((res) => {
    for (let data of res.data) {
      if (data.orderProductId != null) {
        continue;
      } else {
        notifyListToUpdate.value.push(data);
        if (data.isRead == false) {
          data.readOrNot = "未读";
        } else {
          data.readOrNot = "已读";
        }
        data.type = "反馈消息";
        data.detail = "反馈：" + data.feedbackTitle + " 有新的提醒";
        notifyList.value.push(data);
      }
    }
  });
  console.log("notifyList.data:", notifyList.value);
};
const hancleGetAnnouncements = () => {
  selectedNotifyType.value = 4;
  notifyList.value = [];
  notifyListToUpdate.value = [];

  listAnnouncementAPI().then((response) => {
    for (let data of response.data) {
      data.announcementId = data.id;
      data.type = "公告消息";
      data.detail = data.title + ": " + data.content;
      notifyList.value.push(data);
    }
  });
};

const getReminders = () => {
  notifyList.value = [];
  notifyListToUpdate.value = [];
  let tempForm = {
    userId: storage.get("USER_ID"),
  };
  listUserReminderAPI(tempForm).then((res) => {
    for (let data of res.data) {
      notifyListToUpdate.value.push(data);
      if (data.isRead == false) {
        data.readOrNot = "未读";
      } else {
        data.readOrNot = "已读";
      }
      if (data.orderProductId != null) {
        data.type = "订单消息";
        data.detail = "订单号：" + data.orderSn + " 有新的提醒";
      } else {
        data.type = "反馈消息";
        data.detail = "反馈：" + data.feedbackTitle + " 有新的提醒";
      }
    }
    notifyList.value = res.data;
    console.log("notifyListToUpdate.value:", notifyListToUpdate.value);

    listAnnouncementAPI().then((response) => {
      for (let data of response.data) {
        data.announcementId = data.id;
        data.type = "公告消息";
        data.detail = data.title + ": " + data.content;
        notifyList.value.push(data);
      }
    });
  });
};

const handleUpdateAll = () => {
  updateUserReminderListAPI(notifyListToUpdate.value).then((res) => {
    ElNotification({
      type: "success",
      title: "一键已读成功",
    });
  });
  if (selectedNotifyType.value == 1) {
    getReminders();
  } else if (selectedNotifyType.value == 2) {
    handleGetOrderReminders();
  } else {
    handleGetFeedbackReminders();
    console.log("notifyList.value:", notifyList.value);
  }
};

const handleDeleteAll = () => {
  deleteUserReminderListAPI(notifyListToUpdate.value).then((res) => {
    ElNotification({
      type: "success",
      title: "一键删除成功",
    });
  });
  if (selectedNotifyType.value == 1) {
    getReminders();
  } else if (selectedNotifyType.value == 2) {
    handleGetOrderReminders();
  } else {
    handleGetFeedbackReminders();
  }
};

const handleDetail = (index, row) => {
  updateUserReminderAPI(row).then((res) => {
    if (row.userFeedbackId != null) {
      router.push("/feedback");
    } else if (row.orderProductId != null) {
      router.push("/orders");
    }
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
.cell .el-icon > svg {
  font-size: xx-large;
}
.notifyList-content {
  margin-top: 10px;
}
.notifyList-bottom {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
:deep().el-badge__content.is-fixed.is-dot {
  top: 4px;
  right: -8px;
}
</style>