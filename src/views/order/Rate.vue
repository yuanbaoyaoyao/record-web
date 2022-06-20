<template>
  <div class="order">
    <div>
      <h2 class="order-title">我的评价</h2>
    </div>
    <hr />
    <!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
    <div class="order-list">
      <el-table :data="orderListData" style="width: 100%">
        <el-table-column label="订单号" prop="orderSn" />
        <el-table-column label="时间" prop="createdAt" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleDetail(scope.$index, scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        hide-on-single-page
        v-model:currentPage="defaultForm.pageNum"
        :page-size="defaultForm.pageSize"
        layout="total, prev, pager, next"
        :total="pageTotal"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="查看详情">
    <el-table :data="orderDetailData" style="width: 100%">
      <el-table-column label="耗材类别" prop="productTitle" />
      <el-table-column label="耗材型号" prop="productSkusTitle" />
      <el-table-column label="耗材数量" prop="number" />
      <el-table-column label="评价" prop="productSkusEvaluation" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            v-if="scope.row.additionalEvaluation == null"
            type="primary"
            size="small"
            @click="handleAdditionalEvaluation(scope.$index, scope.row)"
            >追加评价</el-button
          >
          <el-button
            v-else
            type="success"
            size="small"
            @click="handleAdditionalEvaluation(scope.$index, scope.row)"
            >查看追加评价</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭窗口</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogAdditionaVisible"
    :title="
      orderDetailData.additionalEvaluation == null
        ? '添加追加评价'
        : '查看追加评价'
    "
  >
    <el-input
      v-model="additionalEvaluation"
      :rows="4"
      type="textarea"
      placeholder="请输入追加评价"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleUpdate">添加追加评价</el-button>
        <el-button @click="dialogFormVisible = false">关闭窗口</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ElNotification } from "element-plus";
import { ref, computed } from "vue";
import {
  listProductSkusEvaluationIPageAPI,
  listProductSkusEvaluationAPI,
  updateProductSkusEvaluationAPI,
  createProductSkusEvaluationAPI,
  deleteProductSkusEvaluationAPI,
} from "../../api/product-skus-evaluation";
import { listUserOrderIPageAPI } from "../../api/user-order";
import storage from "../../utils/storage";

const orderListData = ref([]);
const orderDetailData = ref([]);
const dialogFormVisible = ref(false);
const dialogAdditionaVisible = ref(false);

const additionalEvaluation = ref();
const additionalEvaluationId = ref();

const defaultFormTemp = {
  userId: storage.get("USER_ID"),
  orderStatus: 4,
  pageSize: 7,
  pageNum: 1,
};
const defaultForm = ref(Object.assign({}, defaultFormTemp));
const pageTotal = ref(0);

const getEvaluatedOrdersList = () => {
  listUserOrderIPageAPI(defaultForm.value).then((res) => {
    orderListData.value = res.data.records;
    pageTotal.value = res.data.total;
    console.log("orderListData.value:", res.data);
  });
};

const handleDetail = (index, row) => {
  console.log(index, row);
  additionalEvaluationId.value = row.id;
  dialogFormVisible.value = true;
  let tempForm = {
    orderSn: row.orderSn,
  };
  listProductSkusEvaluationAPI(tempForm).then((res) => {
    console.log("listProductSkusEvaluationIPageAPI:", res.data);
    orderDetailData.value = res.data;
  });
};

const handleAdditionalEvaluation = (index, row) => {
  dialogAdditionaVisible.value = true;
  console.log("rowwwwwwwwwwwwwwwwwwwww:", row);
};

const handleCurrentChange = (val) => {
  defaultForm.value.pageNum = val;
  getEvaluatedOrdersList();
};

const handleUpdate = () => {
  let tempForm = {
    additionalEvaluation: additionalEvaluation.value,
    id: additionalEvaluationId.value,
  };
  updateProductSkusEvaluationAPI(tempForm).then((res) => {
    dialogAdditionaVisible.value = false;
    ElNotification({
      type: "success",
      title: "添加追加评价成功",
    });
  });
};

getEvaluatedOrdersList();
</script>
<style scoped>
hr {
  width: 1004px;
}
:deep().el-input {
  width: 200px !important;
  float: right;
}
.order {
  margin: 25px;
}
.order-title {
  font-weight: 500;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>