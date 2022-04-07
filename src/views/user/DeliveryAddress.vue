<template>
    <div class="address">
        <div>
            <h2 class="address-title">收货地址</h2>
        </div>
        <hr />
        <div>
            <el-space wrap>
                <el-button
                    :icon="CirclePlusFilled"
                    class="box-card"
                    type="primary"
                    @click="handleCreateAddress()"
                >添加新地址</el-button>
                <el-card v-for="i in tableData" :key="i" class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>{{ i.receiver }}</span>
                        </div>
                    </template>
                    <div class="address-detail">
                        <div class="text item">领用人: {{ i.receiver }}</div>
                        <div class="text item">使用人: {{ i.user }}</div>
                        <div class="text item">领用人电话号码: {{ i.phone }}</div>
                        <div class="text item">地址详情: {{ i.addressDetail }}</div>
                        <div class="button">
                            <el-button class="button-detail" type="text" @click="handleUpdate(i)">修改</el-button>
                            <el-button class="button-detail" type="text" @click="handleDelete(i)">删除</el-button>
                        </div>
                    </div>
                </el-card>
            </el-space>
        </div>
    </div>

    <el-dialog v-model="dialogFormVisible" :title="textMap[dialogStatus]">
        <el-form :model="defaultForm">
            <el-form-item label="领用人" :label-width="formLabelWidth">
                <el-input v-model="defaultForm.receiver" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="使用人" :label-width="formLabelWidth">
                <el-input v-model="defaultForm.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="领用人电话号码" :label-width="formLabelWidth">
                <el-input v-model="defaultForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址选择" :label-width="formLabelWidth">
                <div class="block">
                    <el-cascader placeholder="请选择地址" :options="options" filterable disabled />
                </div>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-input
                    v-model="defaultForm.addressDetail"
                    :rows="2"
                    type="textarea"
                    placeholder="请填写详细地址"
                />
            </el-form-item>
            <el-form-item label="地址标签" :label-width="formLabelWidth">
                <el-input v-model="defaultForm.tag" :rows="2" placeholder="请填写地址标签" disabled />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>

                <el-button v-if="dialogStatus == 'update'" type="primary" @click="updateData()">确定</el-button>
                <el-button v-else type="primary" @click="createData()">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { CirclePlusFilled } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import store from '../../store';
import { listUserAddressAPI, updateUserAddressAPI, createUserAddressAPI, deleteUserAddressAPI } from '../../api/user-address'
import storage from '../../utils/storage';

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '120px'
const textarea = ref('')
const props = {
    multiple: true,
}

const username = store.getters.name
const tableData = ref([])
const dialogStatus = ref('')

const getList = () => {
    // defaultList.value.userId = store.getters.userId
    defaultForm.value.userId = storage.get("USER_ID")

    listUserAddressAPI(defaultForm.value).then(res => {
        tableData.value = res.data
        console.log("tableData", tableData.value)
    }).catch()
}

const handleCreateAddress = () => {
    defaultForm.value = { ...defaultFormTemp }
    defaultForm.value.userId = storage.get("USER_ID")
    dialogStatus.value = "create"
    dialogFormVisible.value = true
}

const createData = () => {
    createUserAddressAPI(defaultForm.value).then(res => {
        console.log("ressssssssssssss:", res)
        ElMessage({
            type: 'success',
            message: '创建地址成功',
        })
        getList()
    })
    dialogFormVisible.value = false
}

// const createdAddress

const handleUpdate = (i) => {
    console.log(i)
    dialogStatus.value = "update"
    dialogFormVisible.value = true
    defaultForm.value = i
}

const updateData = () => {
    updateUserAddressAPI(defaultForm.value).then(res => {
        ElMessage({
            type: 'success',
            message: '修改地址成功',
        })
        getList()
    }).catch(
        console.log("false")
    )
    dialogFormVisible.value = false
    dialogStatus == ''
}

const handleDelete = (i) => {
    ElMessageBox.confirm('是否删除地址', '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            deleteUserAddressAPI(i).then(res => {
                ElMessage({
                    type: 'success',
                    message: '删除地址成功',
                })
                getList()
            })
        })

}

const defaultFormTemp = reactive({
    userId: '',
    receiver: '',
    user: '',
    phone: '',
    // addressSelect:'',
    addressDetail: '',
    // tag:[],
})

const defaultForm = ref(Object.assign({}, defaultFormTemp))
const textMap = {
    update: '编辑收货地址',
    create: '创建收货地址'
}


const options = [
    {
        value: 'guide',
        label: 'Guide',
        children: [
            {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                    {
                        value: 'consistency',
                        label: 'Consistency',
                    },
                    {
                        value: 'feedback',
                        label: 'Feedback',
                    },
                    {
                        value: 'efficiency',
                        label: 'Efficiency',
                    },
                    {
                        value: 'controllability',
                        label: 'Controllability',
                    },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                    {
                        value: 'side nav',
                        label: 'Side Navigation',
                    },
                    {
                        value: 'top nav',
                        label: 'Top Navigation',
                    },
                ],
            },
        ],
    },
    {
        value: 'component',
        label: 'Component',
        children: [
            {
                value: 'basic',
                label: 'Basic',
                children: [
                    {
                        value: 'layout',
                        label: 'Layout',
                    },
                    {
                        value: 'color',
                        label: 'Color',
                    },
                    {
                        value: 'typography',
                        label: 'Typography',
                    },
                    {
                        value: 'icon',
                        label: 'Icon',
                    },
                    {
                        value: 'button',
                        label: 'Button',
                    },
                ],
            },
            {
                value: 'form',
                label: 'Form',
                children: [
                    {
                        value: 'radio',
                        label: 'Radio',
                    },
                    {
                        value: 'checkbox',
                        label: 'Checkbox',
                    },
                    {
                        value: 'input',
                        label: 'Input',
                    },
                    {
                        value: 'input-number',
                        label: 'InputNumber',
                    },
                    {
                        value: 'select',
                        label: 'Select',
                    },
                    {
                        value: 'cascader',
                        label: 'Cascader',
                    },
                    {
                        value: 'switch',
                        label: 'Switch',
                    },
                    {
                        value: 'slider',
                        label: 'Slider',
                    },
                    {
                        value: 'time-picker',
                        label: 'TimePicker',
                    },
                    {
                        value: 'date-picker',
                        label: 'DatePicker',
                    },
                    {
                        value: 'datetime-picker',
                        label: 'DateTimePicker',
                    },
                    {
                        value: 'upload',
                        label: 'Upload',
                    },
                    {
                        value: 'rate',
                        label: 'Rate',
                    },
                    {
                        value: 'form',
                        label: 'Form',
                    },
                ],
            },
            {
                value: 'data',
                label: 'Data',
                children: [
                    {
                        value: 'table',
                        label: 'Table',
                    },
                    {
                        value: 'tag',
                        label: 'Tag',
                    },
                    {
                        value: 'progress',
                        label: 'Progress',
                    },
                    {
                        value: 'tree',
                        label: 'Tree',
                    },
                    {
                        value: 'pagination',
                        label: 'Pagination',
                    },
                    {
                        value: 'badge',
                        label: 'Badge',
                    },
                ],
            },
            {
                value: 'notice',
                label: 'Notice',
                children: [
                    {
                        value: 'alert',
                        label: 'Alert',
                    },
                    {
                        value: 'loading',
                        label: 'Loading',
                    },
                    {
                        value: 'message',
                        label: 'Message',
                    },
                    {
                        value: 'message-box',
                        label: 'MessageBox',
                    },
                    {
                        value: 'notification',
                        label: 'Notification',
                    },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                    {
                        value: 'menu',
                        label: 'Menu',
                    },
                    {
                        value: 'tabs',
                        label: 'Tabs',
                    },
                    {
                        value: 'breadcrumb',
                        label: 'Breadcrumb',
                    },
                    {
                        value: 'dropdown',
                        label: 'Dropdown',
                    },
                    {
                        value: 'steps',
                        label: 'Steps',
                    },
                ],
            },
            {
                value: 'others',
                label: 'Others',
                children: [
                    {
                        value: 'dialog',
                        label: 'Dialog',
                    },
                    {
                        value: 'tooltip',
                        label: 'Tooltip',
                    },
                    {
                        value: 'popover',
                        label: 'Popover',
                    },
                    {
                        value: 'card',
                        label: 'Card',
                    },
                    {
                        value: 'carousel',
                        label: 'Carousel',
                    },
                    {
                        value: 'collapse',
                        label: 'Collapse',
                    },
                ],
            },
        ],
    },
    {
        value: 'resource',
        label: 'Resource',
        children: [
            {
                value: 'axure',
                label: 'Axure Components',
            },
            {
                value: 'sketch',
                label: 'Sketch Templates',
            },
            {
                value: 'docs',
                label: 'Design Documentation',
            },
        ],
    },
]
getList()
</script>
<style scoped>
hr {
    width: 1004px;
}
.button {
    display: flex;
    justify-content: flex-end;
    margin-right: 5px;
}
.button > :deep().el-button {
    transition-property: opacity;
    transition-duration: 1s;
    opacity: 0;
}
.el-space__item:hover .button > :deep().el-button {
    transition-property: opacity;
    transition-duration: 1s;
    opacity: 1;
}
.el-space {
    margin-left: 20px;
}
.address {
    margin: 25px;
}
.address-title {
    font-weight: 500;
}
.box-card {
    width: 280px;
    height: 200px;
    margin: 15px;
}
.address-detail {
    display: grid;
}
</style>