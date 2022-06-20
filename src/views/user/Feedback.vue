<template>
  <div class="feedback">
    <div class="feedback-head">
      <h2 class="feedback-title">我的反馈</h2>
      <el-button type="text" @click="handleAddFeedback">新增反馈</el-button>
    </div>
    <hr />
    <div class="feedback-contents">
      <div v-for="(data, index) in defaultFeedbackData" :key="index">
        <div class="feedback-content">
          <div class="feedback-info">
            <div class="feedback-info-title">
              <span>{{ data.feedbackTitle }}</span>
            </div>
            <div class="feedback-info-content">
              <span>时间:{{ data.createdAt }}</span>
              <span style="margin-left: 10px; margin-right: 10px">|</span>
              <span v-if="data.isFinished == 0">状态：进行中</span>
              <span v-else>状态：已结束</span>
            </div>
          </div>
          <div class="feedback-pic">
            <el-image :src="data.feedbackPicUrl"></el-image>
            <span>{{ data.feedbackContent }}</span>
            <el-button plain @click="handleGetFeedback(data)"
              >查看详情</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogAddFeedbackFormVisible" title="新建反馈单">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item label="反馈标题" prop="desc">
        <el-input v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="反馈内容" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" prop="desc">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :on-error="handleUploadError"
          :on-remove="handleUploadRemove"
          :on-success="handleUploadSuccess"
          :auto-upload="true"
        >
          <el-button type="primary">select file</el-button>

          <template #tip>
            <div class="el-upload__tip text-red">只能上传一张照片</div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogAddFeedbackFormVisible = false"
          >取消</el-button
        >
        <el-button type="primary" @click="dialogAddFeedbackFormVisible = false"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>

  <div class="dialog">
    <el-dialog v-model="dialogGetFeedbackFormVisible" title="我的反馈">
      <div>
        <el-form :model="defaultGetFeedbackForm">
          <el-form-item label="反馈标题">
            <el-input
              v-model="defaultGetFeedbackForm.feedbackTitle"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <img
              v-if="defaultGetFeedbackForm.feedbackPicUrl"
              :src="defaultGetFeedbackForm.feedbackPicUrl"
              style="width: 240px; height: 240px"
            />
          </el-form-item>
          <el-form-item label="反馈内容">
            <el-input
              v-model="defaultGetFeedbackForm.feedbackContent"
              type="textarea"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <div class="feedback-content-detail">
          <div v-for="detail in defaultFeedbackDetailData" :key="detail">
            <div
              class="feedback-content-detail-user-content"
              v-if="detail.adminUserId == null"
            >
              {{ detail.content }}
            </div>
            <div class="feedback-content-detail-admin-user" v-else>
              <div class="feedback-content-detail-admin-user-content">
                {{ detail.content }}
              </div>
              <div class="feedback-content-detail-admin-user-name">
                :{{ detail.adminUserName }}
              </div>
            </div>
          </div>
        </div>
        <el-form
          class="feedback-send-message"
          v-if="defaultGetFeedbackForm.isFinished != 1"
        >
          <el-input
            v-model="message"
            placeholder="请输入回复信息"
            type="textarea"
          />
          <el-button @click="handleSendMessage()">发送回复</el-button>
        </el-form>

        <el-form class="feedback-send-message" v-else>
          <span class="feedback-send-message-closed">状态：已关闭反馈</span>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="danger"
            @click="handleFinished"
            v-if="defaultGetFeedbackForm.isFinished != 1"
            >结束此次反馈并关闭窗口</el-button
          >
          <el-button @click="dialogGetFeedbackFormVisible = false">关闭窗口</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ElNotification, ElMessageBox, ElMessage } from "element-plus";
import {
  listUserFeedbackAPI,
  createUserFeedbackAPI,
  updateUserFeedbackFinishedAPI,
} from "../../api/user-feedback";
import {
  listUserFeedbackDetailAPI,
  createUserFeedbackDetailAPI,
} from "../../api/user-feedback-detail";
import storage from "../../utils/storage";

const defaultFeedbackData = ref();
const defaultFeedbackDetailData = ref();
const dialogAddFeedbackFormVisible = ref(false);
const dialogGetFeedbackFormVisible = ref(false);

const defaultFeedbackForm = ref({
  userFeedbackId: null,
  content: null,
});
const message = ref(null);

const formSize = ref("");

const ruleFormRef = ref();
const ruleForm = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const defaultGetFeedbackForm = ref({
  id: null,
  feedbackPicUrl: "",
  feedbackTitle: "",
  feedbackContent: "",
});
const getUserFeedbackList = () => {
  let tempForm = {
    userId: storage.get("USER_ID"),
  };
  listUserFeedbackAPI(tempForm).then((res) => {
    defaultFeedbackData.value = res.data.records;
  });
};

const handleAddFeedback = () => {
  dialogAddFeedbackFormVisible.value = true;
};

const handleSendMessage = () => {
  defaultFeedbackForm.value.content = message.value;
  defaultFeedbackForm.value.userFeedbackId = defaultGetFeedbackForm.value.id;
  createUserFeedbackDetailAPI(defaultFeedbackForm.value).then((res) => {
    ElNotification({
      type: "success",
      title: "添加回复成功",
    });
  });
  defaultFeedbackDetailData.value.unshift(defaultFeedbackForm.value);
};

const handleGetFeedback = (data) => {
  defaultGetFeedbackForm.value = data;
  console.log("defaultGetFeedbackForm.value:", defaultGetFeedbackForm.value);

  let tempForm = {
    userFeedbackId: data.id,
  };
  listUserFeedbackDetailAPI(tempForm).then((res) => {
    defaultFeedbackDetailData.value = res.data;
    console.log("defaultFeedbackDetailData:", defaultFeedbackDetailData.value);
  });
  dialogGetFeedbackFormVisible.value = true;
};

const handleFinished = () => {
  ElMessageBox.confirm("是否关闭此次反馈?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      updateUserFeedbackFinishedAPI(defaultGetFeedbackForm.value).then(
        (res) => {
          ElMessage({
            type: "success",
            message: "关闭反馈成功",
          });
          dialogGetFeedbackFormVisible.value = false;
        }
      );
    })
    .catch(() => {});
};

const handleUploadError = (error) => {
  ElNotification({
    type: "error",
    title: "上传失败",
    message: error,
  });
};

const handleUploadRemove = () => {
  ElNotification({
    type: "info",
    title: "移除成功",
  });
};

const handleUploadSuccess = () => {
  ElNotification({
    type: "success",
    title: "上传成功",
  });
};

const rules = reactive({
  name: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "blur",
    },
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
});
getUserFeedbackList();
</script>
<style scoped>
hr {
  width: 1004px;
}
:deep().el-image__inner {
  height: 80px !important;
  width: 80px !important;
}
.feedback {
  margin: 25px;
}
.feedback-head {
  display: flex;
  justify-content: space-between;
}
.feedback-head :deep().el-button {
  padding: 0;
  min-height: 0;
  margin-right: 20px;
  margin-top: 20px;
  font-size: large;
  color: black;
}
.feedback-title {
  font-weight: 500;
}
.feedback-contents {
  height: 500px;
  overflow-y: scroll;
  margin-top: 10px;
}
.feedback-content {
  display: grid;
  grid-template-rows: auto auto;
  border: solid;
  border: 1px solid #cfeeab;
  margin-bottom: 10px;
}
.feedback-info {
  border-bottom: 1px solid #cfeeab;
  padding: 10px 10px;
  padding-left: 30px;
  color: rgb(136, 190, 136);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feedback-info-content {
  color: rgb(94, 88, 88);
}
.feedback-pic {
  display: grid;
  grid-template-columns: 20% auto 20%;
  padding: 10px 10px;
  padding-left: 30px;
  align-items: center;
}
:deep().el-form-item__label {
  width: 80px !important;
}
:deep().el-input__inner,
:deep().el-textarea__inner,
:deep().el-upload-list__item:first-child {
  width: 550px;
}

.dialog :deep().el-dialog {
  width: 1300px;
  height: 560px;
}
.dialog :deep().el-dialog__body {
  background-color: white;
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 20px;
}
.dialog :deep().el-dialog__footer {
  float: right;
}

.dialog :deep().el-table__row .el-input__inner {
  transition: background-color 0.25s ease;
  transition-property: backgraound border;
  transition-duration: 0.25s 0.25s;
  transition-timing-function: ease ease;
  background-color: white;
  border: white;
}
.dialog .feedback-content-detail {
  border: 5px solid red;
  height: 260px;
  margin-bottom: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
}
.dialog .feedback-send-message {
  display: flex;
}
.dialog .feedback-send-message :deep().el-textarea__inner {
  width: 500px;
}
.dialog :deep().el-table__row:hover .el-input__inner {
  transition: background-color 0.25s ease;
  transition-property: backgraound border;
  transition-duration: 0.25s 0.25s;
  transition-timing-function: ease ease;
  border: #f5f7fa;
  background-color: #f5f7fa;
}
.dialog .el-input.is-disabled :deep().el-input__inner,
.el-textarea.is-disabled :deep().el-textarea__inner {
  width: 500px;
}

.tableproductName :deep()span.el-input__suffix {
  margin-right: 45px;
}
.feedback-content-detail-user-content,
.feedback-content-detail-admin-user-content {
  border: 1px solid #333;
  border-radius: 10px;
  padding: 10px;
  width: fit-content;
}
.feedback-content-detail-admin-user {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  /* float: right; */
}
.feedback-content-detail-admin-user-name {
  padding: 10px;
  padding-top: 15px;
  width: 30px;
}

.feedback-content-detail-admin-user-name {
  width: 60px;
}
:deep().el-dialog__footer {
  background-color: white;
  width: 100%;
}
.feedback-send-message-closed {
  font-size: xx-large;
  color: black;
}
</style>