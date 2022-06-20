<template>
  <div class="order">
    <div>
      <h2 class="order-title">我的订单</h2>
    </div>
    <hr />
    <div class="order-select">
      <div>
        <ul class="order-select-detail">
          <li>
            <el-button
              type="text"
              @click="getList()"
              :style="{ color: selectedOrderType == 0 ? '#409eff' : 'black' }"
              >全部订单</el-button
            >
          </li>
          <li>
            <el-button
              type="text"
              @click="getReceivedList()"
              :style="{ color: selectedOrderType == 1 ? '#409eff' : 'black' }"
              >待收货</el-button
            >
          </li>
          <li>
            <el-button
              type="text"
              @click="getEvaluatedList()"
              :style="{ color: selectedOrderType == 2 ? '#409eff' : 'black' }"
              >待评价</el-button
            >
          </li>
        </ul>
      </div>
      <div class="order-select-search">
        <el-input v-model="search" size="small" placeholder="请输入订单号" />
        <el-button size="small" type="primary" @click="handleSearch"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="order-list">
      <el-table
        :data="tableDataTemp"
        style="width: 100%"
        v-if="selectedOrderType == 0"
      >
        <el-table-column label="时间" prop="createdAt" />
        <el-table-column label="订单号" prop="orderSn" />
        <el-table-column label="订单状态" prop="orderStatus" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleUpdate(scope.$index, scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :data="tableDataTemp"
        style="width: 100%"
        v-if="selectedOrderType == 1"
      >
        <el-table-column label="时间" prop="createdAt"></el-table-column>
        <el-table-column label="订单号" prop="orderSn" />
        <el-table-column label="订单状态" prop="orderStatus" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleUpdate(scope.$index, scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :data="tableDataTemp"
        style="width: 100%"
        v-if="selectedOrderType == 2"
      >
        <el-table-column label="时间" prop="createdAt"></el-table-column>
        <el-table-column label="订单号" prop="orderSn" />
        <el-table-column label="订单状态" prop="orderStatus" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleUpdate(scope.$index, scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          hide-on-single-page
          v-model:currentPage="defaultForm.pageNum"
          :page-size="defaultForm.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pageTotal"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogFormVisible" title="查看订单详情">
    <div class="content-info-detail">
      <div class="content-info-detail-part">
        <span class="table-head">
          <el-icon> <info-filled /> </el-icon>基本信息
        </span>
        <div>
          <el-row class="table-row">
            <el-col class="table-title" :span="6">订单号</el-col>
            <el-col class="table-title" :span="18">订单留言</el-col>
          </el-row>
          <el-row>
            <el-col class="table-detail" :span="6">{{
              userOrderViewInfo.orderSn
            }}</el-col>
            <el-col
              class="table-detail"
              :span="18"
              v-if="userOrderViewInfo.orderRemarks != null"
              >{{ userOrderViewInfo.orderRemarks }}</el-col
            >
            <el-col class="table-detail" :span="18" v-else>无留言</el-col>
          </el-row>
        </div>
      </div>
      <div class="content-info-detail-part">
        <span class="table-head">
          <el-icon> <info-filled /> </el-icon>领用人信息
        </span>
        <el-row class="table-row">
          <el-col class="table-title" :span="6">领用人</el-col>
          <el-col class="table-title" :span="6">使用人</el-col>
          <el-col class="table-title" :span="12">收货地址</el-col>
        </el-row>
        <el-row>
          <el-col class="table-detail" :span="6">{{
            userOrderViewInfo.receiver
          }}</el-col>
          <el-col class="table-detail" :span="6">{{
            userOrderViewInfo.user
          }}</el-col>
          <el-col class="table-detail" :span="12">{{
            userOrderViewInfo.addressDetail
          }}</el-col>
        </el-row>
      </div>
      <div class="content-info-detail-part">
        <span class="table-head">
          <el-icon> <info-filled /> </el-icon>耗材信息
        </span>
        <el-table
          class="table-row"
          ref="multipleTable"
          :data="userOrderProductInfo"
          height="200"
        >
          <el-table-column label="耗材类别">
            <template v-slot="scope">
              <p>{{ scope.row.productTitle }}</p>
            </template>
          </el-table-column>
          <el-table-column label="耗材型号">
            <template v-slot="scope">
              <p>{{ scope.row.productSkusTitle }}</p>
            </template>
          </el-table-column>
          <el-table-column label="耗材数量">
            <template v-slot="scope">
              <p>{{ scope.row.number }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- <template #footer> -->
      <div class="dialog-footer">
        <template v-if="tableDetail && tableDetail.orderStatus == '审核中'">
          <el-button type="danger" @click="updateDataCancel(tableDetail)"
            >取消订单</el-button
          >
        </template>
        <el-button type="info" @click="dialogFormVisible = false"
          >取消</el-button
        >
        <template v-if="tableDetail && tableDetail.orderStatus == '已到货'">
          <el-button type="primary" @click="updateDataReceive(tableDetail)"
            >确认收货</el-button
          >
        </template>
        <template v-if="tableDetail && tableDetail.orderStatus == '已收货'">
          <el-button type="primary" @click="updateDataEvaluate(tableDetail)"
            >评价订单</el-button
          >
        </template>
      </div>

      <!-- </template> -->
    </div>
  </el-dialog>
</template>
<script setup>
import { InfoFilled } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
import {
  listUserOrderIPageAPI,
  updateUserOrderAPI,
} from "../../api/user-order";
import { listOrderProductAPI } from "../../api/order-product";
import store from "../../store";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  User,
  Iphone,
  Location,
  Tickets,
  OfficeBuilding,
} from "@element-plus/icons-vue";
import storage from "../../utils/storage";

const selectedOrderType = ref(0);
const pageTotal = ref(null);

const dialogFormVisible = ref(false);
const defaultFormTemp = {
  userId: "",
  receiver: "",
  user: "",
  productTitle: "",
  productSkusTitle: "",
  productNumber: "",
  orderSn: "",
  orderStatus: null,
  pageSize: 7,
  pageNum: 1,
};
const defaultForm = ref(Object.assign({}, defaultFormTemp));

const search = ref("");
const tableData = ref([]);
const tableDataTemp = ref([]);
const tableDetail = ref();
const status = {
  1: "审核中",
  2: "待收货",
  3: "待评价",
  4: "已结束(评价)",
  0: "已驳回",
  "-1": "已取消",
};

const userOrderViewInfo = ref({
  orderSn: "",
  receiver: "",
  user: "",
  addressDetail: "",
  orderStatus: "",
  orderRemarks: null,
});
const userOrderProductInfo = ref([]);

const changeStatus = (i, index) => {
  tableData.value[index].orderStatus = status[i];
};

const getList = () => {
  selectedOrderType.value = 0;
  defaultForm.value.userId = storage.get("USER_ID");
  defaultForm.value.pageSize = 7;
  listUserOrderIPageAPI(defaultForm.value).then((res) => {
    tableData.value = res.data.records;
    tableDataTemp.value = res.data.records;
    pageTotal.value = res.data.total;
    console.log("defaultFormTemp.pageSize:", defaultFormTemp.pageSize);
    console.log("pageTotal:", pageTotal);
    for (let i = 0; i < tableData.value.length; i++) {
      changeStatus(tableData.value[i].orderStatus, i);
    }
  });
};

const getReceivedList = () => {
  selectedOrderType.value = 1;
  tableDataTemp.value = [];
  for (let data of tableData.value) {
    if (data.orderStatus == "待收货") {
      tableDataTemp.value.push(data);
    }
  }
};
const getEvaluatedList = () => {
  selectedOrderType.value = 2;
  tableDataTemp.value = [];
  for (let data of tableData.value) {
    if (data.orderStatus == "待评价") {
      tableDataTemp.value.push(data);
    }
  }
};

const handleCurrentChange = (val) => {
  defaultForm.value.pageNum = val;
  getList();
};

const handleUpdate = (index, row) => {
  tableDetail.value = row;
  userOrderViewInfo.value.orderSn = row.orderSn;
  userOrderViewInfo.value.orderRemarks = row.orderRemarks;
  userOrderViewInfo.value.receiver = row.receiver;
  userOrderViewInfo.value.user = row.user;
  userOrderViewInfo.value.addressDetail = row.addressDetail;
  let tempForm = {
    userOrderId: row.id,
  };
  listOrderProductAPI(tempForm).then((res) => {
    userOrderProductInfo.value = res.data;
  });
  dialogFormVisible.value = true;
};
const updateDataCancel = (tableDetail) => {
  //添加handleconfirm
  ElMessageBox.confirm(
    console.log("tableDetail1", tableDetail),
    "是否确认取消订单",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(() => {
      let tableDetailTemp = Object.assign({}, tableDetail);
      defaultForm.value = tableDetailTemp;
      defaultForm.value.orderStatus = -1;
      updateUserOrderAPI(defaultForm.value).then((res) => {
        ElMessage({
          type: "success",
          message: "取消订单成功",
        });
        dialogFormVisible.value = false;
        defaultForm.value = Object.assign({}, defaultFormTemp);
        getList();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消操作",
      });
    });
};
const updateDataReceive = (tableDetail) => {
  //添加handleconfirm
  ElMessageBox.confirm(
    console.log("tableDetail1", tableDetail),
    "是否确认收货",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(() => {
      let tableDetailTemp = Object.assign({}, tableDetail);
      defaultForm.value = tableDetailTemp;
      defaultForm.value.orderStatus = 3;
      updateUserOrderAPI(defaultForm.value).then((res) => {
        ElMessage({
          type: "success",
          message: "确认收货成功",
        });
        dialogFormVisible.value = false;
        defaultForm.value = Object.assign({}, defaultFormTemp);
        getList();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消操作",
      });
    });
};

const handleSearch = () => {
  let tempForm = Object.assign({}, defaultFormTemp);
  tempForm = {
    userId: storage.get("USER_ID"),
    orderSn: search.value,
    pageSize: 7,
  };
  listUserOrderIPageAPI(tempForm).then((res) => {
    tableData.value = res.data.records;
    tableDataTemp.value = res.data.records;
    pageTotal.value = res.data.total;
    for (let i = 0; i < tableData.value.length; i++) {
      changeStatus(tableData.value[i].orderStatus, i);
    }
  });
};

getList();
</script>
<style scoped>
hr {
  width: 1004px;
}
a {
  text-decoration: none;
}
a:active {
  color: #409eff;
  text-decoration: none;
}
:deep()td.el-descriptions__cell.el-descriptions__label.is-bordered-label.is-left {
  width: 150px !important;
}

/* :deep().el-input {
    width: 200px !important;
} */
.order {
  margin: 25px;
}

.order-title {
  font-weight: 500;
}
.order-select {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.order-select :deep().el-input__inner,
:deep().el-input--small {
  width: 200px;
}
.order-select-detail {
  margin: 0;
  margin-left: 10px;
  float: left;
  list-style-type: none;
  display: grid;
  grid-template-columns: auto auto auto auto;
  width: 400px;
  padding: 0px;
}
.order-select-detail :deep().el-button {
  min-height: 0;
  padding: 0;
}
.content-info-detail-part {
  margin-bottom: 20px;
}
.table-head {
  font-size: larger;
}
.table-row {
  margin-top: 20px;
}
.table-title {
  border: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
.table-detail {
  height: 60px;
  line-height: 40px;
  border: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}
.dialog-footer {
  display: flex;
  justify-content: end;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
}
.order-select-search :deep().el-button {
  margin-left: 10px;
}
</style>