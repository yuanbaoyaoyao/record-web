<template>
  <div class="login">
    <div class="login-logo">
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
    <div class="login-title">
      欢迎登录 耗材管理系统
      <!-- <span>耗材管理系统</span> -->
    </div>
    <div class="login-form">
      <el-form
        ref="formRef"
        status-icon
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="用户名/邮箱" prop="username">
          <el-input v-model="form.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            @keyup.enter="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            @click="handleLogin(formRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="login-bottom">
      <el-button @click="handleToForgetPassword"> 忘记密码 </el-button>
      <el-button @click="handleToRegister"> 还没有账号？立即注册 </el-button>
    </div>
    <div class="login-ways">
      <span> 其他登录方式 </span>
      <div class="login-ways-icon">
        <el-button type="text" @click="handleLoginByDingding">
          <img src="../assets/dingding.png" alt="" style="height: 35px" />
        </el-button>
        <el-button type="text" @click="handleLoginByQQ">
          <i class="fa-brands fa-qq fa-2x fa-fw"></i>
        </el-button>
        <el-button type="text" @click="handleLoginByWeChat">
          <i class="fa-brands fa-weixin fa-2x fa-fw"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import store from "../store";
import { ElMessage } from "element-plus";

const loading = ref(false);
const formRef = ref();

const validateUserName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入用户名/邮箱"));
  }
  callback();
};

const validatePassWord = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  }
  callback();
};

const handleLoginByDingding = () => {
  ElMessage({
    message: "暂不支持钉钉登录",
    type: "info",
  });
};
const handleLoginByQQ = () => {
  ElMessage({
    message: "暂不支持QQ登录",
    type: "info",
  });
};
const handleLoginByWeChat = () => {
  ElMessage({
    message: "暂不支持微信登录",
    type: "info",
  });
};

const rules = reactive({
  username: [{ validator: validateUserName, trigger: "blur" }],
  password: [{ validator: validatePassWord, trigger: "blur" }],
});
// do not use same name with ref
const form = reactive({
  username: "",
  password: "",
});

const router = useRouter();

const handleLogin = (formName) => {
  formName.validate((valid, fields) => {
    if (valid) {
      if (!loading.value) {
        loading.value = true;
        store
          .dispatch("LoginByUsername", form)
          .then(() => {
            loading.value = false;
            router.push({ path: "/" });
          })
          .catch((res) => {
            loading.value = false;
          });
      } else {
        return false;
      }
    } else {
    }
  });
};

const handleToRegister = () => {
  router.push({ path: "/register" });
};

const handleToForgetPassword = () => {
  router.push({ path: "/forgetPassword" });
};
</script>

<style scoped>
.login-title {
  font-size: x-large;
  font-family: serif;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
}
.login-logo {
  padding-top: 30px;
  padding-bottom: 15px;
}
.login-title {
  padding: 20px;
}
.login-form {
  width: 400px;
  border: 1px solid hsl(210deg 18% 87%);
  border-radius: 6px;
}
:deep().el-button {
  width: 368px;
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
}
:deep().el-form {
  padding: 16px;
  background-color: #ecf0f38c;
}
.login-bottom {
  width: 400px;
  display: flex;
  justify-content: space-between;
}
.login-bottom button {
  width: fit-content;
  padding: 0;
  min-height: fit-content;
  background-color: #f5f5f5;
  border: none;
  margin-top: 10px;
}
.login-ways {
  display: flex;
  flex-direction: column;
  margin: 30px;
}
.login-ways span {
  text-align: center;
  margin: 30px 0px 20px 0px;
}
.login-ways-icon {
  width: 400px;
  display: grid;
  grid-template-columns: 28% 35% 33%;
  justify-items: center;
  align-items: center;
}
.login-ways-icon button {
  padding: 0;
  width: 0;
  color: black;
}
</style>