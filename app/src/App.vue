<template>
  <div id="app">
   <Header></Header>
   <router-view></router-view>
   <!-- 在home，search显示，在登录，注册隐藏 -->
   <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Herder'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
    // 组件挂载完毕，向服务器发请求获取数据
  mounted() {
     this.$store.dispatch("getCategoryList");
  },
}
</script>

<style>

</style>
