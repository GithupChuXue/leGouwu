// 引入axios 并对axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
// strat方法 ：进度条开始  done：进度条结束
// 引入进度条样式
import "nprogress/nprogress.css";
// 在当前模块引入store模块
import store from "@/store";

// 创建axios实例
const requests = axios.create({
  // 基础路径 ，发送请求的时候 路径都带有api
  baseURL: "/api",
  // 请求超时时间
  timeout: 5000,
});

// 请求拦截器  可以在请求前加一些业务逻辑  config表示请求头 因此可以在请求头里带一些参数给服务器
requests.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start();
  // config:请求头配置对象 ，对象里面有一个属性很重要， headers请求头
  // 如果仓库里有uuid
  if (store.state.detail.uuid) {
    // 给请求头添加一个字段 （userTempUd）这个字段不能随便写
    config.headers.userTempId = store.state.detail.uuid;
   
  }
   //需要携带token给服务器
  if (store.state.user.token) {
     config.headers.token =store.state.user.token;
  }
  return config;
});
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 进度条结束
    nprogress.done();
    return res.data;
  },
  () => {
    // 响应失败的回调
    return Promise.reject(new Error("faile"));
  }
);

// 对外暴露
export default requests;
