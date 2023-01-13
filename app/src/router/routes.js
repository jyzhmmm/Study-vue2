// // 引入路由组件
// import Home from '../pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// // 引入二级路由组件
// import Myorder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'

// export default [{
//         path: "/home",
//         component: Home,
//         meta: { show: true }
//     },
//     {
//         path: "/center",
//         component: Center,
//         meta: { show: true },
//         children: [{
//                 path: 'myorder',
//                 component: Myorder,
//             },
//             {
//                 path: 'grouporder',
//                 component: GroupOrder,
//             },
//             {
//                 path: '/center',
//                 redirect: '/center/myorder'
//             }
//         ]
//     },
//     {
//         name: 'search',
//         path: "/search/:keyword?",
//         component: Search,
//         meta: { show: true }
//     },
//     {
//         path: "/detail/:skuid",
//         component: Detail,
//         meta: { show: true }
//     },
//     {
//         name: 'addcartsuccess',
//         path: "/addcartsuccess",
//         component: AddCartSuccess,
//         meta: { show: true }
//     },
//     {
//         path: "/shopcart",
//         component: ShopCart,
//         meta: { show: true }
//     },
//     {
//         path: "/login",
//         component: Login,
//         meta: { show: false }
//     },
//     {
//         path: "/register",
//         component: Register,
//         meta: { show: false }
//     },
//     {
//         path: "/trade",
//         component: Trade,
//         meta: { show: false },
//         // 路由独享守卫
//         beforeEnter: (to, from, next) => {
//             if (from.path == '/shopcart') {
//                 next()
//             } else {
//                 //其他的路由组件而来，停留在当前
//                 next(false)
//             }
//         }
//     },
//     {
//         path: "/pay",
//         component: Pay,
//         meta: { show: false },
//         beforeEnter: (to, from, next) => {
//             if (from.path == '/trade') {
//                 next()
//             } else {
//                 //其他的路由组件而来，停留在当前
//                 next(false)
//             }
//         }
//     },
//     {
//         path: "/paysuccess",
//         component: PaySuccess,
//         meta: { show: false }
//     },
//     //  重定向，在项目跑起来的时候，访问/,立马让他定向到给定位置
//     {
//         path: '*',
//         redirect: '/home'
//     }
// ]

export default [{
        path: "/center",
        component: () =>
            import ("@/pages/Center"), // 路由懒加载使用
        //二级路由
        children: [{
                // path: '/center/myorder',
                path: "myorder",
                component: () =>
                    import ("@/pages/Center/myOrder"),
            },
            {
                path: "grouporder",
                component: () =>
                    import ("@/pages/Center/groupOrder"),
            },
            { //重定向一上来就展示myorder组件
                path: '',
                redirect: 'myorder'
            }
        ],
        meta: {
            show: true,
        },
    },
    {
        path: "/paySuccess",
        component: () =>
            import ("@/pages/PaySuccess"),
        meta: {
            show: true,
        },
    },
    {
        path: "/pay",
        component: () =>
            import ("@/pages/Pay"),
        meta: {
            show: true,
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/trade",
        component: () =>
            import ("@/pages/Trade"),
        meta: {
            show: true,
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/shopcart",
        component: () =>
            import ("@/pages/ShopCart"),
        name: "ShopCart",
        meta: {
            show: true,
        },
    },
    {
        path: "/addCartsuccess",
        component: () =>
            import ("@/pages/AddCartSuccess"),
        name: "addcartsuccess",
        meta: {
            show: true,
        },
    },
    {
        path: "*",
        redirect: "/Home", //一上来就展示首页
    },
    {
        path: "/detail/:skuid",
        component: () =>
            import ("@/pages/Detail"),
        meta: {
            show: true,
        },
    },
    {
        path: "/login",
        component: () =>
            import ("@/pages/Login"),
        meta: {
            show: true,
        },
    },
    {
        path: "/home",
        component: () =>
            import ("@/pages/Home"),
    },
    {
        path: "/register",
        component: () =>
            import ("@/pages/Register"),
    },
    {
        path: "/search/:keyword?",
        name: "search",
        component: () =>
            import ("@/pages/Search"),
        meta: {
            show: true,
        },
        props: ($route) => ({
            keyword: $route.params.keyword,
            k: $route.query.k,
        }),
    },
];