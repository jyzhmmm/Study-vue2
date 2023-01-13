//  配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由信息
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter);
// 重写push|replace,解决返回promise对象，不传回调会控制台报错，代码没问题
// 先保存一份之前的方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

const router = new VueRouter({
    routes,
    // 滚动条行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的这个y代表滚动条位置
        return { y: 0 }
    }
})

// 全局路由守卫，前置守卫(跳转前调用)
router.beforeEach(async(to, from, next) => {
    // next:放行， next()   next('path')放行到指定路由    next(false)
    // 用户登陆了才会有token
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name
    if (token) {
        // 已经登录不能再去登录页和注册页
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {
            // 登录，去的不是login,是其他路由
            // 如果有用户名
            if (name) {
                next()
            } else {
                //没有用户信息，则获取信息
                // 获取用户信息在首页展示
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了，获取不到用户信息，重新登录
                    // 清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录不能去支付，交易相关，不能去个人中心
        let toPath = to.path;
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
            // 把未登录的时候要去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
});

export default router