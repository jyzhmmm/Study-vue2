import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
import { getUUID } from '@/utils/uuid_token'
const actions = {
    // 获取产品信息
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车
    // 服务器写入数据成功，没有返回其他数据，因此不需要在写其他存储数据
    // async 函数执行返回一个promise（要么成功，要么失败）
    async AddOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum) //axios封装返回的是Promise
        if (result.code === 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}

const state = {
    goodInfo: {},
    uuid_token: getUUID()
}
const getters = {
    categoryView(state) {
        // state.goodInfo初始状态是空对象，空对象的categoryView属性值是undefined
        // 当前计算出的属性值至少是一个空对象，假的报错就不会有了
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}