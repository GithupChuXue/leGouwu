// home模块的仓库

// 引入接口文件
import { reqGoodsInfo, reqAddToCart } from "@/api";
import { getUuid } from "@/utils/uuid";


//  存储数据的容器  初始值 是由返回的数据结构而定
const state = {
  goodsInfo: {},
  // 游客临时身份
  uuid:getUuid(),
};
// vuex响应组件中用户的行为  可以处理业务逻辑
// 当一刷新页面 就
const actions = {
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GetGoodsInfo", result.data);
    }
  },
  async getAddCartSuccess({ commit }, { skuId, skuNum }) {
    // **** 通过调用方法接口 将参数带给服务器 并且将数据存储到数据库中   这里是让服务器写入数据 所以返回状态码是200就说明数据存储成功 不用再给我们返回数据 所以也不用使用mutations  ****
    let result = await reqAddToCart(skuId, skuNum);
    // 在这里如果成功|失败了返回的是都一个promise
    // 如果成功
    if (result.code == 200) {
      // 成功返回的结果
      return "ok";
    } else {
      // 失败返回的结果
      return Promise.reject(new Error("faile"));
    }
  },
};
// vuex 中对state数据进行修改
const mutations = {
  GetGoodsInfo(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  },
};
// 简化store仓库中数据的获取
const getters = {
  // 路径导航简化的数据
  categoryView(state) {
    return state.goodsInfo.categoryView || {};
  },
  // 产品信息数据的简化
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  // 平台售卖属性数据的简化
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
