<template>
  <div class="info">
    <div>
      <h2 class="info-title">个人信息</h2>
    </div>
    <hr />
    <div class="info-content">
      <div class="info-table">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="电子邮件" prop="email">
            <el-input v-model="ruleForm.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="region">
            <el-select v-model="ruleForm.region" placeholder="" disabled>
              <el-option label="男" value="shanghai"></el-option>
              <el-option label="女" value="beijing"></el-option>
              <el-option label="不设置" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  v-model="ruleForm.date1"
                  type="date"
                  placeholder=""
                  style="width: 100%"
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="ID" prop="id">
            <el-input v-model="ruleForm.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="desc">
            <el-input
              v-model="ruleForm.desc"
              type="textarea"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpdate">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-upload
        :on-change="handleChange"
        :limit="1"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        class="info-avatar"
        action=""
        ref="uploadRef"
        :auto-upload="false"
      >
        <el-avatar :size="200" :src="userAvatar"></el-avatar>
        <template #trigger>
          <el-button>修改头像</el-button>
        </template>
      </el-upload>
    </div>
  </div>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";
// More info see https://github.com/element-plus/element-plus/blob/dev/docs/examples/form/utils.ts
import { resetForm, submitForm } from "../../utils/index";
import storage from "../../utils/storage";
import store from "../../store";
import { ElMessage, ElNotification, ElMessageBox } from "element-plus";
import { updateUserAvatarAPI } from "../../api/user";

const userAvatar = ref();

const uploadRef = ref();

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
const handleChange = (file, fileLists) => {
  console.log("file:", file);
  console.log("fileLists:", fileLists);
  // 本地服务器路径
  console.log(URL.createObjectURL(file.raw));
  userAvatar.value = URL.createObjectURL(file.raw);
  // 本地电脑路径
  console.log(document.getElementsByClassName("el-upload__input")[0].value);

  if (fileLists && fileLists.length >= 2) {
    fileLists.shift();
  }
};

const handleExceed = () => {
  ElMessage({
    type: "warning",
    message: "仅支持上传一张照片，请先删除原有照片",
  });
};

const handleRemove = (file, fileLists) => {
  file = "";
  fileLists = [];
  ElNotification({
    type: "success",
    title: "删除成功",
  });
  userAvatar.value = "";
};

const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入名称",
      trigger: "blur",
    },
  ],
});
const init = () => {
  ruleForm.name = storage.get("USER_NAME");
  userAvatar.value = storage.get("USER_AVATAR");
};

const handleUpdate = () => {
  let tempInfo = {
    userAvatar: userAvatar.value,
    id: storage.get("USER_ID"),
  };
  ElMessageBox.confirm("是否确认修改信息", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    updateUserAvatarAPI(tempInfo).then((res) => {
      console.log("ressssssssss", res);
      let tempOneInfo = { id: res.data.id };
      ElMessage({
        type: "success",
        message: "修改用户信息成功",
      });
    });
  });
};

init();

const submitUpload = () => {
  uploadRef.value.submit();
};
</script>
<style scoped>
hr {
  width: 1004px;
}

.info {
  margin: 25px;
}
.info-title {
  font-weight: 500;
}
.info-content {
  display: grid;
  grid-template-columns: auto auto;
}
.info-table {
  min-width: 760px;
}
:deep().el-form-item__label {
  width: 80px !important;
}
:deep().el-input__inner,
:deep().el-textarea__inner {
  width: 450px;
}
:deep().el-button--primary {
  position: absolute;
  right: 250px;
}
.info-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info-avatar :deep().el-button {
  width: 100px;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>