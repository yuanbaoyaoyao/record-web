<template>
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
                <span>确认地址</span>
                <div>
                    <el-space wrap>
                        <el-card v-for="i in tempAddressArray" :key="i" class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>{{ i.name }}</span>
                                </div>
                            </template>
                            <span class="text item">{{ i.phone }}</span>
                            <div class="button">
                                <el-button class="button-detail" type="text">修改</el-button>
                            </div>
                        </el-card>
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
                    <el-button type="info" plain @click="extendAddress">显示全部地址</el-button>
                </template>
                <template v-if="addressVisible">
                    <el-button type="info" plain @click="extendAddress">收起更多地址</el-button>
                </template>
            </div>
            <div class="confirm-order">
                <span>确认订单信息</span>
                <div class="confirm-order-detail" v-for="i in orderDetail" :key="i">
                    <el-image :src="i.url"></el-image>
                    <span>{{ i.title }}</span>
                    <span>{{ i.price }}元x{{ i.number }}</span>
                    <span>{{ i.number * i.price }}元</span>
                </div>
                <hr />
            </div>
            <div class="confirm-order-summary">
                <div class="confirm-order-numberCount">
                    <div>商品件数:</div>
                    <div>3件</div>
                </div>
                <div class="confirm-order-moneyCount">
                    <div>应付总额:</div>
                    <div>627元</div>
                </div>
                <hr />
            </div>
            <div class="confirm-button">
                <el-button type="info">返回购物车</el-button>
                <el-button type="primary">提交订单</el-button>
            </div>
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
            <el-form-item label="地址选择" :label-width="formLabelWidth">
                <div class="block">
                    <el-cascader placeholder="Try searchingL Guide" :options="options" filterable />
                </div>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="地址标签" :label-width="formLabelWidth">
                <el-input v-model="form.name" :rows="2" placeholder="Please input" />
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

import { CirclePlusFilled, Search } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

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

const orderDetail = ref([
    {
        url: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1598011697.94968913.jpg?thumb=1&w=30&h=30',
        title: '小米定制心想甄选胶囊咖啡 馥郁香浓',
        price: '199',
        number: '6',
    },
    {
        url: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1598011697.94968913.jpg?thumb=1&w=30&h=30',
        title: '小米定制心想甄选胶囊咖啡 馥郁香浓',
        price: '199',
        number: '6',
    },
    {
        url: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1598011697.94968913.jpg?thumb=1&w=30&h=30',
        title: '小米定制心想甄选胶囊咖啡 馥郁香浓',
        price: '199',
        number: '6',
    },
    {
        url: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1598011697.94968913.jpg?thumb=1&w=30&h=30',
        title: '小米定制心想甄选胶囊咖啡 馥郁香浓',
        price: '199',
        number: '6',
    },
    {
        url: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1598011697.94968913.jpg?thumb=1&w=30&h=30',
        title: '小米定制心想甄选胶囊咖啡 馥郁香浓',
        price: '199',
        number: '6',
    },
])

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
</script>
<style scoped>
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
.confirm-header-detail {
    font-size: xx-large;
    font-family: "Courier New", Courier, monospace;
    margin: 5px;
}
:deep().confirm-order-detail img {
    width: 30px;
    height: 30px;
}
.confirm-order-detail {
    display: grid;
    grid-template-columns: 10% auto 30% 10%;
    margin: 25px;
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
.confirm-button{
    display: flex;
    justify-content: end;
    margin:0 30px 10px 0;
}
</style>