<template>
    <div class="info">
        <div>
            <h2 class="info-title">我的反馈</h2>
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
                    <el-form-item label="个性签名" prop="desc">
                        <el-input v-model="ruleForm.desc" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" prop="desc">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            list-type="picture"
                        >
                            <el-button type="primary">Click to upload</el-button>
                            <template #tip>
                                <div
                                    class="el-upload__tip"
                                >jpg/png files with a size less than 500kb</div>
                            </template>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
                        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
// More info see https://github.com/element-plus/element-plus/blob/dev/docs/examples/form/utils.ts
import { resetForm, submitForm } from '../utils/index'
import { ElForm } from 'element-plus'
import { UploadFile } from 'element-plus/es/components/upload/src/upload.type'

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

const fileList = ref([
    {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
    {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
])

const handleRemove = (file, fileList) => {
    console.log(file, fileList)
}
const handlePreview = (file) => {
    console.log(file)
}

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
:deep().el-input__inner,
:deep().el-textarea__inner {
    width: 550px;
}
</style>