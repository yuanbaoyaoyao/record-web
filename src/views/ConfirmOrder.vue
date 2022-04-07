<template>
    <div>
        <div class="layout-header">
            <v-header />
        </div>
        <div class="confirm">
            <div class="confirm-header">
                <div class="confirm-header-title">
                    <div class="confirm-header-logo">
                        <a href="#">
                            <img
                                src="../assets/sysLogo.svg"
                                style="display:block;width:110px;height:auto"
                            />
                        </a>
                    </div>
                    <span class="confirm-header-detail">确认订单</span>
                </div>
                <div class="confirm-header-search">
                    <div class="confirm-header-search-input">
                        <el-input
                            v-model="input"
                            placeholder="Please input"
                            :prefix-icon="Search"
                            clearable
                        />
                    </div>
                    <div class="search-button">
                        <el-button type="primary">Search</el-button>
                    </div>
                </div>
            </div>
            <div class="confirm-bottom">
                <div class="confirm-address">
                    <span class="confirm-address-title">确认地址</span>
                    <div>
                        <el-space wrap>
                            <el-button
                                v-for="i in userAddress"
                                :key="i"
                                @click="handleSelectAddress(i)"
                            >
                                <el-card class="box-card">
                                    <template #header>
                                        <div class="card-header">
                                            <span>{{ i.receiver }}</span>
                                        </div>
                                    </template>
                                    <div class="confirm-address-detail">
                                        <div class="text item">领用人: {{ i.receiver }}</div>
                                        <div class="text item">使用人: {{ i.user }}</div>
                                        <div class="text item">领用人电话号码: {{ i.phone }}</div>
                                        <div class="text item">地址详情: {{ i.addressDetail }}</div>
                                        <div class="button">
                                            <el-button
                                                class="button-detail"
                                                type="text"
                                                @click="handleUpdateAddress(i)"
                                            >修改</el-button>
                                        </div>
                                    </div>
                                </el-card>
                            </el-button>

                            <template v-if="addressVisible">
                                <el-button
                                    :icon="CirclePlusFilled"
                                    class="box-card"
                                    type="primary"
                                    @click="dialogFormVisible = true"
                                >添加新地址</el-button>
                            </template>
                        </el-space>
                    </div>
                    <template v-if="!addressVisible">
                        <el-button
                            class="extendAddress"
                            type="info"
                            plain
                            @click="extendAddress"
                        >显示全部地址</el-button>
                    </template>
                    <template v-if="addressVisible">
                        <el-button
                            class="extendAddress"
                            type="info"
                            plain
                            @click="extendAddress"
                        >收起更多地址</el-button>
                    </template>
                </div>
                <div class="confirm-order">
                    <span class="confirm-order-title">确认订单信息</span>
                    <div class="confirm-order-detail">
                        <span>耗材图片</span>
                        <span>耗材类别</span>
                        <span>耗材型号</span>
                        <span>耗材数量</span>
                    </div>
                    <div class="confirm-order-detail" v-for="i in cartCheckedDetail" :key="i">
                        <el-image :src="i.avatar"></el-image>
                        <span>{{ i.productName }}</span>
                        <span>{{ i.title }}</span>
                        <span>{{ i.number }}</span>
                        <!-- <span>{{ i.number * i.price }}元</span> -->
                    </div>
                    <hr />
                </div>
                <div class="confirm-order-summary">
                    <div class="confirm-order-numberCount">
                        <div>商品件数:</div>
                        <div>{{ countNumber }}件</div>
                    </div>
                    <!-- <div class="confirm-order-moneyCount">
                    <div>应付总额:</div>
                    <div>627元</div>
                    </div>-->
                    <hr />
                </div>
                <div class="confirm-order-bottom">
                    <div>
                        <div class="confirm-order-bottom-left" v-if="userAddressSelected != null">
                            <div>
                                <span>{{ userAddressSelected.receiver }}</span>
                                <span>{{ userAddressSelected.phone }}</span>
                            </div>
                            <span>{{ userAddressSelected.addressDetail }}</span>
                        </div>
                    </div>
                    <div class="confirm-button">
                        <el-button type="info" @click="handleReturnToCart()">返回购物车</el-button>
                        <el-button type="primary" @click="handleCreateOrder()">提交订单</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <el-dialog v-model="dialogFormVisible" title="添加收货地址">
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
                <el-button type="primary" @click="updateDataAddress()">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import vHeader from "../components/Header.vue"
import { CirclePlusFilled, Search } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import router from '../router'
import { listCartCheckedAPI, deleteCartAPI } from '../api/cart'
import { updateUserAddressAPI } from '../api/user-address'
import { listProductSkusSearchAPI, updateProductSkusAPI } from '../api/product-skus'
import { listUserAddressAPI } from '../api/user-address'
import { createUserOrderAPI } from '../api/user-order'
import { createOrderProductAPI } from '../api/order-product'
// import{}
import storage from '../utils/storage'

const search = ref('')
const input = ref('')
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '120px'
const textarea = ref('')
const props = {
    multiple: true,
}
const addressVisible = ref(false)
const src =
    'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
const addressArray = ref([
    {
        name: 'yuanbao',
        phone: '123123',
        address: 'sdfsdf',
        aLabel: 'yyyyy'
    },
    {
        name: 'yuanbao',
        phone: '123123',
        address: 'sdfsdf',
        aLabel: 'yyyyy'
    },
    {
        name: 'yuanbao',
        phone: '123123',
        address: 'sdfsdf',
        aLabel: 'yyyyy'
    },
    {
        name: 'yuanbao',
        phone: '123123',
        address: 'sdfsdf',
        aLabel: 'yyyyy'
    },
    {
        name: 'yuanbao',
        phone: '123123',
        address: 'sdfsdf',
        aLabel: 'yyyyy'
    },
]);

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
const tempAddressArray = ref([]);
tempAddressArray.value = addressArray.value.slice(0, 4)
const cartCheckedDetail = ref([])
const cartListData = ref([])
const countNumber = ref(0)
const userAddress = ref([])
const userAddressSelected = ref()

const updateDataAddress = () => {

    updateUserAddressAPI(defaultForm.value).then(res => {
        getUserAddress()
    }).catch(
        console.log("false")
    )
    dialogFormVisible.value = false
}

const getCartCheckedList = () => {
    let tempInfo = { userId: storage.get("USER_ID") }
    listCartCheckedAPI(tempInfo).then(res => {
        cartListData.value = res.data
        countNumber.value = 0
        console.log("cartListData", cartListData.value)
        for (let i = 0; i < cartListData.value.length; i++) {
            countNumber.value += cartListData.value[i].productSkusNumber
            let tempCartDetail = { id: cartListData.value[i].productSkusId }
            listProductSkusSearchAPI(tempCartDetail).then(resCartDetail => {
                resCartDetail.data[0].number = cartListData.value[i].productSkusNumber
                cartCheckedDetail.value.push(resCartDetail.data[0])
                console.log("cartCheckedDetail", cartCheckedDetail.value)
            })
        }
    })
}

const getUserAddress = () => {
    let tempInfo = { userId: storage.get("USER_ID") }
    listUserAddressAPI(tempInfo).then(res => {
        userAddress.value = res.data
        console.log("userAddress", userAddress.value)
    })
}

const handleUpdateAddress = (i) => {
    console.log(i)
    // dialogStatus.value = "update"
    dialogFormVisible.value = true
    defaultForm.value = i
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

const defaultForm = ref(Object.assign({}, defaultFormTemp));


const handleSelectAddress = (address) => {
    userAddressSelected.value = address
    console.log("userAddressSelected", userAddressSelected.value)
}

const handleCreateOrder = () => {
    if (userAddressSelected.value == null) {
        ElMessage({
            type: 'info',
            message: '请选择地址',
        })
    } else {
        let tempOrderInfo = {
            userId: storage.get("USER_ID"),
            userAddressId: userAddressSelected.value.id,
            receiver: userAddressSelected.value.receiver,
            user: userAddressSelected.value.user,
            addressDetail: userAddressSelected.value.addressDetail
        }
        createUserOrderAPI(tempOrderInfo).then(res => {
            for (let i = 0; i < cartCheckedDetail.value.length; i++) {
                let tempOrderProductInfo = {
                    orderSn: res.data.orderSn,
                    userOrderId: res.data.id,
                    productId: cartCheckedDetail.value[i].productId,
                    productSkusId: cartCheckedDetail.value[i].id,
                    productTitle: cartCheckedDetail.value[i].productName,
                    productSkusTitle: cartCheckedDetail.value[i].title,
                    number: cartCheckedDetail.value[i].number
                }
                let tempProductSkusInfo = {
                    id: cartCheckedDetail.value[i].id,
                }
                listProductSkusSearchAPI(tempProductSkusInfo).then(resProductSKus => {
                    let tempUpdatedProductSKusInfo = {
                        id: cartCheckedDetail.value[i].id,
                        stock: resProductSKus.data[0].stock - tempOrderProductInfo.number
                    }
                    updateProductSkusAPI(tempUpdatedProductSKusInfo).then(resUpdate => {
                        createOrderProductAPI(tempOrderProductInfo).then(resCreateOrder => {
                            deleteCartAPI(cartListData.value[i]).then(resDelete => {
                                console.log("resDeleteeeeeeeeeee:", resDelete)
                            })
                            if (i == cartCheckedDetail.value.length - 1) {
                                ElMessageBox.alert('订单提交成功', '提示',
                                    {
                                        confirmButtonText: '确定',
                                        type: 'success',
                                    }).then(() => {
                                        router.push("/orders")
                                    })
                            }
                        })
                    })

                })

            }
        })
    }

}

const handleReturnToCart = () => {
    router.push("/cart")
}

const extendAddress = () => {
    addressVisible.value = !addressVisible.value
    tempAddressArray.value = addressArray.value
    if (addressVisible.value == false) {
        tempAddressArray.value = addressArray.value.slice(0, 4)
    }
    else {
        tempAddressArray.value = addressArray.value
    }
}

getCartCheckedList()
getUserAddress()
</script>
<style scoped>
.layout-header {
    margin-bottom: 30px;
}
.confirm-order-bottom-left {
    margin-left: 30px;
}
.confirm-order-bottom-left span {
    margin-right: 20px;
}
.confirm-order-bottom {
    display: flex;
    justify-content: space-between;
}
.confirm-button {
    margin: 0 30px 10px 0;
}
.confirm-address-detail {
    display: grid;
    grid-template-rows: auto auto auto auto 10%;
}

button.el-button.el-button--info.is-plain.extendAddress {
    margin: 20px;
    margin-bottom: 30px;
}
hr {
    margin: 20px 0 20px 0;
    color: #b0b0b080;
}
.confirm {
    display: flex;
    flex-direction: column;
    width: 1190px !important;
    margin: auto;
}
.confirm-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.confirm-header {
    margin: 25px;
}
.confirm-header-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.confirm-address-title,
.confirm-order-title {
    margin: 25px;
    margin-left: 35px;
    font-family: sans-serif;
    font-weight: 500;
    font-size: larger;
}
.confirm-header-detail {
    font-size: xx-large;
    font-family: "Courier New", Courier, monospace;
    margin: 5px;
}
:deep().confirm-order-detail img {
    width: 60px;
    height: 60px;
}
.confirm-order-detail {
    display: grid;
    grid-template-columns: 10% auto auto auto;
    margin: 25px;
    text-align: center;
}
.confirm-header-search {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
}
.confirm-header-search-input {
    width: 300px;
    border-radius: 15px;
}
.confirm-header-search-input :deep() .el-input__inner,
.el-button.el-button--primary {
    height: 50px;
}
.confirm-bottom {
    background-color: white;
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
.el-button.el-button--primary.box-card {
    height: 200px;
    width: 250px;
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
    width: 250px;
    height: 200px;
    margin: 15px;
}
.confirm-address {
    display: flex;
    flex-direction: column;
}
.confirm-address .el-button {
    padding: 1px;
    margin-right: 16px;
    margin-left: 10px;
}
.box-card[data-v-2c101ab0] {
    margin: 0;
}
.confirm-order hr,
.confirm-order-summary hr {
    margin-left: 30px;
    margin-right: 30px;
}
.confirm-order-summary {
    display: grid;
}
.confirm-order-numberCount,
.confirm-order-moneyCount {
    display: grid;
    grid-template-columns: 93% auto;
    justify-items: end;
    margin-right: 30px;
}
.el-button.el-button--info.is-plain {
    margin: 0 30px 10px 30px;
}
</style>