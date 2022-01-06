<template>
    <div class="order">
        <div>
            <h2 class="order-title">我的订单</h2>
        </div>
        <hr />
        <div class="order-select">
            <ul class="order-select-detail">
                <li>
                    <a href="http://www.baidu.com">全部订单</a>
                </li>
                <li>
                    <a href="http://www.baidu.com">待支付</a>
                </li>
                <li>
                    <a href="http://www.baidu.com">待收货</a>
                </li>
                <li>
                    <a href="http://www.baidu.com">待评价</a>
                </li>
            </ul>
        </div>
        <div class="order-list">
            <el-table
                ref="multipleTable"
                :data="tableData"
                :default-sort="{ prop: 'date', order: 'descending' }"
                style="width: 100%"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="date" label="注册时间" sortable width="180" />
                <el-table-column prop="address" label="地址" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default>
                        <el-button type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
</script>
<style scoped>
.order {
    margin: 25px;
}
.order-title {
    font-weight: 500;
}
.order-select {
    width: 100%;
}
.order-select-detail {
    margin: 0;
    float: left;
    list-style-type: none;
    display: grid;
    grid-template-columns: auto auto auto auto;
    width: 400px;
    padding: 0px;
}
a {
    text-decoration: none;
}
</style>