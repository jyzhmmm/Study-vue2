import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"

const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async getCategoryList({ commit }) {
        let result = await reqCategoryList() // await返回promise对象成功的值
        if (result.code === 200) {
            commit("GETCATEGORYLIST", result.data)
        }
    },
    // 获取首页轮播图数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    // 获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code === 200) {
            commit('GETFLOORLIST', result.data)
        }
    },
}
const mutations = {
    GETCATEGORYLIST(state, value) {
        state.categoryList = value
    },
    GETBANNERLIST(state, value) {
        state.bannerList = value
    },
    GETFLOORLIST(state, value) {
        state.floorList = value
    }
}
const state = {
    categoryList: [],
    //轮播图数据
    bannerList: [],
    // floor轮播数据
    floorList: []
}
const getters = {

}
export default {
    actions,
    mutations,
    state,
    getters
}