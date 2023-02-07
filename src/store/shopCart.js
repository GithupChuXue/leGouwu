// 引入获取购物车的接口
import { reqGetShopCart, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
  cartList: [],
};
const actions = {
  // 获取购物车信息的action
  async getCartList({ commit }) {
    //调用接口
    let result = await reqGetShopCart();
    if (result.code == 200) {
      commit("GetCartList", result.data);
    }
  },
  // 删除购物车某一模块的action
  async deleteCartListById({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failes...."));
    }
  },
  // 切换商品选中状态的action
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    console.log(result);
    if (result.data == 200) {
      return "ok";
    } else {
      Promise.reject(new Error("faile----"));
    }
  },
  // 在一个action 可以通过 其内的上下文中的dispatch()调用另一个action deleteCartListById()
  // 但是deleteCartListById() 一次只能删一个  所以有几个选中就得调几次
  // 删除所有勾选的商品的action
  // context 上下文 小型的store 里面有dispatch mutation state 等属性 因此可以解构出这几个
  deleteAllCheckedCart({ dispatch, getters }) {
    // 获取购物车中每一个商品
    //
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      //  派发action  但是要传入被选中的商品的skuId
      // let skuId = item.skuId;
      // if (item.isChecked == 1) {
      //   console.log(skuId);
      //   console.log("被选中");
      //   dispatch("deleteCartListById", skuId);
      // }
      // 每派发一次 就会返回一个Promise
      let Promise =
        item.isChecked == 1 ? dispatch("deleteCartListById", item.skuId) : "";
      // 将返回成功的promise存储于promiseAll中
      promiseAll.push(promiseAll);
    });
    // 用promise的all()判断是否全部返回  如果全部都成功 则返回结果就为真 如果有一个是假 则返回结果就是假
    return Promise.all(promiseAll);
  },
  // 修改全部商品的选中转态的action
  updateAllCheckedById({ dispatch, state }, isChecked) {
    let promiseAll = [];
    console.log(state);
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      // 将返回成功的存储到数组中
      promiseAll.push(promise);
    });
    // 最终返回结果
    return Promise.all(promiseAll);
  },
};
const mutations = {
  //将获取到的数据存储到
  GetCartList(state, cartList) {
    state.cartList = cartList;
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};
// 创建一个store并对外暴露
export default {
  state,
  actions,
  mutations,
  getters,
};
