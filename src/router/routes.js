//引入路由组件
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Search from "../pages/Search";
// import Detail from "../pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// // 引入二级路由
// import MyOrder from "@/pages/Center/MyOrder";
// import GroupOrder from "@/pages/Center/GroupOrder";
// 路由配置信息
export default [
  {
    // Home路由路径
    path: "/home",
    // 组件名
    // component: Home,
    // 路由懒加载
    component:()=>import('@/pages/Home'),
    meta: { show: true },
  },
  {
    name: "search",
    // Search路由路径
    // 使用占位符进行params传参  如果没有传递params参数时 一定要在占位符后加个？代表可传可不传
    path: "/search/:keyword?",
    // 组件名
    component:()=>import('@/pages/Search'),
    meta: { show: true },
  },
  {
    name: "login",
    // Login路由路径
    path: "/login",
    // 组件名
    component:()=>import('@/pages/Login')
  },
  {
    // Reigster路由路径
    path: "/register",
    // 组件名
    component:()=>import('@/pages/Register')
  },
  {
    // Detail路由路径
    path: "/detail/:skuId",
    // 组件名
    component:()=>import('@/pages/Detail')
  },
  // AddCartSuccess路由配置
  {
    name: "addCartSuccess",
    path: "/addCartSuccess",
    // 组件名
    component:()=>import('@/pages/AddCartSuccess'),
  },
  // shopCart路由
  {
    name: "shopCart",
    path: "/shopCart",
    // 组件名
    component:()=>import('@/pages/ShopCart'),
  },
  // trade路由
  {
    name: "trade",
    path: "/trade",
    // 组件名
    component:()=>import('@/pages/Trade'),
    // 路由独享守卫  进入tarde组件之前
    beforeEnter: (to, from, next) => {
      // 如果是在购物车页面来则放行
      if (from.path == "/shopCart") {
        next();
        //  不是从购物车页面来 则回退到from的页面
      } else {
        next(false);
      }
    },
  },
  // pay路由
  {
    name: "pay",
    path: "/pay",
    // 组件名
    component:()=>import('@/pages/Pay'),
    beforeEnter: (to, from, next) => {
      // 如果是在购物车页面来则放行
      if (from.path == "/trade") {
        next();
        //  不是从购物车页面来 则回退到from的页面
      } else {
        next(false);
      }
    },
  },
  // paysuccess路由
  {
    name: "paysuccess",
    path: "/paysuccess",
    // 组件名
    component:()=>import('@/pages/PaySuccess'),
    beforeEnter: (to, from, next) => {
      // 如果是在购物车页面来则放行
      if (from.path == "/pay") {
        next();
        //  不是从购物车页面来 则回退到from的页面
      } else {
        next(false);
      }
    },
  },
  // center路由
  {
    name: "center",
    path: "/center",
    // 组件名
    component:()=>import('@/pages/Center'),
    children: [
      {
        name: "myorder",
        path: "/center/myorder",
        component:()=>import('@/pages/Center/MyOrder'),
      },
      {
        name: "grouporder",
        path: "/center/grouporder",
        component:()=>import('@/pages/Center/GroupOrder'),
      },
      // 重定向
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  //  重定向， 在项目跑起来的时候 访问/ 立马让他定位到首页
  {
    path: "*",
    redirect: "/home",
  },
];
