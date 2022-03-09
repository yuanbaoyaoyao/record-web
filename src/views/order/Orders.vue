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
                        <a href="http://www.baidu.com">全部订单</a>
                    </li>
                    <!-- <li>
                        <a href="http://www.baidu.com">待支付</a>
                    </li>-->
                    <li>
                        <a href="http://www.baidu.com">待收货</a>
                    </li>
                    <li>
                        <a href="http://www.baidu.com">待评价</a>
                    </li>
                </ul>
            </div>
            <el-input v-model="search" size="small" placeholder="Type to search" />
        </div>
        <div class="order-list">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="时间" prop="createdAt" />
                <el-table-column label="订单号" prop="orderSn" />
                <el-table-column label="订单状态" prop="orderStatus" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button size="small" @click="handleUpdate(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

    <el-dialog v-model="dialogFormVisible" title="查看订单详情">
        <el-descriptions class="margin-top" title="With border" :column="3" :size="size" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <user />
                        </el-icon>耗材类别
                    </div>
                </template>
                {{ tableDetail.productTitle }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <iphone />
                        </el-icon>耗材型号
                    </div>
                </template>
                {{ tableDetail.productSkusTitle }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <location />
                        </el-icon>耗材数量
                    </div>
                </template>
                {{ tableDetail.productNumber }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <tickets />
                        </el-icon>订单状态
                    </div>
                </template>
                <el-tag size="small">{{ tableDetail.orderStatus }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <office-building />
                        </el-icon>订单号
                    </div>
                </template>
                {{ tableDetail.orderSn }}
            </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="1" :size="size" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <office-building />
                        </el-icon>地址
                    </div>
                </template>
                {{ tableDetail.userAddressId }}
            </el-descriptions-item>
        </el-descriptions>

        <el-descriptions class="margin-top" :column="1" :size="size" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <office-building />
                        </el-icon>备注
                    </div>
                </template>
                {{ tableDetail.orderRemarks }}
            </el-descriptions-item>
        </el-descriptions>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="dialogFormVisible = false">取消订单</el-button>
                <el-button type="primary" @click="updateData()">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, computed, reactive } from 'vue'
import { listUserOrderAPI } from '../../api/user-order'
import store from '../../store';
import {
    User,
    Iphone,
    Location,
    Tickets,
    OfficeBuilding,
} from '@element-plus/icons-vue'

const size = ref('')
const iconStyle = computed(() => {
    const marginMap = {
        large: '8px',
        default: '6px',
        small: '4px',
    }
    return {
        marginRight: marginMap[size.value] || marginMap.default,
    }
})
const blockMargin = computed(() => {
    const marginMap = {
        large: '32px',
        default: '28px',
        small: '24px',
    }
    return {
        marginTop: marginMap[size.value] || marginMap.default,
    }
})

const formLabelWidth = '120px'

const dialogFormVisible = ref(false)
const defaultFormTemp = reactive({
    userId: '',
    productTitle: '',
    productSkusTitle: '',
    orderSn: ''
})
const defaultForm = ref(Object.assign({}, defaultFormTemp));

const search = ref('')
const tableData = ref([])
const tableDetail = ref()
const status = {
    "1": "审核中",
    "2": "已到货",
    "3": "已收货",
    "4": "已结束(评价)",
    "0": "已驳回",
    "-1": "已取消",
}
const changeStatus = (i, index) => {
    tableData.value[index].orderStatus = status[i]
}
const handleUpdate = (index, row) => {
    console.log("row", row)
    tableDetail.value = row
    dialogFormVisible.value = true
}
const updateData = () => {
    updateUserOrderAPI(defaultForm.value).then(res => {
        getList()
    }).catch(console.log("false"))
    dialogFormVisible.value = false
}
const getList = () => {
    defaultForm.value.userId = store.getters.userId
    listUserOrderAPI(defaultForm.value).then(res => {
        tableData.value = res.data.records
        console.log("tableData.value", tableData.value)
        for (let i = 0; i < tableData.value.length; i++) {
            changeStatus(tableData.value[i].orderStatus, i)
        }
    }).catch()
}
getList()
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
</style>