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
                        <el-button type="text" @click="getListAll()">全部订单</el-button>
                    </li>
                    <!-- <li>
                        <a href="http://www.baidu.com">待支付</a>
                    </li>-->
                    <li>
                        <el-button type="text" @click="getListToBeReceived()">待收货</el-button>
                    </li>
                    <li>
                        <el-button type="text" @click="getListToBeEvaluated()">待评价</el-button>
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
        <div class="content-info-detail">
            <div class="content-info-detail-part">
                <span class="table-head">
                    <el-icon>
                        <info-filled />
                    </el-icon>基本信息
                </span>
                <div>
                    <el-row class="table-row">
                        <el-col class="table-title" :span="6">订单号</el-col>
                        <el-col class="table-title" :span="18">订单留言</el-col>
                    </el-row>
                    <el-row>
                        <el-col class="table-detail" :span="6">{{ userOrderViewInfo.orderSn }}</el-col>
                        <el-col class="table-detail" :span="18">{{ userOrderViewInfo.orderRemarks }}</el-col>
                    </el-row>
                </div>
            </div>
            <div class="content-info-detail-part">
                <span class="table-head">
                    <el-icon>
                        <info-filled />
                    </el-icon>领用人信息
                </span>
                <el-row class="table-row">
                    <el-col class="table-title" :span="6">领用人</el-col>
                    <el-col class="table-title" :span="6">使用人</el-col>
                    <el-col class="table-title" :span="12">收货地址</el-col>
                </el-row>
                <el-row>
                    <el-col class="table-detail" :span="6">{{ userOrderViewInfo.receiver }}</el-col>
                    <el-col class="table-detail" :span="6">{{ userOrderViewInfo.user }}</el-col>
                    <el-col class="table-detail" :span="12">{{ userOrderViewInfo.addressDetail }}</el-col>
                </el-row>
            </div>
            <div class="content-info-detail-part">
                <span class="table-head">
                    <el-icon>
                        <info-filled />
                    </el-icon>耗材信息
                </span>
                <el-table class="table-row" ref="multipleTable" border :data="userOrderProductInfo">
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
                    <el-button type="danger" @click="updateDataCancel(tableDetail)">取消订单</el-button>
                </template>
                <el-button type="info" @click="dialogFormVisible = false">取消</el-button>
                <template v-if="tableDetail && tableDetail.orderStatus == '已到货'">
                    <el-button type="primary" @click="updateDataReceive(tableDetail)">确认收货</el-button>
                </template>
                <template v-if="tableDetail && tableDetail.orderStatus == '已收货'">
                    <el-button type="primary" @click="updateDataEvaluate(tableDetail)">评价订单</el-button>
                </template>
            </div>

            <!-- </template> -->
        </div>
    </el-dialog>
</template>
<script setup>
import { ref, computed, reactive } from 'vue'
import { listUserOrderAPI, updateUserOrderAPI } from '../../api/user-order'
import store from '../../store';
import { ElMessage, ElMessageBox } from 'element-plus'
import {
    User,
    Iphone,
    Location,
    Tickets,
    OfficeBuilding,
} from '@element-plus/icons-vue'
import storage from '../../utils/storage';

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
const defaultFormTemp = {
    userId: '',
    receiver: '',
    user: '',
    productTitle: '',
    productSkusTitle: '',
    productNumber: '',
    orderSn: '',
    orderStatus: null,
}
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

const userOrderViewInfo = ref({
    orderSn: '',
    receiver: '',
    user: '',
    addressDetail: '',
    orderStatus: '',
    orderRemarks: '',

})
const userOrderInfo = ref()

const changeStatus = (i, index) => {
    tableData.value[index].orderStatus = status[i]
}

const getList = () => {
    defaultForm.value.userId = storage.get("USER_ID")
    listUserOrderAPI(defaultForm.value).then(res => {
        tableData.value = res.data.records
        console.log("tableData", tableData.value)
        for (let i = 0; i < tableData.value.length; i++) {
            changeStatus(tableData.value[i].orderStatus, i)
        }
    }).catch(console.log("faild to getList"))
}

const getListAll = () => {
    defaultForm.value = Object.assign({}, defaultFormTemp)
    defaultForm.value.userId = store.getters.userId
    listUserOrderAPI(defaultForm.value).then(res => {
        tableData.value = res.data.records
        for (let i = 0; i < tableData.value.length; i++) {
            changeStatus(tableData.value[i].orderStatus, i)
        }
    }).catch(console.log("faild to getListAll"))
}

const getListToBeReceived = () => {
    defaultForm.value = Object.assign({}, defaultFormTemp)
    defaultForm.value.userId = store.getters.userId
    defaultForm.value.orderStatus = 2
    listUserOrderAPI(defaultForm.value).then(res => {
        tableData.value = res.data.records
        for (let i = 0; i < tableData.value.length; i++) {
            changeStatus(tableData.value[i].orderStatus, i)
        }
    }).catch(console.log("faild to getListToBeReceived"))
}

const getListToBeEvaluated = () => {
    defaultForm.value = Object.assign({}, defaultFormTemp)
    defaultForm.value.userId = store.getters.userId
    defaultForm.value.orderStatus = 3
    listUserOrderAPI(defaultForm.value).then(res => {
        tableData.value = res.data.records
        for (let i = 0; i < tableData.value.length; i++) {
            changeStatus(tableData.value[i].orderStatus, i)
        }
    }).catch(console.log("faild to getListToBeEvaluated"))
}

const handleUpdate = (index, row) => {
    tableDetail.value = row
    let tempInfo = { orderSn: row.orderSn, userId: storage.get("USER_ID") }
    listUserOrderAPI(tempInfo).then(res => {
        userOrderInfo.value = res.data.records
        for (let i = 0; i < userOrderInfo.value.length; i++) {
            changeStatus(userOrderInfo.value[i].orderStatus, i)
        }
        userOrderViewInfo.value = userOrderInfo.value[0]
        console.log("userOrderInfo:", userOrderInfo.value)
    }).catch()
    dialogFormVisible.value = true
}
const updateDataCancel = (tableDetail) => {

    //添加handleconfirm
    ElMessageBox.confirm(
        console.log("tableDetail1", tableDetail),
        '是否确认取消订单',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        },
    ).then(() => {
        let tableDetailTemp = Object.assign({}, tableDetail);
        defaultForm.value = tableDetailTemp
        defaultForm.value.orderStatus = -1
        updateUserOrderAPI(defaultForm.value).then(res => {
            ElMessage({
                type: 'success',
                message: '取消订单成功',
            })
            dialogFormVisible.value = false
            defaultForm.value = Object.assign({}, defaultFormTemp)
            getList()
        })

    })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消操作',
            })
        })
}
const updateDataReceive = (tableDetail) => {

    //添加handleconfirm
    ElMessageBox.confirm(
        console.log("tableDetail1", tableDetail),
        '是否确认收货',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        },
    ).then(() => {
        let tableDetailTemp = Object.assign({}, tableDetail);
        defaultForm.value = tableDetailTemp
        defaultForm.value.orderStatus = 3
        updateUserOrderAPI(defaultForm.value).then(res => {
            ElMessage({
                type: 'success',
                message: '确认收货成功',
            })
            dialogFormVisible.value = false
            defaultForm.value = Object.assign({}, defaultFormTemp)
            getList()
        })

    })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消操作',
            })
        })
}
// const updateDataEvaluate = (tableDetail) => {

//     //添加handleconfirm
//     ElMessageBox.confirm(
//         console.log("tableDetail1", tableDetail),
//         '是否确认取消订单',
//         {
//             confirmButtonText: '确定',
//             cancelButtonText: '取消',
//             type: 'warning',
//         },
//     ).then(() => {
//         let tableDetailTemp = Object.assign({}, tableDetail);
//         defaultForm.value = tableDetailTemp
//         defaultForm.value.orderStatus = 4
//         updateUserOrderAPI(defaultForm.value).then(res => {
//             ElMessage({
//                 type: 'success',
//                 message: '取消订单成功',
//             })
//             dialogFormVisible.value = false
//             defaultForm.value = Object.assign({}, defaultFormTemp)
//             getList()
//         })

//     })
//         .catch(() => {
//             ElMessage({
//                 type: 'info',
//                 message: '取消操作',
//             })
//         })
// }


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
.dialog-footer{
    display: flex;
    justify-content: end;
}
</style>