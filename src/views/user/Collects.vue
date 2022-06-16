<template>
  <div class="collect">
    <div>
      <h2 class="collect-title">我的收藏</h2>
    </div>
    <hr />
    <div class="collect-content">
      <div
        v-for="(item, index) in listUserCollect"
        :key="index"
        class="collect-content-detail"
      >
        <el-card shadow="never">
          <router-link to="/productDetail" @click="handleDetail(item)">
            <span>{{ item.productName }}</span>
            <div style="padding: 14px">
              <el-image
                style="width: 100px; height: 100px"
                :src="item.avatar"
              ></el-image>
            </div>
          </router-link>
          <el-button type="danger" @click="handleDelete(item)">删除</el-button>
        </el-card>
      </div>
    </div>
    <div class="collect-content-none" v-if="listUserCollect.length == 0">暂无数据</div>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="defaultList.pageNum"
        :page-size="defaultList.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import {
  listUserCollectAPI,
  deleteUserCollectAPI,
} from "../../api/user-collect";
import { listProductSkusSearchIPageAPI } from "../../api/product-skus";
import store from "../../store";
import storage from "../../utils/storage";
import { ElMessage, ElMessageBox } from "element-plus";
const listUserCollectTemp = ref();
const listUserCollect = ref([]);
const userId = computed(() => {
  if (store.getters.userId != "") {
    return store.getters.userId;
  } else {
    return storage.get("USER_ID");
  }
});
const defaultList = ref({
  pageNum: 1,
  pageSize: 5,
  userId: null,
});
const defaultListTemp = ref({
  id: null,
});

const handleSizeChange = (val) => {
  defaultList.value.pageNum = 1;
  defaultList.value.pageSize = val;
  getList();
};

const handleDetail = (item) => {
  console.log("itemmmmmmmmmmmmmmmm:", item);
  store.commit("SET_PRODUCT_ID", item.productId);
  store.commit("SET_PRODUCT_SKUS_ID", item.id);
  store.commit("SET_PRODUCT_TITLE", item.productName);
  store.commit("SET_PRODUCT_SKUS_TITLE", item.title);
  store.commit("SET_PRODUCT_SKUS_INFO", item.description);
  store.commit("SET_PRODUCT_SKUS_STOCK", item.stock);
  store.commit("SET_PRODUCT_SKUS_AVATAR", item.avatar);
};

const handleDelete = (item) => {
  ElMessageBox.confirm("是否确认删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    deleteUserCollectAPI(item).then((res) => {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      listUserCollect.value = [];
      getListUserCollect();
    });
  });
};

const getListUserCollect = () => {
  defaultList.value.userId = userId.value;
  listUserCollectAPI(defaultList.value).then((res) => {
    listUserCollectTemp.value = res.data.records;
    let count = 0;
    for (let i = 0; i < listUserCollectTemp.value.length; i++) {
      defaultListTemp.value.id = listUserCollectTemp.value[i].productSkusId;
      listProductSkusSearchIPageAPI(defaultListTemp.value).then((res) => {
        if (res.data.records.length != 0) {
          listUserCollect.value.push(res.data.records[0]);
          listUserCollect.value[count].id = listUserCollectTemp.value[i].id;
          count++;
        }
      });
    }
  });
};
getListUserCollect();
</script>
<style scoped>
a {
  text-decoration: none;
  color: #727272;
}
hr {
  width: 1004px;
}
.el-card {
  border: transparent !important;
  /* margin-left: 40px; */
}
:deep().el-button {
  transition-property: opacity;
  transition-duration: 1s;
  opacity: 0;
}
.collect-content-detail:hover :deep().el-button {
  transition-property: opacity;
  transition-duration: 1s;
  opacity: 1;
}
.collect-content {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  justify-items: center;
  align-items: center;
}
:deep().el-card__body {
  display: grid;
  grid-template-rows: auto auto auto;
  justify-content: center;
  align-content: center;
}
.collect-content-none{
    font-size: xx-large;
}
.collect {
  margin: 25px;
}
.collect-title {
  font-weight: 500;
}
.collect-table {
  min-width: 760px;
}
</style>