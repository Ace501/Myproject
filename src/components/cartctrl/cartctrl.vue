<template>
    <div class="cartctrl">
        <transition name="move">
            <div class="cart-decrease" @click="decreaseCart($event)" v-show="food.count > 0">
                <span class="icon-remove_circle_outline inner"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'cartctrl',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      console.log('click')
      if (event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart (event) {
      console.log('click')
      if (event._constructed) {
        return
      }
      if (this.food.count <= 1) {
        Vue.delete(this.food, 'count')
      } else {
        this.food.count--
      }
    }
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
.cartctrl
    font-size 0
    .cart-decrease
        display inline-block
        padding 6px
        .inner
            display inline-block
            line-height 24px
            font-size 24px
            color rgb(0, 160, 220)
        &.move-enter-active, &.move-leave-active
            opacity 1
            transition all .3s linear
            transform translate3d(0, 0, 0)
            .inner
                transition all .3s linear
                transform rotate(0)
        &.move-enter, &.move-leave-to
            opacity 0
            transform translate3d(24px, 0, 0)
            .inner
                transform rotate(180deg)
    .cart-count
        display inline-block
        width 12px
        vertical-align top
        padding-top 6px
        line-height 24px
        font-size 10px
        text-align center
        color rgb(147, 153, 1)
    .cart-add
        display inline-block
        padding 6px
        line-height 24px
        font-size 24px
        color rgb(0, 160, 220)

</style>
