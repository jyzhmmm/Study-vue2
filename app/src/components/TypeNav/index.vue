<template>
  <div>
    <div class="type-nav">
      <div class="container">
       <div  @mouseleave="leaveShow" @mouseenter="enterShow">  <!--事件委托-->
         <h2 class="all">全部商品分类</h2>
        <transition name="sort">
         <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch"> <!-- 三级联动路由跳转+事件委托，实现的回调-->
            <div
              class="item"
              v-for="(item, index) in categoryList"
              :key="item.categoryId"
              :class="{ current: currentIndex === index }"
            >
              <h3
                @mouseenter="changeIndex(index)"
              >
              <!-- data-xxx 是自定义属性的规范，只有在属性前加上data-才是自定义属性 -->
                <a
                 :data-categoryName="item.categoryName"
                 :data-category1Id="item.categoryId">
                 {{ item.categoryName }}
                 </a>
              </h3>
              <!-- 二三级分类 -->
              <div class="item-list clearfix" :style="{display:currentIndex === index?'block':'none'}">
                <div
                  class="subitem"
                  v-for="item2 in item.categoryChild"
                  :key="item2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a 
                      :data-categoryName="item2.categoryName" 
                      :data-category2Id="item.categoryId">
                      {{ item2.categoryName }}
                      </a>
                    </dt>
                    <dd>
                      <em
                        v-for="item3 in item2.categoryChild"
                        :key="item3.categoryId"
                      >
                        <a 
                        :data-categoryName="item3.categoryName" 
                        :data-category3Id="item.categoryId">
                        {{ item3.categoryName }}
                        </a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
       </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";  // 节流函数

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show:true,
    };
  },
  computed: {
    ...mapState({
      //  使用这个计算属性时候，右侧函数会立即执行一次
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    changeIndex: throttle(function(index){
      this.currentIndex = index;
    },50),
    goSearch(event){
      //定义自定义属性:data-categoryName="itme.categoryName"，有这个属性就是a标签，其余节点是没有的。
      //区分一二三级分类标签，自定义属性：category1id,category2id,category3id
      //节点有一个dataset属性，可以获取节点的自定义属性与属性值
      let element = event.target
      // 解构赋值
      let {categoryname,category1id,category2id,category3id} = element.dataset;
      if(categoryname){ // 有categoryname属性是a标签
          // 整理路由参数
          let location = {name:'search'}
          let query = {categoryName:categoryname}
          // 一二三级分类的a标签
          if(category1id){
              query.category1Id = category1id
          }else if(category2id){
              query.category2Id = category2id
          }else{
              query.category3Id = category3id
          }
          // 如果路由跳转的时候带有params参数，要捎带着传过去
          if(this.$route.params){
            location.params = this.$route.params
          // 整理成一个对象的参数
          location.query = query
          //路由跳转
          this.$router.push(location)
          }
      }
    },
    // 鼠标移入展示列表分类
    enterShow(){
      this.show = true
    },
    // 鼠标移出隐藏分类
    leaveShow(){
      this.currentIndex = -1
      if(this.$route.path !== '/home'){
        this.show = false
      }
    }
  },
  mounted() {
    //组件挂在完毕，show属性变为false
    //不是home路由组件则隐藏typenav
    if(this.$route.path !== '/home'){
      this.show = false
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

        }
        .current {
          background-color: skyblue;
        }
      }
    }
    // 过度动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter{
      height: 0px;
    }
    .sort-enter-to{
      height: 461px;
    }
    //定义动画事件、速率
    .sort-enter-active{
      transition: all .5s linear; // 匀速
    }
  }
}
</style>