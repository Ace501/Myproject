<template>
  <div class="tab border-1px">
    <div class="tab-item">
      <router-link :to="{path:'/goods'}" class="router-link">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link :to="{path:'/ratings'}" class="router-link">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link :to="{path:'/sellers'}" class="router-link">商家</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab'
}
</script>

<style scoped lang="stylus">
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-1px(rgba(7, 17, 27, 0.1));
}

.tab-item {
  flex: 1;
  text-align: center;
}

.tab-item .router-link {
  display: block;
  font-size: 14px;
  color: rgb(77, 85, 93);
}

.tab-item .active {
  color: rgb(240, 20, 20);
}
</style>
