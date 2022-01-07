<template>
    <div class="order">
        <div>
            <h2 class="order-title">我的评价</h2>
        </div>
        <hr />
        <el-input v-model="search" size="small" placeholder="Type to search" />
        <div class="order-list">
            <el-table :data="filterTableData" style="width: 100%">
                <el-table-column label="时间" prop="date" />
                <el-table-column label="订单号" prop="number" />
                <el-table-column label="订单状态" prop="state" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.number.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index, row) => {
    console.log(index, row)
}

const tableData = [
    {
        date: '2016-05-03',
        number: '342423423',
        state: '已收货',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        number: '342423423',
        state: '已收货',

        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        number: '342423423',
        state: '已收货',

        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        number: '342423423',
        state: '未收货',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
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
</style>