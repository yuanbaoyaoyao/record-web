<template>
    <div class="info">
        <div>
            <h2 class="info-title">收货地址</h2>
        </div>
        <hr />
        <div>
            <el-space wrap>
                <el-button
                    :icon="CirclePlusFilled"
                    class="box-card"
                    type="primary"
                    @click="dialogFormVisible = true"
                >添加新地址</el-button>
                <el-card v-for="i in 5" :key="i" class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>Card name</span>
                            <el-button class="button" type="text">Operation button</el-button>
                        </div>
                    </template>
                    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                </el-card>
            </el-space>
        </div>
    </div>

    <el-dialog v-model="dialogFormVisible" title="添加收货地址">
        <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Zones" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="Please select a zone">
                    <el-option label="Zone No.1" value="shanghai"></el-option>
                    <el-option label="Zone No.2" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="form.name" :rows="2" placeholder="Please input" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
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