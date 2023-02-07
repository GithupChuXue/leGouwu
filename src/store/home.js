// home模块的仓库

// 引入接口文件
import { reqCategorylist,reqGetBannerList,reqFloorList} from "@/api";


//  存储数据的容器  初始值 是由返回的数据结构而定
const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};
// vuex响应组件中用户的行为  可以处理业务逻辑
// 当一刷新页面 就
const actions = {
  // 通过api里面的接口函数，向服务器发送请求， 获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategorylist();
    
    if (result.code == 200) {
      // 如果返回的结果状态值是200 ，则就向mutations提交
      commit("CategoryList", result.data);
    }
  },
  // 获取轮播图数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GetBannerList", result.data);
    }
  },
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit("GetFloorList", result.data);
    }
  },

};
// vuex 中对state数据进行修改
const mutations = {
  CategoryList(state, categoryList) {
    state.categoryList = categoryList;
  },
  // 轮播图的数据
  GetBannerList(state, bannerList) {
    // 将传入的值赋值给state中的bannerlist
    /* *** 等于是将数据存储到state中了 */
    state.bannerList = bannerList;
  },
  GetFloorList(state, floorList) {
    // 将传入的值赋值给state中的bannerlist
    /* *** 等于是将数据存储到state中了 */
    state.floorList = floorList;
  },


};
// 简化store仓库中数据的获取
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
