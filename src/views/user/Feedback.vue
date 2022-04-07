<template>
    <div class="feedback">
        <div>
            <h2 class="feedback-title">我的反馈</h2>
        </div>
        <hr />
        <div class="feedback-content">
            <div class="feedback-info">
                <div class="feedback-info-title">
                    <span>能不能买快点</span>
                </div>
                <div class="feedback-info-content">
                    <span>时间: fjlakdjflajdf</span>
                    <span class="division">|</span>

                    <span>服务单号: flkdjakflja</span>
                </div>
            </div>
            <div class="feedback-pic">
                <el-image :src="src"></el-image>
                <span>88a</span>
                <el-button plain>查看详情</el-button>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="新建反馈单">
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
                        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue'
// More feedback see https://github.com/element-plus/element-plus/blob/dev/docs/examples/form/utils.ts
import { resetForm, submitForm } from '../../utils/index'
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
const src =
    'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'

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
hr {
    width: 1004px;
}
:deep().el-image__inner {
    height: 80px !important;
    width: 80px !important;
}
.feedback {
    margin: 25px;
}
.feedback-title {
    font-weight: 500;
}
.feedback-content {
    display: grid;
    grid-template-rows: auto auto;
    border: solid;
    border: 1px solid #cfeeab;
}
.feedback-info {
    border-bottom: 1px solid #cfeeab;
    padding: 15px 15px;
    padding-left: 30px;
    color: rgb(136, 190, 136);
    display: flex;
    justify-content: space-between;
}
.division {
    margin: 5px;
}
.feedback-info-content {
    color: rgb(94, 88, 88);
}
.feedback-info-title {
    margin-bottom: 10px;
}
.feedback-pic {
    display: grid;
    grid-template-columns: 20% auto 20%;
    padding: 15px 10px;
    padding-left: 30px;
    align-items: center;
}
:deep().el-form-item__label {
    width: 80px !important;
}
:deep().el-input__inner,
:deep().el-textarea__inner {
    width: 550px;
}
</style>