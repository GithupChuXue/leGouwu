import Vue from "vue";
import App from "./App.vue";
// 三级联动组件
import TypeNav from '@/components/TypeNav';
import Pagination from '@/components/Pagination';
// 按需引入element-ui
import { Button,MessageBox } from 'element-ui';
Vue.component(TypeNav.name,TypeNav);
Vue.component(Pagination.name,Pagination);
Vue.component(Button.name,Button);
//  引入路由器
import router from "./router";
// 引入store仓库
import store from '@/store';
// 引入mockserve
import '@/mock/mockserve';
// 引入Swiper样式 
import 'swiper/css/swiper.css';
//引入vue-lazyLoad
import VueLazyload from 'vue-lazyload'
// 引入图片
import LoadingImg from "@/assets/loading.gif"
// 懒加载默认图片
Vue.use(VueLazyload, {
  loading: LoadingImg,
});
// 引入表单验证插件
import VeeValidate from "@/plugins/vee-validate";


// 引入全部接口的文件   统一引入
import * as API from '@/api';
Vue.config.productionTip = false;
// element 组件的第二种注册方式  挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 注册

new Vue({
  render: (h) => h(App),
  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  router,
  // 注册仓库
  store,
}).$mount("#app");

