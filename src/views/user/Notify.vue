<template>
    <div class="notify">
        <div>
            <h2 class="notify-title">消息通知</h2>
        </div>
        <hr />
        <div>
            <!-- 使用过滤 -->
            <ul class="order-select-detail">
                <li>
                    <a href="#">全部消息</a>
                </li>
                <li>
                    <a href="#">订单消息</a>
                </li>
                <li>
                    <a href="#">系统消息</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped>
hr {
    width: 1004px;
}
a {
    text-decoration: none;
}
a:active {
    color: #409eff;
    text-decoration: none;
}
.notify {
    margin: 25px;
}
.notify-title {
    font-weight: 500;
}
.order-select-detail {
    margin: 0;
    margin-left: 10px;
    float: left;
    list-style-type: none;
    display: grid;
    grid-template-columns: auto auto auto auto;
    width: 400px;
    padding: 0px;
}
.notify-list {
    margin: 0;
    list-style-type: none;
    display: grid;
    grid-template-columns: 11% 11% 11% 11%;
    justify-items: center;
    width: 1004px;
    padding: 0px;
}
.notify-list-detail {
    padding: 24px;
    padding-top: 0px;
    padding-bottom: 0px;
}
.notify-list-borderedit {
    border-left: solid 2px;
}
</style>