<template>
  <div>
    <!-- 使用三级联动全局组件 -->
    <TypeNav />
    <ListContainer></ListContainer>
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import Trade from "@/pages/Trade";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand ,Trade},
  mounted() {
    // 因为floor里面有两个数据 并且有两个floor 要平分数据  v-for floorList 所以不能在floor组件内派发action 要在home组件内派发action
    this.$store.dispatch("getFloorList");
  },
  computed: {
    // 组件拿到Vuex中的数据
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style></style>
