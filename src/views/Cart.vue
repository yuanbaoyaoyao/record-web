<template>
    <div>
        <div class="layout-header">
            <v-header />
        </div>
        <div class="cart">
            <div class="cart-header">
                <div class="cart-header-title">
                    <div class="cart-header-logo">
                        <a href="#">
                            <img
                                src="../assets/sysLogo.svg"
                                style="display:block;width:110px;height:auto"
                            />
                        </a>
                    </div>
                    <span class="cart-header-detail">购物车</span>
                </div>
                <div class="cart-header-search">
                    <div class="cart-header-search-input">
                        <el-input
                            v-model="input"
                            placeholder="Please input"
                            :prefix-icon="Search"
                            clearable
                        />
                    </div>
                    <div class="search-button">
                        <el-button type="primary">Search</el-button>
                    </div>
                </div>
            </div>
            <div class="cart-list-title"></div>
            <div class="cart-list-content">
                <el-table
                    :data="filterTableData"
                    style="width: 100%"
                    :cell-style="{ 'text-align': 'center' }"
                    :header-cell-style="{ 'text-align': 'center' }"
                    @select="selectChecked"
                    @select-all="selectAllChecked"
                >
                    <el-table-column type="selection" width="80" />
                    <el-table-column>
                        <template v-slot="scope">
                            <el-image style="width: 100px; height: 100px" :src="scope.row.url"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="耗材类别" prop="name" />
                    <el-table-column label="耗材型号" prop="name" />
                    <!-- <el-table-column label="单价" prop="price" /> -->
                    <el-table-column label="数量">
                        <template v-slot="scope">
                            <el-input-number
                                v-model="scope.row.number"
                                :min="1"
                                :max="10"
                                @change="handleChange"
                            />
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="小计">
                        <template
                            v-slot="scope"
                        >{{ scope.row.subtotal = scope.row.price * scope.row.number }}</template>
                    </el-table-column> -->
                    <el-table-column label="库存提示">
                        <template
                            v-slot="scope"
                        >{{ scope.row.subtotal = scope.row.price * scope.row.number }}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="right">
                        <template #default="scope">
                            <el-button
                                size="small"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                            >Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="cart-list-bottom">
                <div class="cart-list-bottom-detail">
                    <div class="cart-select-count">已选择{{ numberCount }}件耗材</div>
                    <!-- <div class="cart-money-count">合计:{{ moneyCount }}元</div> -->
                </div>
                <!-- <div class="cart-settlement">底部结算</div> -->
                <div>
                    <template v-if="selectionLength == 0">
                        <el-button type="info" @click="openMessage">发送订单</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="handleSettlement()">发送订单</el-button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import vHeader from "../components/Header.vue"
import router from '../router';

const search = ref('')
const input = ref('')

const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleDelete = (index, row) => {
    console.log(index, row)
}

const handleChange = (value) => {
    console.log(value)
}

const tableData = [
    {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: 'Tom',
        price: '14',
        number: 6,
    },
    {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: 'John',
        price: '18',
        number: 8,


    },
    {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: 'Morgan',
        price: '18',
        number: 90,

    },
    {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: 'Jessy',
        price: '88',
        number: 4,
    },
]
const numberCount = ref(0)
const moneyCount = ref(0)
const selectionLength = ref(0)

const handleSettlement=()=>{
    router.push("/confirmOrder")
}

const selectChecked = (selection) => {
    let temp = 0, tempMoneyCount = 0
    for (let element of selection) {
        temp += element.number
        tempMoneyCount += element.subtotal
    }
    selectionLength.value = selection.length
    numberCount.value = temp
    moneyCount.value = tempMoneyCount
}

const selectAllChecked = (selection) => {
    let temp = 0, tempMoneyCount = 0
    for (let element of selection) {
        temp += element.number
        tempMoneyCount += element.subtotal
    }
    selectionLength.value = selection.length

    numberCount.value = temp
    moneyCount.value = tempMoneyCount
}
const openMessage = () => {
    ElMessage('请勾选需要结算的耗材')
}
</script>
<style scoped>
.layout-header {
    margin-bottom: 30px;
}
.cart {
    display: flex;
    flex-direction: column;
    width: 1190px !important;
    margin: auto;
}
.cart-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.cart-header {
    margin: 25px;
}
.cart-header-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.cart-header-detail {
    font-size: xx-large;
    font-family: "Courier New", Courier, monospace;
    margin: 5px;
}
.cart-header-search {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
}
.cart-header-search-input {
    width: 300px;
    border-radius: 15px;
}
.cart-header-search-input :deep() .el-input__inner {
    height: 50px;
}
.search-button > .el-button {
    height: 50px;
}
.cart-list-bottom {
    display: grid;
    grid-template-columns: 90% auto;
    align-items: center;
    background-color: white;
    margin-top: 10px;
}
.cart-list-bottom-detail {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.cart-select-count,
.cart-money-count {
    margin: 20px;
}
.el-button.el-button--info,
.el-button.el-button--primary {
    width: 100%;
    height: 60px;
    line-height: 0% !important;
}
:deep().el-table__header .el-checkbox::after {
    content: "全选";
    padding: 6px;
    color: #909399;
    font-weight: bold;
}
:deep().el-table__header .el-checkbox {
    margin-left: 22px;
}
</style>