import { reqGetSearchInfo } from "@/api";

const actions = {
    async getSearchList({ commit }, params = {}) { // params传了参数就返回参数，没传参数就默认是空对象
        //   当前这个reqGetSearchInfo函数在调取服务器数据时候，至少传递一个参数（不写也得是空对象）
        //   params形参：是用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const state = {
        searchList: {}
    }
    // 项目中getters主要作用是：简化仓库中的数据
const getters = {
    // 假如网络不给力或者没有网，state.searchList.goodsList那些返回的是undefined
    // 计算新的属性的属性值至少给人家来一个数组
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}