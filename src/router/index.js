import {
    createRouter,
    createWebHashHistory
} from "vue-router"
import Layout from "../views/Home.vue";
import AccountSetting from "../views/AccountSetting.vue";

export const constantRoutes = [
    {
        path: '/login',
        meta: {
            title: "登录",
        },
        component: () => import("../views/Login.vue")
    },
    {
        path: "",
        name: "Home",
        component: Layout,
        redirect: '/dashboard',
        meta: {
            title: "首页"
        },
        children: [{
            path: "/dashboard",
            name: "dashboard",
            meta: {
                title: '客户端首页',
            },
            component: () => import("../views/Dashboard.vue")
        },

        ]
    },
    {
        path: "/products",
        component: Layout,
        name: "Products",
        meta: {
            title: '商品页'
        },
        component: () => import("../views/Products.vue")
    }, {
        path: "/productDetail",
        component: Layout,
        name: "ProductDetail",
        meta: {
            title: '商品详情页'
        },
        component: () => import("../views/ProductDetail.vue")
    },
    {
        path: "/cart",
        component: Layout,
        name: "Cart",
        meta: {
            title: '购物车'
        },
        component: () => import("../views/Cart.vue")
    },
    // {
    //     path: "/apply",
    //     name: "Apply",
    //     meta: {
    //         title: '申请为在库耗材'
    //     },
    //     component: () => import("../views/Apply.vue")
    // },
    {
        path: "/confirmOrder",
        component: Layout,
        name: "ConfirmOrder",
        meta: {
            title: '确认订单'
        },
        component: () => import("../views/ConfirmOrder.vue")
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
                path: '/apply',
                name: 'Apply',
                meta: {
                    title: '申请耗材'
                },
                component: () => import('../views/order/Apply.vue')
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
    },
]

export const asyncRoutes = [
    //     {
    //     path: '/',
    //     redirect: '/dashboard'
    // }, 
    // {
    //     path: "/",
    //     name: "Home",
    //     component: Home,
    //     children: [{
    //         path: "/dashboard",
    //         name: "Dashboard",
    //         meta: {
    //             title: '客户端首页'
    //         },
    //         component: () => import("../views/Dashboard.vue")
    //     },
    //      {
    //         path: "/login",
    //         name: "Login",
    //         meta: {
    //             title: '登录页'
    //         },
    //         component: () => import("../views/Login.vue")
    //     }, 
]
// }]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

export function resetRouter() {
    const newRouter = createRouter({
        //路由模式带“#”号
        history: createWebHashHistory(),
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    })
    router.matcher = newRouter.matcher // reset router
}

export default router;