<template>
    <div class="productDetail">
        <div class="productDetail-header">
            <div class="productDetail-header-title">
                <div class="productDetail-header-logo">
                    <a href="#">
                        <img
                            src="../assets/sysLogo.svg"
                            style="display:block;width:110px;height:auto"
                        />
                    </a>
                </div>
                <span class="productDetail-header-detail">耗材详情</span>
            </div>
            <div class="productDetail-header-search">
                <div class="productDetail-header-search-input">
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
        <div class="productDetail-bottom">
            <el-image :src="src"></el-image>
            <div class="productDetail-content">
                <div class="prodicutDetail-title">title</div>
                <div class="productDetail-info">info</div>
                <div class="productDetail-price">price</div>
                <hr />
                <div class="productDetail-model-select">
                    <span class="productDetail-select">选择型号</span>
                    <div class="productDetail-select-button">
                        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="productDetail-number-select">
                    <span class="productDetail-select">选择数量</span>
                    <div class="productDetail-select-button">
                        <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
                    </div>
                </div>
                <div class="productDetail-summary">
                    <div class="productDetail-summary-top">
                        <div class="productDetail-summary-info">summary-info</div>
                        <div class="productDetail-summary-price">summary-price</div>
                    </div>
                    <div class="productDetail-moneyCount">moneyCount</div>
                </div>
                <div class="productDetail-button">
                    <el-button>加入购物车</el-button>
                    <el-button>喜欢</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const search = ref('')
const input = ref('')
const src =
    'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
const value = ref('')

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
const num = ref(1)
const handleChange = (value) => {
    console.log(value)
}
</script>
<style scoped>
hr{
    margin: 20px 0 20px 0;
        color: #b0b0b080;
}
.productDetail {
    display: flex;
    flex-direction: column;
    width: 1190px !important;
    margin: auto;
}
.productDetail-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.productDetail-header {
    margin: 25px;
}
.productDetail-header-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.productDetail-header-detail {
    font-size: xx-large;
    font-family: "Courier New", Courier, monospace;
    margin: 5px;
}
.productDetail-header-search {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
}
.productDetail-header-search-input {
    width: 300px;
    border-radius: 15px;
}
.productDetail-header-search-input :deep() .el-input__inner,
.el-button.el-button--primary {
    height: 50px;
}
.productDetail-bottom {
    display: grid;
    grid-template-columns: 50% auto;
    background-color: white;
    margin-top: 10px;
}
.productDetail-bottom > .img {
    margin: 10px 0 10px 30px;
}
.productDetail-content {
    margin: 30px 10px 30px 0;
}
:deep().el-image__inner {
    width: 550px;
    height: 530px;
    margin: 30px 30px 30px 10px;
}
.prodicutDetail-title {
    margin: 0;
    padding: 10px 0 0;
    font-size: 30px;
    font-weight: 500;
}
.productDetail-info {
    margin: 10px 0 10px;
    color: #b0b0b0;
}
.productDetail-price {
    font-size: 18px;
    margin: 12px 0 12px;
}
.productDetail-model-select,
.productDetail-number-select .productDetail-select,
.productDetail-select-button {
    margin: 10px 0 10px 0;
}

.productDetail-summary {
    padding: 30px;
    margin-bottom: 30px;
    margin-top: 20px;
    background-color: rgba(241, 238, 238, 0.76);
}
.productDetail-summary-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.productDetail-moneyCount {
    margin-top: 20px;
    font-size: 24px;
}
.productDetail-button button{
    height: 50px;
}
.productDetail-button button:first-of-type{
    width: 200px;
}
.productDetail-button button:last-of-type{
    width: 100px;
}
</style>