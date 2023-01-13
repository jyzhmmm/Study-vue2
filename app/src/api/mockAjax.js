// 对于axios二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css"

//1.利用axios对象方法create，创建实例
const requests = axios.create({
    // 基础路径，发送请求时候，基础路径会带有api，不用手写了
    baseURL: '/mock',
    // 代表请求超过时间，则请求失败
    timeout: 5000,
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些处理

requests.interceptors.request.use((config) => {
        // config:配置对象，里面有一个重要属性，headers请求头
        // 进度条开始动
        nprogress.start()
        return config
    })
    // 响应拦截器
requests.interceptors.response.use((resolve) => {
    nprogress.done()
    return resolve.data;
}, (error) => {
    return Promise.reject(new Error('faile'))
})

export default requests;