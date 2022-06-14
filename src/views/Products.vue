<template>
  <div>
    <div class="layout-header">
      <v-header />
    </div>
    <div class="products">
      <v-dashboard-header />
      <div class="products-content">
        <div class="products-filter">
          <!-- title动态 -->
          <div class="products-filter-title">耗材类别</div>
          <el-autocomplete
            v-model="searchProductKeyword"
            value-key="title"
            :fetch-suggestions="queryProductSearch"
            :trigger-on-focus="false"
            class="inline-input"
            placeholder="输入耗材类别"
            @select="handleSelect"
            size="small"
          />
          <el-button
            :icon="Search"
            type="primary"
            size="small"
            @click="handleProductSearch"
            >搜索</el-button
          >
          <div class="products-recommendation">
            <span>推荐</span>
            <ul class="products-filter-content">
              <li
                v-for="(item, index) in defaultProductRecommendData.slice(0, 5)"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="productSkus-filter">
          <!-- title动态 -->
          <div class="productSkus-filter-title">耗材型号</div>
          <el-autocomplete
            v-model="searchProductSkusKeyword"
            value-key="title"
            :fetch-suggestions="queryProductSkusSearch"
            :trigger-on-focus="false"
            class="inline-input"
            placeholder="输入耗材型号"
            @select="handleSelect"
            size="small"
          />
          <el-button :icon="Search" type="primary" size="small" @click="handleProductSkusSearch">搜索</el-button>
          <div class="productSkus-recommendation">
            <span>推荐</span>
            <ul class="productSkus-filter-content">
              <li
                v-for="(item, index) in defaultProductSkusRecommendData.slice(
                  0,
                  5
                )"
                :key="index"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
        </div>

        <div v-if="defaultProductSkusData.length > 0">
          <el-row>
            <el-col
              v-for="(item, index) in defaultProductSkusData"
              :key="index"
              :span="4"
              :offset="index > 0 ? 2 : 0"
            >
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <router-link
                  to="/productDetail"
                  :underline="false"
                  @click="handleProductDetail(item)"
                >
                  <el-image
                    style="width: 200px; height: 200px"
                    :src="item.avatar"
                  ></el-image>
                  <span>{{ item.productName }} {{ item.title }}</span>
                </router-link>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="product-skus-none-data" v-else><span> 暂无数据 </span></div>

        <div class="pagination">
          <el-pagination
            v-model:currentPage="defaultList.pageNum"
            :page-sizes="[8, 16]"
            :page-size="defaultList.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import vHeader from "../components/Header.vue";
import {
  Star,
  DocumentChecked,
  Warning,
  Search,
} from "@element-plus/icons-vue";
import { ref } from "vue";
import VDashboardHeader from "../components/DashboardHeader.vue";
import { listProductAllAPI } from "../api/product";
import {
  listProductSkusLimitAPI,
  listProductSkusSearchIPageAPI,
} from "../api/product-skus";
import { ElNotification } from "element-plus";
import store from "../store";
import storage from "../utils/storage";
const defaultList = ref({
  pageNum: 1,
  pageSize: 8,
  keyword1: null,
});
const defaultQuerySearchForm = ref({
  pageNum: 1,
  pageSize: 5,
  productName: null,
  productSkusName: null,
});
const searchProductKeyword = ref(null);
const searchProductSkusKeyword = ref(null);
const defaultProductRecommendData = ref([]);
const defaultProductSkusRecommendData = ref([]);
const defaultProductSkusData = ref([]);
const pageTotal = ref(null);
const handleProductDetail = (item) => {
  store.commit("SET_PRODUCT_SKUS_ID", item.id);
  store.commit("SET_PRODUCT_ID", item.productId);
  store.commit("SET_PRODUCT_TITLE", item.productName);
  store.commit("SET_PRODUCT_SKUS_TITLE", item.title);
  store.commit("SET_PRODUCT_SKUS_INFO", item.description);
  store.commit("SET_PRODUCT_SKUS_STOCK", item.stock);
  store.commit("SET_PRODUCT_SKUS_AVATAR", item.avatar);
};
const handleSelect = (item) => {
  console.log(item);
};
const queryProductSearch = (queryString, cb) => {
  let lists = [];
  let querySearchForm = Object.assign({}, defaultQuerySearchForm.value);
  querySearchForm.pageSize = 8;
  querySearchForm.productName = searchProductKeyword.value;
  listProductAllAPI(querySearchForm).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      lists[i] = res.data[i];
    }
    const results = queryString
      ? lists.filter(createProductFilter(queryString))
      : lists;
    cb(results);
  });
};

const createProductFilter = (queryString) => {
  return (list) => {
    return list.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const queryProductSkusSearch = (queryString, cb) => {
  let lists = [];
  let querySearchForm = Object.assign({}, defaultQuerySearchForm.value);
  querySearchForm.pageSize = pageTotal.value;
  querySearchForm.productSkusName = searchProductSkusKeyword.value;
  listProductSkusSearchIPageAPI(querySearchForm).then((res) => {
    console.log("ressssssssssssssssssssssssssssssssss:", res);
    for (let i = 0; i < res.data.records.length; i++) {
      lists[i] = res.data.records[i];
    }
    const results = queryString
      ? lists.filter(createProductSkusFilter(queryString))
      : lists;
    cb(results);
  });
};

const createProductSkusFilter = (queryString) => {
  return (list) => {
    return list.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};

const handleSizeChange = (val) => {
  defaultList.value.pageNum = 1;
  defaultList.value.pageSize = val;
  getProductSkusInfo();
};
const handleCurrentChange = (val) => {
  defaultList.value.pageNum = val;
  getProductSkusInfo();
};
const getProductInfo = () => {
  listProductAllAPI().then((res) => {
    for (let i = 0; i < res.data.length; ) {
      defaultProductRecommendData.value[i] = res.data[i++].title;
    }
  });
};
const getProductSkusInfo = () => {
  listProductSkusSearchIPageAPI().then((res) => {
    defaultProductSkusRecommendData.value = res.data.records;
    defaultProductSkusData.value = res.data.records;
    pageTotal.value = res.data.total;
  });
};

const handleProductSearch = () => {
  let querySearchForm = Object.assign({}, defaultQuerySearchForm.value);
  querySearchForm.pageSize = pageTotal.value;
  querySearchForm.productName = searchProductKeyword.value;
  listProductSkusSearchIPageAPI(querySearchForm).then((res) => {
    defaultProductSkusData.value = res.data.records;
    ElNotification({
      type: "success",
      title: "查询耗材类别成功",
    });
  });
};
const handleProductSkusSearch = () => {
  let querySearchForm = Object.assign({}, defaultQuerySearchForm.value);
  querySearchForm.pageSize = pageTotal.value;
  querySearchForm.productSkusName = searchProductSkusKeyword.value;
  listProductSkusSearchIPageAPI(querySearchForm).then((res) => {
    defaultProductSkusData.value = res.data.records;
    ElNotification({
      type: "success",
      title: "查询耗材型号成功",
    });
  });
};
getProductInfo();
getProductSkusInfo();
</script>
<style scoped>
.layout-header {
  margin-bottom: 30px;
}
.pagination {
  display: flex;
  justify-content: center;
}
.products-recommendation,
.productSkus-recommendation {
  display: grid;
  grid-template-columns: 5% auto;
  margin-left: 20px;
}
.products-recommendation > span,
.productSkus-recommendation > span {
  margin-top: 10px;
}
.products-filter-content,
.productSkus-filter-content {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  margin: 0;
  padding: 10px;
  color: #727272;
  align-items: center;
}
:deep().el-input--small .el-input__inner {
  margin-top: 5px;
}
.products-filter button.el-button.el-button--primary.el-button--small,
.productSkus-filter button.el-button.el-button--primary.el-button--small {
  height: 20px;
  margin-top: 5px;
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
:deep().el-card {
  transition-property: transform;
  transition-duration: 0.5s;
  animation: cardShadow 0.5s;
  animation-fill-mode: forwards;
}
:deep().el-card:hover {
  transition-property: transform;
  transition-duration: 0.5s;
  transform: translateY(-2px);
  animation: cardShadow_hover 0.5s;
  animation-fill-mode: forwards;
}
@keyframes cardShadow_hover {
  from {
    box-shadow: 0px 0px 0px 0px rgb(252, 249, 249);
  }
  to {
    box-shadow: 0px 0px 5px 2px rgb(161, 159, 159);
  }
}
@keyframes cardShadow {
  from {
    box-shadow: 0px 0px 5px 2px rgb(161, 159, 159);
  }
  to {
    box-shadow: 0px 0px 0px 0px rgb(252, 249, 249);
  }
}

:deep() td {
  display: flex;
}
:deep().el-card__body {
  width: 200px;
}
.el-row {
  display: grid !important;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto auto auto auto;
  justify-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
:deep().el-col-offset-2 {
  margin-left: 0;
}
:deep().el-col-4 {
  max-width: 100%;
}

.products {
  display: flex;
  flex-direction: column;
  width: 1190px !important;
  margin: auto;
}

.products-filter {
  display: grid;
  grid-template-columns: 7.5% 16% 6% auto;
  border: solid 1px #e8e8e8;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.productSkus-filter {
  display: grid;
  grid-template-columns: 7.5% 16% 6% auto;
  border: solid 1px #e8e8e8;
}
.products-filter-title,
.productSkus-filter-title {
  border-right: solid 1px #e8e8e8;
  padding: 10px;
  font-family: "Courier New", Courier, monospace;
  font-weight: 900;
  color: #727272;
}
.products-content {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
}
.product-skus-none-data span {
  display: flex;
  justify-content: center;
  font-size: x-large;
  margin: 30px;
}
</style>