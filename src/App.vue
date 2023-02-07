<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  
    <!-- 通过路由meta配置项 设置显示条件 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer/index.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted(){
    /* 派发一个action  向服务器获取三级联动的数据 用来展示  （为什么不放在TypeNav 里 因为 会由于 home和search 组件的切换 就会发送新的请求 而放在根组件里 因为更组件中的mounted只执行一次 ）  （ 属于性能优化 ）*/
    this.$store.dispatch("categoryList");
  }
};
</script>
