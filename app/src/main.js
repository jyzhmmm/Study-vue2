import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
//全局轮播组件
import Carousel from '@/components/Caarousel'
// 全局分页器组件
import Pagination from '@/components/Pagination'
// elementui组件
import { Button, MessageBox } from 'element-ui'
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
    // 全局引入
Vue.component(Button.name, Button)
    // ellmentui注册组件，挂载在原型
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
//引入MockServer.js  ---mock数据
import '@/mock/mockServer'
//引入swiper样式
import 'swiper/css/swiper.css'

// 统一接口api文件夹所有请求函数
import * as API from '@/api'

Vue.config.productionTip = false
    // 测试axios请求
import { reqCategoryList } from '@/api'

// 引入图片懒加载
import VueLazyLoad from 'vue-lazyload'
import zp from '@/assets/IMG_9298.png'
Vue.use(VueLazyLoad, {
        // 懒加载默认图片
        loading: zp
    })
    // 引入表单验证插件
import '@/plugins/validate'
new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
        // 原理和$bus一样，所有api请求可以使用
        Vue.prototype.$API = API;
    },
    router,
    store
}).$mount('#app')