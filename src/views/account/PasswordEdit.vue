<template>
  <div class="info">
    <div>
      <h2 class="info-title">修改密码</h2>
    </div>
    <hr />
    <div class="info-content">
      <div class="info-table">
        <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="邮箱" prop="email">
            <div class="register-email-code">
              <el-input v-model="form.email" type="text"></el-input>
              <el-button
                v-if="
                  isShowButton && form.email != '' && form.email != undefined
                "
                @click="handleSendCode"
                >发送验证码</el-button
              >
              <span v-if="!isShowButton && form.email != ''"
                >{{ timeCount }}秒后重新发送</span
              >
            </div>
          </el-form-item>
          <el-form-item label="邮箱验证码" prop="emailCode">
            <el-input v-model="form.emailCode" type="text"> </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              @keyup.enter="handleForget"
            ></el-input>
          </el-form-item>
          <el-form-item class="info-bottom">
            <el-button type="info" @click="resetForm(ruleFormRef)"
              >重置</el-button
            >
            <el-button type="primary" @click="handleForget">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";
// More info see https://github.com/element-plus/element-plus/blob/dev/docs/examples/form/utils.ts
import storage from "../../utils/storage";
import store from "../../store";
import { ElMessage, ElNotification, ElMessageBox } from "element-plus";
import { updateUserAvatarAPI } from "../../api/user";

const ruleFormRef = ref();
const loading = ref(false);
const isShowButton = ref(true);
const timeCount = ref();

const validateEmailCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入邮箱验证码"));
  }
  callback();
};

const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入邮箱"));
  } else {
    if (value != "") {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        callback(new Error("请输入有效的邮箱格式"));
      }
    }
  }
  callback();
};

const validatePassWord = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  }
  callback();
};

const rules = reactive({
  email: [{ validator: validateEmail, trigger: "blur", required: true }],
  emailCode: [
    { validator: validateEmailCode, trigger: "blur", required: true },
  ],
  password: [{ validator: validatePassWord, trigger: "blur", required: true }],
});
// do not use same name with ref
const form = reactive({
  email: "",
  emailCode: "",
  password: "",
});

const handleForget = (formName) => {
  formName.validate((valid, fields) => {
    if (valid) {
      if (!loading.value) {
        loading.value = true;
        console.log("form", form);
        forget(form)
          .then((res) => {
            ElNotification({
              title: "修改密码成功",
              type: "success",
            });
            // router.push({ path: "/login" });
            // console.log("push to /login");
          })
          .catch((res) => {
            console.log("catch:", res);
            loading.value = false;
          });
      } else {
        return false;
      }
    } else {
      console.log("error submit", fields);
    }
  });
};

const handleSendCode = () => {
  console.log("form.email:", form.email);
  validateEmail;
  getEmailCode(form.email).then((res) => {
    ElNotification({
      title: "发送验证码成功",
      message: "有效期5分钟",
      type: "success",
    });
  });

  isShowButton.value = false;
  timeCount.value = 60;
  const count = window.setInterval(function () {
    timeCount.value--;
    console.log("yes:", timeCount.value);
    if (timeCount.value <= 0) {
      window.clearInterval(count);
      isShowButton.value = true;
    }
  }, 1000);
};
const resetForm = (formName) => {
  if (!formName) return;
  formName.resetFields();
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
  width: 100px !important;
}
:deep().el-input__inner,
:deep().el-textarea__inner {
  width: 550px;
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
:deep().register-form-button {
  display: flex;
}
.register-email-code {
  position: relative;
}
.register-email-code button {
  width: fit-content;
  min-height: fit-content;
  position: absolute;
  z-index: 99999 !important;
  right: 260px;
  padding: 0;
  border: none;
  margin-top: 15px;
}
.register-email-code span {
  position: absolute;
  z-index: 99999 !important;
  width: fit-content;
  color: #606266;
  right: 260px;
}
.info-bottom :deep().el-form-item__content{
    display: flex;
    justify-content: end;
    right: 230px;
}
</style>