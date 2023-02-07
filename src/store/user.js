//创建login和register的store
//  引入user接口
import { reqGetcode, reqRegist, reqLogin, reqUserInfo, reqLogOut } from "@/api";
// 引入存储token的模块
import { setToken, getToken, removeToken } from "@/utils/token";
//创建state
const state = {
  //验证码
  code: "",
  // token 用户唯一标识
  // 为什么一刷新 如果没有将token本地存储持久化 就会导致一刷新等于是重新发送获取用户信息的请求 但没有携带token就拿不到数据  因为token是需要点击登录 触发点击事件 才会发送请求 拿到token
  // 因此需要将token持久化 并将值赋值给组件的属性token ，这样就解决了用户再次刷新 就可以通过本地存储拿到token
  token: getToken(),
  // 用户信息
  userInfo: {},
};
// 创建actions
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    //
    let promise = await reqGetcode(phone);
    if (promise.code == 200) {
      commit("GetCode", promise.data);
      return "ok";
    } else {
      return Promise.reject(new Error("失败了"));
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let promise = await reqRegist(user);
    if (promise.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("失败了"));
    }
  },
  // 用户登录
  async getLogin({ commit }, user) {
    let promise = await reqLogin(user);
    if (promise.code == 200) {
      // 如果用户登录 且拿到用户的唯一标识 token
      commit("GetLogin", promise.data.token);
      // 持久化存储token
      setToken(promise.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let promise = await reqUserInfo();
    if (promise.code == 200) {
      commit("GetUserInfo", promise.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //退出登录
  async removueLogOut({ commit }) {
    let promise = await reqLogOut();
    console.log(promise);
    if (promise.code == 200) {
      commit("RemovueLogOut", promise.data);
      console.log(promise.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};

// 创建mutations
const mutations = {
  // 拿到验证码的mutation
  GetCode(state, code) {
    state.code = code;
  },
  // 用户登录
  GetLogin(state, token) {
    state.token = token;
  },
  // 用户信息
  GetUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 退出登录
  RemovueLogOut(state) {
    // 清除本地存储的信息
    state.token = "";
    state.userInfo = {};
    // 清除本地存储的token
    removeToken();
    console.log("TOKEN已被清除！");
  },
};
//创建getters
const getters = {};
// 创建store 并暴露
export default {
  state,
  actions,
  mutations,
  getters,
};
