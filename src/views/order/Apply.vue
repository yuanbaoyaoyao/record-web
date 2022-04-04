<template>
    <div class="apply">
        <div>
            <h2 class="apply-title">申请耗材</h2>
        </div>
        <hr />
        <div>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
            >
                <el-form-item label="耗材类别" prop="productTitle">
                    <el-autocomplete
                        v-model="ruleForm.productTitle"
                        value-key="title"
                        :fetch-suggestions="querySearchProduct"
                        :trigger-on-focus="true"
                        class="inline-input"
                        placeholder="请输入耗材类别"
                        @select="handleSelect(ruleForm.productTitle)"
                    />
                    <template v-if="typeTagVisible">
                        <el-tag class="ml-2" type="success">在库耗材类型</el-tag>
                    </template>
                    <template v-else>
                        <el-tag class="ml-2" type="info">未在库耗材类型</el-tag>
                    </template>
                </el-form-item>

                <el-form-item label="耗材型号" prop="productSkusTitle">
                    <el-autocomplete
                        v-model="ruleForm.productSkusTitle"
                        value-key="title"
                        :fetch-suggestions="querySearchProductSkus"
                        :trigger-on-focus="true"
                        class="inline-input"
                        placeholder="请输入耗材型号"
                    />
                    <template v-if="modelTagVisible && typeTagVisible">
                        <el-tag class="ml-2" type="success">在库耗材型号</el-tag>
                    </template>
                    <template v-else>
                        <el-tag class="ml-2" type="info">未在库耗材型号</el-tag>
                    </template>
                </el-form-item>

                <el-form-item label="耗材数量" prop="productNumber">
                    <el-input v-model="ruleForm.productNumber" placeholder="请输入数量"></el-input>
                    <template v-if="modelTagVisible && typeTagVisible">
                        <el-tag class="ml-2" type="success">总数量为88</el-tag>
                    </template>
                </el-form-item>

                <el-form-item label="选择地址" prop="userAddressId">
                    <el-select v-model="ruleForm.userAddressId" placeholder="选择地址">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.addressDetail"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="图片">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>

                <el-form-item label="订单描述" prop="orderRemarks">
                    <el-input v-model="ruleForm.orderRemarks" type="textarea"></el-input>
                </el-form-item>

                <el-form-item class="button">
                    <span class="dialog-footer">
                        <el-button type="primary" @click="open(ruleFormRef)">创建申请</el-button>
                        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                    </span>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script  setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons'
import router from '../../router';
import { listProductAllAPI } from '../../api/product';
import { listProductSkusSearchIPageAPI } from '../../api/product-skus'
// import { createUserOrderAPI } from '../../api/product-apply'
import { createUserOrderAPI,updateUserOrderAPI } from '../../api/user-order'
import { listUserAddressAPI } from '../../api/user-address'
import store from '../../store';

const options = ref([])
const defaultFormTemp = reactive({
    userId: '',
})
const defaultForm = ref(Object.assign({}, defaultFormTemp));

const getAddress = () => {
    defaultForm.value.userId = store.getters.userId
    console.log("defaultForm.value.userId", defaultForm.value.userId)
    listUserAddressAPI(defaultForm.value).then(res => {
        options.value = res.data
        console.log("options.value", options.value)
    }).catch()
}

const querySearchProduct = (queryString, cb) => {
    let lists = []
    listProductAllAPI(querySearchList.value).then(res => {

        for (let i = 0; i < res.data.records.length; i++) {
            lists[i] = res.data.records[i]
        }
        const results = queryString ? lists.filter(createFilter(queryString)) : lists
        cb(results)
    })
}

const querySearchProductSkus = (queryString, cb) => {
    let lists = []
    querySearchList.value.keyword1 = ruleForm.productTitle
    listProductSkusSearchIPageAPI(querySearchList.value).then(res => {
        for (let i = 0; i < res.data.records.length; i++) {
            lists[i] = res.data.records[i]
        }
        const results = queryString ? lists.filter(createFilter(queryString)) : lists
        cb(results)
    })
}

const createFilter = (queryString) => {
    return (list) => {
        return (
            list.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}

const handleSelect = (item) => {
}

const typeTagVisible = ref(false)
const modelTagVisible = ref(false)

const qiniuDomain = 'r6ctg8uno.hd-bkt.clouddn.com';
const qiniuUploadData = ref({
    token: "",
    key: ""
})

const open = (formName) => {
    if (!formName) return
    //添加handleconfirm
    formName.validate((valid) => {
        console.log('2')
        if (valid) {
            console.log('3')

            ElMessageBox.confirm(
                '是否确认提交申请单',
                {
                    confirmButtonText: '确定',

                    cancelButtonText: '取消',
                    type: 'warning',
                },

            ).then(() => {
                createUserOrderAPI(ruleForm).then(res => {
                    console.log("创建成功")
                    console.log("ruleForm", ruleForm)
                }).catch(ElMessage({
                    type: 'error',
                    message: '提交失败',
                }))
                ElMessage({
                    type: 'success',
                    message: '提交成功',
                })
                ElMessageBox.confirm(
                    '[已提交] 是否继续填写申请单',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success',
                    }
                ).then(() => {
                    resetForm(ruleFormRef.value)
                    ElMessage({
                        type: 'success',
                        message: '继续填写申请单',
                    })

                })
                    .catch(() => {
                        router.push('/orders')
                    })
            })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消申请单',
                    })
                })
        }
        else {
            console.log("false")
            return false
        }
    })
}

const imageUrl = ref('')
const handleAvatarSuccess = (res, file) => {
    imageUrl.value = URL.createObjectURL(file.raw)
}
const beforeAvatarUpload = (file) => {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
        ElMessage.error('Avatar picture must be JPG format!')
    }
    if (!isLt2M) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
    }
    return isJPG && isLt2M
}

const querySearchList = ref({
    keyword1: null,
    keyword2: null
})

const ruleFormRef = ref()

const ruleForm = reactive({
    userId: '',
    userAddressId: '',
    productTitle: '',
    productSkusTitle: '',
    productNumber: '',
    orderRemarks: ''
})
const init = () => {
    ruleForm.userId = store.getters.userId
}
init()

const validateType = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入耗材类型'))
    }
    callback()
}
const validateModel = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入耗材型号'))
    }
    callback()
}

const rules = reactive({
    productTitle: [{ required: true, validator: validateType, trigger: 'input' }],
    productSkusTitle: [{ required: true, validator: validateModel, trigger: 'input' }],
    productNumber: [
        {
            required: true,
            message: '请输入耗材数量',
            trigger: 'input',
        },
    ],
})

const resetForm = (formName) => {
    if (!formName) return
    formName.resetFields()
}
getAddress()
</script>
<style scoped>
:deep().el-form-item__content {
    display: grid;
    grid-template-columns: auto 15% auto;
}
:deep().el-tag {
    height: 40px;
    margin-left: 20px;
}
.apply {
    margin: 25px;
}
hr {
    width: 1004px;
}
.apply-title {
    font-weight: 500;
}
:deep().el-form-item.button {
    text-align: center;
}
:deep().el-textarea__inner,
:deep().el-input__inner {
    max-width: 500px !important;
}
.setting-header {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: flex-start;
    margin: 25px;
}
.setting-center {
    display: flex;
    background-color: white;
}
:deep().avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
:deep().avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d !important;
    width: 120px;
    height: 120px;
    text-align: center !important;
    line-height: 120px;
}
.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
</style>