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
        redirect: '/userInfo',
        children: [{
            path: '/userInfo',
            name: 'UserInfo',
            meta: {
                title: '个人信息'
            },
            component: () => import('../views/UserInfo.vue')
        }, {
            path: '/deliveryAddress',
            name: 'DeliveryAddress',
            meta: {
                title: '收货地址'
            },
            component: () => import('../views/deliveryAddress.vue')
        }, {
            path: '/collects',
            name: 'Collects',
            meta: {
                title: '我的收藏'
            },
            component: () => import('../views/collects.vue')
        }, {
            path: '/feedback',
            name: 'Feedback',
            meta: {
                title: '我的反馈'
            },
            component: () => import('../views/feedback.vue')
        }, {
            path: '/orders',
            name: 'Orders',
            meta: {
                title: '我的订单'
            },
            component: () => import('../views/orders.vue')
        }, {
            path: '/rate',
            name: 'Rate',
            meta: {
                title: '我的评价'
            },
            component: () => import('../views/rate.vue')
        }, {
            path: '/apply',
            name: 'Apply',
            meta: {
                title: '我的申请'
            },
            component: () => import('../views/apply.vue')
        }]
    },]
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;