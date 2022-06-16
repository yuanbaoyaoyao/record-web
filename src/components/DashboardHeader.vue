<template>
  <div class="dashboard-header">
    <div class="dashboard-logo">
      <a href="#">
        <img
          src="../assets/sysLogo.svg"
          style="display: block; width: 110px; height: auto"
        />
      </a>
    </div>
    <div>
      <div class="dashboard-search-top">
        <div class="search-input">
          <el-input
            v-model="input"
            placeholder="耗材类型/型号"
            :prefix-icon="Search"
            clearable
          />
        </div>
        <div class="search-button">
          <el-button type="primary" @click="handleSearch">Search</el-button>
        </div>
      </div>
      <div class="dashboard-search-down">
        <!-- <a
                    :href="item.linkname"
                    target="_blank"
                    v-for="(item,index) in arraySearch"
                    :key="index"
                >{{ item.name }}</a> -->
      </div>
    </div>
    <div class="dashboard-blank"></div>
  </div>
</template>
<script setup>
import {
  Star,
  DocumentChecked,
  Warning,
  Search,
} from "@element-plus/icons-vue";
import { ref } from "vue";
import { elasticsearchAPI } from "../api/elasticsearch";
import router from "../router";
import store from "../store";
import { ElNotification } from "element-plus";
const input = ref("");
const arraySearch = [];
const handleSearch = () => {
  let tempForm = {
    keyword: input.value,
  };
  elasticsearchAPI(tempForm).then((res) => {
    store.commit("SET_PRODUCT_SKUS_SEARCH_LIST", res.data.content);
    store.commit("SET_IS_SEARCH", true);
    router.push("/products");
    ElNotification({
      type: "success",
      title: "全局搜索成功",
    });
  });
};
</script>
<style scoped>
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
.dashboard-header {
  display: grid;
  grid-template-columns: 20% 55% auto;
  justify-items: center;
  margin: 25px;
}
.dashboard-logo {
  margin-right: 40px;
}
.dashboard-search-top {
  display: flex;
}
.search-input {
  width: 300px;
  border-radius: 15px;
}
.search-input :deep() .el-input__inner {
  height: 50px;
}
.search-button > .el-button {
  height: 50px;
}
.dashboard-search-down {
  display: flex;
}
.dashboard-search-down > a {
  margin-left: 5px;
}
</style>