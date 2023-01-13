import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车某一个产品
    async deleteCartListByskuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code === 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某个产品选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked); // 修改服务器里数据，没有返回数据
        if (result.code === 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = []
            // 获取购物车全部产品
        getters.cartList.cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? dispatch('deleteCartListByskuId', item.skuId) : ''
                PromiseAll.push(promise)
            })
            //  Promise.all()里面放数组，数组放promise对象，全部成功则成功，一个失败则失败
        return Promise.all([PromiseAll])
    },
    // 修改全部产品勾选状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all([PromiseAll])
    }
}
const mutations = {
    GETCARTLIST(state, data) {
        state.cartList = data;
    }
}
const state = {
    cartList: []
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}

export default {
    actions,
    mutations,
    state,
    getters
}