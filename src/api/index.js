// 统一管理api的模块
import requests from "./ajax";
import MockRequest from "./mock";
// 三级联动接口
export const reqCategorylist =()=>requests({url:'/product/getBaseCategoryList',method:'get'});
// 获取并暴露banner(home首页轮播图接口)
export const reqGetBannerList =()=>MockRequest.get('/banner');
// 获取并暴露floor 
export const reqFloorList = () => MockRequest.get("/floor");
// 获取搜索商品的接口 请求地址：/api/list  请求方式: post  参数 （10个）
// 传递的参数params至少是一个空对象（所以默认值一定是个空对象） 否则会请求失败
export const reqGetSearchInfo =(params)=>requests({ url:'/list',method:'post',data:params});
// 搜索商品详情页的接口 请求地址/api/item/{skuId} 请求方式 get 
export const reqGoodsInfo = (skuId)=>requests({ url:`/item/${skuId}`,method:"get"});
// 添加购物车 (更新产品的数量)
export  const reqAddToCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})
// 获取购物车列表接口
export  const reqGetShopCart = ()=>requests({url:'/cart/cartList',method:'get'});
// 删除购物车商品的接口  地址 /api/cart/deleteCart/{skuId} 请求方式 delete
export const reqDeleteCartById = (skuId)=>requests({url:`cart/deleteCart/${skuId}`,method:"delete"});
// 切换商品修改状态  地址  /api/cart/checkCart/{skuID}/{isChecked} 请求方式 get
export const reqUpdateCheckedById = (skuID,isChecked) =>requests({url:`/cart/checkCart/${skuID}/${isChecked}`,method:'get'})
// 获取验证码的接口 地址：/api/user/passport/sendCode/{phone}  请求方式：get
export const reqGetcode =(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});
// 用户注册的接口  地址：/api/user/passport/register 请求方式：post 参数 phone password code
export const reqRegist = (data)=>requests({url:`/user/passport/register`,method:'post',data:data});
// 登录接口 地址：/api/user/passport/login 请求方式：post  参数: phone password
export const reqLogin =(data)=>requests({url:"/user/passport/login",method:"post",data:data});
// 获取用户信息的接口 地址：/api/user/passport/auth/getUserInfo 请求方式：get 
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});
// 退出登录的接口 地址：/api/user/passport/logout  请求方式：get
export const reqLogOut = ()=>requests({url:"/user/passport/logout",method:"get"});
// 获取用户地址信息 地址：/api/user/userAddress/auth/findUserAddressList 请求方式：get
export const reqUesrAddress =()=>requests({url:"/user/userAddress/auth/findUserAddressList",method:"get"});
//获取订单交易信息的接口 地址：/api/order/auth/trade  请求方式：get
export const reqTrade =()=>requests({url:"/order/auth/trade",method:"get"});
//提交订单信息的接口 地址：/api/order/auth/submitOrder?tradeNo={tradeNo} 请求方式：post query参数：tradeNo使用query带 其余信息用data带
export const reqSubmitOrder =(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:"post",data});
//获取订单支付信息的接口  地址：/api/payment/weixin/createNative/{orderId}  请求方式：get 参数 ：orderId
export const reqPayInfo =(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});
// 获取支付订单状态的接口 地址：/api/payment/weixin/queryPayStatus/{orderId}   请求方式：get  参数 orderId
export const reqPayState =(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})
// 获取我的订单列表的接口 地址:/api/order/auth/{page}/{limit} 请求方式：get 参数 page limit
export const reqMyOrderList =(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:"get"});

