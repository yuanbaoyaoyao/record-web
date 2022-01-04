<template>
    <div class="info">
        <div>
            <h2 class="info-title">个人信息</h2>
        </div>
        <hr />
        <div class="info-content">
            <div class="info-table">
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="120px"
                    class="demo-ruleForm"
                    :size="formSize"
                >
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择性别">
                            <el-option label="男" value="shanghai"></el-option>
                            <el-option label="女" value="beijing"></el-option>
                            <el-option label="不设置" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker
                                    v-model="ruleForm.date1"
                                    type="date"
                                    placeholder="Pick a date"
                                    style="width: 100%"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="ID" prop="id">
                        <el-input v-model="ruleForm.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="个性签名" prop="desc">
                        <el-input v-model="ruleForm.desc" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
                        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="info-avatar">
                <el-avatar
                    :size="200"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
// More info see https://github.com/element-plus/element-plus/blob/dev/docs/examples/form/utils.ts
import { resetForm, submitForm } from '../utils/index'
import { ElForm } from 'element-plus'

const formSize = ref('')

const ruleFormRef = ref()
const ruleForm = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const rules = reactive({
    name: [
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
        },
        {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur',
        },
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],
    date1: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
        },
    ],
    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
    resource: [
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    desc: [
        {
            required: true,
            message: 'Please input activity form',
            trigger: 'blur',
        },
    ],
})
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
:deep().el-form-item__label {
    width: 80px !important;
}
:deep().el-input__inner,:deep().el-textarea__inner {
    width: 550px;
}
</style>