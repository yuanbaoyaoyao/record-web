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
        <el-descriptions class="margin-top" :column="3" :size="size" border>
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
        <el-descriptions class="margin-top" :column="3" :size="size" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <office-building />
                        </el-icon>申请人
                    </div>
                </template>
                {{ tableDetail.receiver }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <office-building />
                        </el-icon>使用人
                    </div>
                </template>
                {{ tableDetail.user }}
            </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="3" :size="size" border>
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

        <el-descriptions class="margin-top" :column="3" :size="size" border>
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
            </span>
        </template>
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
const changeStatus = (i, index) => {
    tableData.value[index].orderStatus = status[i]
}

const getList = () => {
    defaultForm.value.userId = store.getters.userId
    listUserOrderAPI(defaultForm.value).then(res => {
        tableData.value = res.data.records
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
    console.log("row", row)
    tableDetail.value = row
    dialogFormVisible.value = true
}
// const updateData = () => {
//     updateUserOrderAPI(defaultForm.value).then(res => {
//         getList()
//     }).catch(console.log("false"))
//     dialogFormVisible.value = false
// }

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
</style>