import {
    createRouter,
    createWebHashHistory
} from "vue-router"
import Home from "../views/Home.vue";

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
        path: "/collects",
        name: "Collects",
        meta: {
            title: '收藏夹'
        },
        component: () => import("../views/Collects.vue")
    }, {
        path: "/orders",
        name: "Orders",
        meta: {
            title: '订单页'
        },
        component: () => import("../views/Orders.vue")
    }, {
        path: "/cart",
        name: "Cart",
        meta: {
            title: '购物车'
        },
        component: () => import("../views/Cart.vue")
    }, {
        path: "/accountSetting",
        name: "AccountSetting",
        meta: {
            title: '账号设置'
        },
        component: () => import("../views/AccountSetting.vue")
    }, {
        path: "/feedback",
        name: "Feedback",
        meta: {
            title: '反馈页'
        },
        component: () => import("../views/Feedback.vue")
    }, {
        path: "/apply",
        name: "Apply",
        meta: {
            title: '申请页'
        },
        component: () => import("../views/Apply.vue")
    }, ]
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;