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
                        @select="handleSelectProduct(ruleForm.productTitle)"
                    />
                    <template v-if="IsInProductLibary">
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
                        @select="handleSelectProductSkus(ruleForm)"
                    />
                    <template v-if="IsInProductSkusLibary">
                        <el-tag class="ml-2" type="success">在库耗材型号</el-tag>
                    </template>
                    <template v-else>
                        <el-tag class="ml-2" type="info">未在库耗材型号</el-tag>
                    </template>
                </el-form-item>

                <el-form-item label="耗材数量" prop="productNumber">
                    <el-input v-model="ruleForm.productNumber" placeholder="请输入数量"></el-input>
                    <template v-if="ruleForm.productSkusStock != ''">
                        <el-tag class="ml-2" type="success">库存{{ ruleForm.productSkusStock }}个</el-tag>
                    </template>
                </el-form-item>

                <el-form-item label="选择地址" prop="userAddressId">
                    <el-select
                        v-model="ruleForm.userAddressId"
                        placeholder="选择地址"
                        @change="handleAddressChange(ruleForm.userAddressId)"
                    >
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
                        <el-button type="primary" @click="handleCreateOrder(ruleFormRef)">创建申请</el-button>
                        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                    </span>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons'
import router from '../../router';
import { listProductAllAPI } from '../../api/product';
import { listProductSkusSearchAPI, updateProductSkusAPI } from '../../api/product-skus'
// import { createUserOrderAPI } from '../../api/product-apply'
import { createUserOrderAPI, updateUserOrderAPI } from '../../api/user-order'
import { listUserAddressAPI, listOneUserAddressAPI } from '../../api/user-address'
import { createOrderProductAPI } from '../../api/order-product'
import store from '../../store';
import storage from '../../utils/storage';

const options = ref([])
const defaultFormTemp = reactive({
    userId: '',
})
const defaultForm = ref(Object.assign({}, defaultFormTemp));

const productInfo = ref({ productTitle: '' })
const productSkusInfo = ref({ productSkusTitle: '' })

const getAddress = () => {
    defaultForm.value.userId = storage.get("USER_ID")
    listUserAddressAPI(defaultForm.value).then(res => {
        options.value = res.data
    }).catch()
}
const IsInProductLibary = ref(false)
const IsInProductSkusLibary = ref(false)

const querySearchProduct = (queryString, cb) => {
    let lists = []
    IsInProductLibary.value = false
    IsInProductSkusLibary.value = false
    ruleForm.productSkusStock = ''
    ruleForm.productSkusTitle = ''
    // productInfo.value = { productTitle: '' }
    // productSkusInfo.value = { productSkusTitle: '' }
    listProductAllAPI().then(res => {
        lists = res.data
        const results = queryString ? lists.filter(createFilter(queryString)) : lists
        if (results.length == 1 && results[0].title == ruleForm.productTitle) {
            IsInProductLibary.value = true
            productInfo.value = results[0]
            console.log("productInfo.value", productInfo.value)
        }
        // if (IsInProductLibary.value == false) {
        //     productInfo.value.productName = ruleForm.productTitle
        // }
        console.log("productInfo", productInfo.value)
        cb(results)
    })
}

const querySearchProductSkus = (queryString, cb) => {
    let lists = []
    IsInProductSkusLibary.value = false
    ruleForm.productSkusStock = ''
    // productSkusInfo.value = { productSkusTitle: '' }
    querySearchList.value.title = ruleForm.productTitle
    if (querySearchList.value.title != '') {
        listProductSkusSearchAPI(querySearchList.value).then(res => {
            lists = res.data
            const results = queryString ? lists.filter(createFilter(queryString)) : lists
            if (results.length == 1 && results[0].title == ruleForm.productSkusTitle) {
                IsInProductSkusLibary.value = true
                productSkusInfo.value = results[0]
                console.log("productSkusInfo.value", productSkusInfo.value)
            }
            // if (IsInProductSkusLibary.value == false) {
            //     productSkusInfo.value.title = ruleForm.productSkusTitle
            // }
            console.log("productSkusInfo", productSkusInfo.value)
            cb(results)
        })
    } else {
        cb([])
    }
}

const createFilter = (queryString) => {
    return (list) => {
        return (
            list.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}

const handleSelectProduct = (item) => {
    IsInProductLibary.value = true
    ruleForm.productSkusStock = ''
    ruleForm.productTitle = item
}

const handleSelectProductSkus = (item) => {
    ruleForm.productSkusStock = ''
    let tempInfo = { title: item.productTitle, productSkusTitle: item.productSkusTitle }
    listProductSkusSearchAPI(tempInfo).then(res => {
        console.log("ressssssssss:", res)
        productSkusInfo.value.title = res.data[0].title
        productSkusInfo.value.productName = res.data[0].productName
        productSkusInfo.value.productId = res.data[0].productId
        productSkusInfo.value.id = res.data[0].id
        ruleForm.productSkusStock = res.data[0].stock
    })
    IsInProductSkusLibary.value = true
}

const typeTagVisible = ref(false)
const modelTagVisible = ref(false)

const qiniuDomain = 'r6ctg8uno.hd-bkt.clouddn.com';
const qiniuUploadData = ref({
    token: "",
    key: ""
})

const handleCreateOrder = (formName) => {
    if (!formName) return
    //添加handleconfirm
    formName.validate((valid) => {
        console.log("ruleForm", ruleForm)
        if (valid) {
            ElMessageBox.confirm(
                '是否确认提交申请单',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                },

            ).then(() => {
                createUserOrderAPI(ruleForm).then(res => {
                    let tempProductSkusInfo = {
                        id: productSkusInfo.value.id
                    }
                    let tempOrderProductInfo = {
                        orderSn: res.data.orderSn,
                        userOrderId: res.data.id,
                        productId: productSkusInfo.value.productId,
                        productSkusId: productSkusInfo.value.id,
                        productTitle: productSkusInfo.value.productName,
                        productSkusTitle: productSkusInfo.value.title,
                        number: ruleForm.productNumber
                    }
                    console.log("productSkusInfo", productSkusInfo.value)
                    console.log("tempOrderProductInfo", tempOrderProductInfo)
                    listProductSkusSearchAPI(tempProductSkusInfo).then(resProductSKus => {
                        let tempUpdatedProductSKusInfo = {
                            id: productSkusInfo.value.id,
                            stock: resProductSKus.data[0].stock - ruleForm.productNumber
                        }
                        updateProductSkusAPI(tempUpdatedProductSKusInfo).then(resUpdate => {
                            createOrderProductAPI(tempOrderProductInfo).then(resCreateOrder => {
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
                        })
                    })

                })
            })
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
    title: null,
})

const ruleFormRef = ref()

const ruleForm = reactive({
    userId: '',
    userAddressId: '',
    productTitle: '',
    productSkusTitle: '',
    productNumber: '',
    orderRemarks: '',
    productSkusStock: '',
    receiver: '',
    user: '',
    addressDetail: ''
})
const init = () => {
    ruleForm.userId = storage.get("USER_ID")
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
    userAddressId: [
        {
            required: true,
            message: '请选择地址',
            trigger: 'input',
        },
    ],
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

const handleAddressChange = (val) => {
    let tempInfo = { id: val }
    listOneUserAddressAPI(tempInfo).then(res => {
        ruleForm.addressDetail = res.data.addressDetail
        ruleForm.receiver = res.data.receiver
        ruleForm.user = res.data.user
    })
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