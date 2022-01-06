<template>
    <div class="info">
        <div>
            <h2 class="info-title">我的申请</h2>
        </div>
        <hr />
        
    </div>
</template>
<script setup>
import { CirclePlusFilled } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '120px'
const textarea = ref('')

const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const gridData = [
    {
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
]
</script>
<style scoped>
.info {
    margin: 25px;
}
.info-title {
    font-weight: 500;
}
.info-content {
    display: grid;
    grid-template-columns: auto auto;
}
.info-table {
    min-width: 760px;
}
.box-card {
    width: 280px;
    height: 280px;
    margin: 15px;
}
:deep().el-form-item__label {
    width: 80px !important;
}
:deep().el-input__inner,
:deep().el-textarea__inner {
    width: 550px;
}
</style>