// home模块的仓库
import { reqGetSearchInfo } from "@/api";

//  存储数据的容器
const state = {
  searchList: {},
};
// vuex响应组件中用户的行为  可以处理业务逻辑
const actions = {
  // params参数至少是一个空对象
  async getSearchInfo({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GetSearchInfo", result.data);
    }
  },
};
// vuex 中对state数据进行修改
const mutations = {
  GetSearchInfo(state, searchList) {
    state.searchList = searchList;
  },
};
// 简化store仓库中数据的获取 形参state是当前仓库中的state，并非大仓库中的state
const getters = {
  goodsList(state) {
    // 如果服务器数据返回成功则goodList的值就为 state.searchList.goodsList  如果 返回数据失败 则goodList的值为空数组
    return state.searchList.goodsList || {};
  },
  trademarkList(state) {
    return state.searchList.trademarkList || {};
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
