import Vue from 'vue';
import Vuex from 'vuex';
// 引入home模块、search模块的仓库,detail
import home from './home';
import search from './search';
import detail from './detail';
import shopCart from './shopCart';
//引入user小仓库
import user from './user'
import trade from "./trade";


// 使用vuex
Vue.use(Vuex);

export default new Vuex.Store({
    // 实现Vuex模块化开发存储数据
    modules:{
        home,search,detail,shopCart,user,trade
    }
})