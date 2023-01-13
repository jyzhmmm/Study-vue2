// 当前模块：API接口统一管理
import requests from "./request";

import mockRequests from './mockAjax';

// 三级联动的接口
//  /api/product/getBaseCategoryList  get 无参数

export const reqCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

//获取bannner（home首页轮播图接口）
export const reqGetBannerList = () => {
    return mockRequests.get('/banner')
}

// 获取floor数据
export const reqFloorList = () => {
    return mockRequests.get('/floor')
}

// 获取search模块数据  地址：/api/list  请求方式：post  请求需要带参数
// 当前这个接口，给服务器传参数，至少是一个空对象
export const reqGetSearchInfo = (params) => {
        return requests({
            url: '/list',
            method: 'post',
            data: params
        })
    }
    // 获取产品信息的接口  url:/api/item/{skuId}  get  
export const reqGoodsInfo = (skuId) => {
        return requests({
            url: `/item/${skuId}`,
            method: 'get',
        })
    }
    // 将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
        return requests({
            url: `/cart/addToCart/${skuId}/${skuNum}`,
            method: 'post'
        })
    }
    // 获取购物车列表数据接口
export const reqCartList = () => {
        return requests({
            url: `/cart/cartList`,
            method: 'get'
        })
    }
    // 删除购物车产品接口
export const reqDeleteCartById = (skuId) => {
        return requests({
            url: `/cart/deleteCart/${skuId}`,
            method: 'delete'
        })
    }
    // 修改商品选中的状态
export const reqUpdateCheckedById = (skuId, isChecked) => {
        return requests({
            url: `/cart/checkCart/${skuId}/${isChecked}`,
            method: 'get'
        })
    }
    // 获取验证码
export const reqGetCode = (phone) => {
        return requests({
            url: `/user/passport/sendCode/${phone}`,
            method: 'get'
        })
    }
    // 注册
export const reqUserRegister = (data) => {
        return requests({
            url: `/user/passport/register`,
            data,
            method: 'post'
        })
    }
    // 登录
export const reqUserLogin = (data) => {
        return requests({
            url: `/user/passport/login`,
            data,
            method: 'post'
        })
    }
    //  获取用户信息【带着token给服务器】
export const reqUserInfo = () => {
        return requests({
            url: `/user/passport/auth/getUserInfo`,
            method: 'get'
        })
    }
    // 退出登录
export const reqLogout = () => {
        return requests({
            url: `/user/passport/logout`,
            method: 'get'
        })
    }
    // 获取用户地址信息
export const reqAddressInfo = () => {
        return requests({
            url: `/user/userAddress/auth/findUserAddressList`,
            method: 'get'
        })
    }
    // 获取商品清单
export const reqOrderInfo = () => {
        return requests({
            url: `/order/auth/trade`,
            method: 'get'
        })
    }
    // 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
        return requests({
            url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
            data,
            method: 'post'
        })
    }
    //  获取支付信息
export const reqPayInfo = (orderId) => {
        return requests({
            url: `/payment/weixin/createNative/${orderId}`,
            method: 'get'
        })
    }
    // 获取支付订单状态
export const reqPayStatus = (orderId) => {
        return requests({
            url: `/payment/weixin/queryPayStatus/${orderId}`,
            method: 'get'
        })
    }
    // 获取个人中心数据
export const reqMyOrderList = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })
}