<template>
  <div class="register">
    <div class="register-logo">
      <a href="#">
        <img
          src="../assets/sysLogo_noFonts.svg"
          style="
            display: block;
            width: 160px;
            height: auto;
            justify-items: center;
          "
        />
      </a>
    </div>
    <div class="register-title">注册账号</div>
    <div class="register-form">
      <el-form
        ref="formRef"
        status-icon
        :rules="rules"
        :model="form"
        label-width="60px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <div class="register-email-code">
            <el-input v-model="form.email" type="text"></el-input>
            <el-button
              v-if="isShowButton && form.email != '' && form.email != undefined"
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
            @keyup.enter="handleRegister"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="register-form-button">
            <el-button :loading="loading" type="info" @click="handleToLogin"
              >已有账号？</el-button
            >
            <el-button
              :loading="loading"
              type="primary"
              @click="handleRegister(formRef)"
              >注册</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import store from "../store";
import { getEmailCode } from "../api/register";
import { ElNotification } from "element-plus";
import { register } from "../api/register";

const loading = ref(false);
const isShowButton = ref(true);
const timeCount = ref();
const formRef = ref()

const validateUserName = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入用户名"));
  }
  callback();
};

const validateEmailCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入邮箱验证码"));
  }
  callback();
};

const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入邮箱"));
    console.log("form.email:", form.email);
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
  name: [{ validator: validateUserName, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
  emailCode: [{ validator: validateEmailCode, trigger: "blur" }],
  password: [{ validator: validatePassWord, trigger: "blur" }],
});
// do not use same name with ref
const form = reactive({
  name: "",
  email: "",
  emailCode: "",
  password: "",
});

const router = useRouter();

const handleRegister = (formName) => {
  formName.validate((valid, fields) => {
    if (valid) {
      if (!loading.value) {
        loading.value = true;
        console.log("form", form);
        register(form)
          .then((res) => {
            ElNotification({
              title: "注册成功",
              content: "请登录账号",
              type: "success",
            });
            router.push({ path: "/login" });
            console.log("push to /login");
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
    console.log("resssssss:", res);
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

const handleToLogin = () => {
  router.push({ path: "/login" });
};
</script>
<style scoped>
.register-title {
  font-size: x-large;
  font-family: serif;
}
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register-logo {
  padding-top: 30px;
  padding-bottom: 15px;
}
.register-title {
  padding: 20px;
}
.register-form {
  width: 400px;
  border: 1px solid hsl(210deg 18% 87%);
  border-radius: 6px;
}
:deep().el-button {
  width: 368px;
  z-index: 9999 !important;
}
:deep().el-form-item {
  display: grid;
  grid-template-rows: auto auto;
}
:deep().el-form-item__content {
  margin-left: 0px !important;
}
:deep().el-form-item__label {
  text-align: left;
  width: 100% !important;
}
:deep().el-form {
  padding: 16px;
  background-color: #ecf0f38c;
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
  right: 25px;
  padding: 0;
  border: none;
  margin-top: 15px;
}
.register-email-code span {
  position: absolute;
  z-index: 99999 !important;
  width: fit-content;
  color: #606266;
  right: 25px;
}
</style>