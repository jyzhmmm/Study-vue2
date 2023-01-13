<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要在引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list='floor'></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
//引入其余组件
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
     name:'RouteHome',
     components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
     },
     computed:{
      ...mapState({
        floorList:(state) => state.home.floorList
      })
     },
     mounted() {
      // 派发action，获取floor组件数据
      this.$store.dispatch('getFloorList')
     },
}
</script>

<style>

</style>