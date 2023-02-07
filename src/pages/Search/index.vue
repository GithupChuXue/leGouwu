<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="clearCateName">x</i>
            </li>
            <!-- 关键词的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="clearKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="clearTradeMark">x</i>
            </li>
            <!-- 平台售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="clearProps(index)">x</i>
            </li>
          </ul>
        </div>
        <!--selector 子组件 -->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <!-- active类是有背景色 -->
                <li @click="changeOrder(1)" :class="{ active: isOne }">
                  <a
                    >综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-arrowBottom': isDesc }"
                    ></span
                  ></a>
                </li>
                <li @click="changeOrder(2)" :class="{ active: isTwo }">
                  <a
                    >价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-arrowBottom': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 这里需要将动态的id传给Detail组件 所以使用的是 :to  -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a target="_blank" class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        // 一级分类的id
        category1Id: "",
        // 二级分类的id
        category2Id: "",
        // 三级分类的id
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
        // 排序
        order: "1:desc",
        // 分页器用的，代表的是第几页
        pageNo: 1,
        // 代表的是每一页展示数据的个数
        pageSize: 10,
      },
    };
  },
  components: {
    SearchSelector,
  },
  // 当组件在挂载完毕前执行一次  （在里可以拿到 传给组件的路由参数（query,params））
  beforeMount() {
    // 将路由器传递的参数 赋值给searchParams (也就是要传递给服务器的参数)
    // 复杂写法
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword;

    /* **** 简单写法 使用Object.assign() 对象合并 */
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 调用发请求方法  在mounted里的仅仅只执行一次
    this.getData();
  },
  computed: {
    // mapGetters里面参数写法是数组 是因为在getters里面它是不分模块的 （也就是没有嵌套数据 一级数据）
    ...mapGetters(["goodsList", "trademarkList", "attrsList"]),
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
    // 判断order里的是不是1
    isOne() {
      return this.searchParams.order.includes(1) == true;
    },
    // 判断order里的是不是2
    isTwo() {
      return this.searchParams.order.includes(2) == true;
    },
    // 判断是不是升序
    isAsc() {
      return this.searchParams.order.includes("asc") == true;
    },
    // 判断是不是降序
    isDesc() {
      return this.searchParams.order.includes("desc") == true;
    },
  },
  methods: {
    //将请求封装成函数
    getData() {
      // searchParams 是带给服务器的参数
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },

    // 点击面包屑删除相应的面包屑 同时需要将参数置空 并重新发请求 获取默认值  这里为什么给置空 用的是undfined 而不是""  这样当参数为undefined时 就不会将这个参数带给服务器 从而优化性能
    clearCateName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 地址栏也需要改变  进行路由跳转  (自己跳自己)
      if (this.$route.params) {
        /* *** 在这里需要判断 如果有params参数 则不应该删除 应该在路径中保留 */
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 关键字面包屑的点击事件
    clearKeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
      // 通知header组件将keyword置空 （通过全局事件总线）
      this.$bus.$emit("clearKeyword");
      // 让路由进行跳转 同时将原有的query参数再次带给新的路由 不带params 参数 就相当于将keyword置空了
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },

    // 自定义事件的回调
    tradeMarkInfo(trademark) {
      // 整理品牌字段参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 品牌面包屑的点击事件
    clearTradeMark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 收集平台属性的回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      // 整理参数
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(props) == -1)
        this.searchParams.props.push(props); //数组去重
      // 再次发送请求
      this.getData();
    },
    // 平台售卖属性面包屑的点击事件
    clearProps(index) {
      // 将相应的面包屑删除
      this.searchParams.props.splice(index, 1);
      // 再次发送请求 更新数据
      this.getData();
    },
    // 改变order的回调  (还是有bug)
    changeOrder(flag) {
      // 将order默认值存储起来
      let orignOrder = this.searchParams.order;
      //默认是综合 还是价格所对应的flag存储起来
      let orignFlag = orignOrder.split(":")[0];
      // 将默认的排序的值存储起来
      let orignSort = orignOrder.split(":")[1];
      // 创建一个新的order属性
      let newOrder = "";
      // 在这里判断 如果点击的就是默认选择的 就说明在相同的按钮再点击一次 则序号不变 其排序取反
      if (flag == orignFlag) {
        newOrder = `${orignFlag}:${orignSort == "asc" ? "desc" : "asc"}`;
      } else {
        // 如果不是 则说明相反 则序号改变 排序不变
        newOrder = `${flag}:${"desc"}`;
      }
      // 将已经改变的order值 赋给order 更新searchParams参数
      this.searchParams.order = newOrder;
      // 再次发送请求
      this.getData();
    },
    // 获取当前的pageNo 并传递给父组件 (自定义事件)
    getPageNo(pageNo) {
      // 整理参数
      this.searchParams.pageNo = pageNo;
      // 再次发送请求
      this.getData();
    },
  },

  watch: {
    // 监听路由信息的变化  如果路由信息发生变化 则再次发请求  这里给服务器传递的参数需要再次整理参数传递给服务器
    $route(newValue, oldValue) {
      // 当每一次请求完数据后 将 id类参数置空  keyword和categoryName会因为赋新值 相当于置空了
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 再次发请求
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
