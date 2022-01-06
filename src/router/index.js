import {
    createRouter,
    createWebHashHistory
} from "vue-router"
import Home from "../views/Home.vue";
import AccountSetting from "../views/AccountSetting.vue";

const routes = [{
    path: '/',
    redirect: '/dashboard'
}, {
    path: "/",
    name: "Home",
    component: Home,
    children: [{
        path: "/dashboard",
        name: "Dashboard",
        meta: {
            title: '客户端首页'
        },
        component: () => import("../views/Dashboard.vue")
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录页'
        },
        component: () => import("../views/Login.vue")
    }, {
        path: "/products",
        name: "Products",
        meta: {
            title: '商品页'
        },
        component: () => import("../views/Products.vue")
    }, {
        path: "/productDetail",
        name: "ProductDetail",
        meta: {
            title: '商品详情页'
        },
        component: () => import("../views/ProductDetail.vue")
    }, {
        path: "/cart",
        name: "Cart",
        meta: {
            title: '购物车'
        },
        component: () => import("../views/Cart.vue")
    }, {
        path: '/accountSetting',
        component: AccountSetting,
        redirect: '/notify',
        children: [

            {
                path: '/notify',
                name: 'Notify',
                meta: {
                    title: '消息通知'
                },
                component: () => import('../views/user/Notify.vue')
            },
            {
                path: '/deliveryAddress',
                name: 'DeliveryAddress',
                meta: {
                    title: '收货地址'
                },
                component: () => import('../views/user/DeliveryAddress.vue')
            },
            {
                path: '/collects',
                name: 'Collects',
                meta: {
                    title: '我的收藏'
                },
                component: () => import('../views/user/Collects.vue')
            }, {
                path: '/feedback',
                name: 'Feedback',
                meta: {
                    title: '我的反馈'
                },
                component: () => import('../views/user/Feedback.vue')
            }, {
                path: '/orders',
                name: 'Orders',
                meta: {
                    title: '我的订单'
                },
                component: () => import('../views/order/Orders.vue')
            }, {
                path: '/rate',
                name: 'Rate',
                meta: {
                    title: '我的评价'
                },
                component: () => import('../views/order/Rate.vue')
            }, {
                path: '/userInfo',
                name: 'UserInfo',
                meta: {
                    title: '个人信息'
                },
                component: () => import('../views/account/UserInfo.vue')
            }, {
                path: '/passwordEdit',
                name: 'PasswordEdit',
                meta: {
                    title: '修改密码'
                },
                component: () => import('../views/account/PasswordEdit.vue')
            }
        ]
    }, ]
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;