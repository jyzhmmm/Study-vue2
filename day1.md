项目运行起来，让浏览器自动打开  --open
"scripts": {
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    },

路由跳转两种写法
声明式：<router-Link to=""></router-Link>
编程式导航：$router.push|replace方法，实现路由跳转，（灵活）

路由传参两种写法
params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
query参数：不属于路径当中的一部分，类似于ajax中的queryString /home?k=v&v=,不需要占位

1.路由传递参数path不可以结合params参数使用，需要使用命名name方式跳转
2.如何指定params参数可传可不传：（不传而且占位了params参数，就会路径出现异常）在配置路由的时候，在占位的params参数后面加上？     例如：  ：xx?
3.params参数可传可不传，如果传递的是空串，如何解决？（params参数传递空串，也会路径出现异常）  使用undefined解决，参数传递或上undefined
4.路由组件能不能传递props数据？ 可以传递，有3种方式：对象，布尔值（只能传递params参数），函数

axios二次封装
一般在项目的api文件夹里，axios有请求拦截器和响应拦截器
请求拦截器在发请求之前可以处理一些业务； 响应拦截器，当服务器返回数据以后可以处理一些业务

卡顿现象：
正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿）
节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次

三级联动组件跳转与传递参数：
三级联动用户可以点击 一二三级分类，当你点击的时候home模块跳转到search模块，用户选中的产品数据会在路由跳转进行传递。

三级联动：如果使用声明式路由导航，可以跳转和传参，但是会出现卡顿现象

route-link：可以一个组件，当服务器的数据返回之后，循环出很多的route-link组件实例（很多个）
创建组件实例时候，一瞬间创建很多个实例很耗内存，因此会出现卡顿现象。

data-xxx 是自定义属性的规范，只有在属性前加上data-才是自定义属性

