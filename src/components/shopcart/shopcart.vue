<template>
    <div>
        <div class="shopcart">
            <div class="content">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight': totalCount > 0}" @click="fold">
                            <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
                        </div>
                        <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight': totalCount > 0}">¥ {{totalPrice}}</div>
                    <div class="desc">另需配送费{{seller.deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click="pay">
                    <div class="pay" :class="{'enough': totalPrice >= seller.minPrice, 'not-enough': totalPrice < seller.minPrice}">
                        {{leftPrice}}
                    </div>
                </div>
            </div>
        </div>
        <transition name="spread">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="shopWrapper">
                    <ul>
                        <li class="food" v-for="food in selectFoods" :key="food.name">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span>¥{{food.price*food.count}}</span>
                            </div>
                            <div class="cartctrl-wrapper">
                                <cartctrl :food="food"></cartctrl>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>
    </div>
</template>

<script>
import cartctrl from '../cartctrl/cartctrl'
import BScroll from 'better-scroll'

export default {
  name: 'shopcart',
  props: {
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    cartctrl
  },
  data () {
    return {
      seller: {},
      listShowFlag: false
    }
  },
  created () {
    this.$http.get('/api/seller').then(response => {
      response = response.body
      if (response.errno === 0) {
        this.seller = response.data
      }
    })
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    leftPrice () {
      if (this.totalPrice === 0) {
        return '¥' + this.seller.minPrice + '起送'
      } else if (this.totalPrice < this.seller.minPrice) {
        let leftP = this.seller.minPrice - this.totalPrice
        return '还差¥' + leftP + '起送'
      } else {
        return '去结算'
      }
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    listShow () {
      if (!this.totalCount) {
        // eslint-disable-next-line
        this.listShowFlag = false
        return this.listShowFlag
      } else {
        return this.listShowFlag
      }
    }
  },
  methods: {
    fold () {
      if (this.totalCount) {
        this.listShowFlag = !this.listShowFlag
        if (this.listShowFlag) {
          this.$nextTick(() => {
            if (!this.shopScroll) {
              this.shopScroll = new BScroll(this.$refs.shopWrapper, {
                click: true
              })
            } else {
              this.shopScroll.refresh()
            }
          })
        }
      } else {
        this.listShowFlag = false
      }
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideList () {
      this.listShowFlag = false
    },
    pay () {
      if (this.totalPrice < this.seller.minPrice) {
      } else {
        window.alert('支付' + (this.totalPrice + this.seller.deliveryPrice) + '元')
      }
    }
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
.shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
        display: flex
        height 48px
        background #141d27
        font-size 0
        .content-left
            flex 1
            .logo-wrapper
                display inline-block
                position relative
                top -10px
                margin 0 12px
                padding 6px
                width 56px
                height 56px
                box-sizing border-box
                vertical-align top
                border-radius 50%
                background #141d27
                z-index 20
                .logo
                    width 100%
                    height 100%
                    border-radius 50%
                    background #2b343c
                    text-align center
                    &.highlight
                        background rgb(0, 160, 220)
                    .icon-shopping_cart
                        font-size 24px
                        color #80858a
                        line-height 44px
                        &.highlight
                            color #fff
                .num
                    position absolute
                    top 0
                    right 0
                    width 24px
                    height 16px
                    line-height 16px
                    text-align center
                    border-radius 16px
                    font-size 9px
                    font-weight 700
                    color #fff
                    background rgb(240, 20, 20)
                    box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
            .price
                display inline-block
                color rgba(255, 255, 255, 0.4)
                vertical-align top
                line-height 24px
                margin-top 12px
                box-sizing border-box
                padding-right 12px
                border-right 1px solid rgba(255, 255, 255, 0.1)
                font-size 16px
                font-weight 700
                &.highlight
                    color #fff
            .desc
                display inline-block
                vertical-align top
                margin 12px 0 0 12px
                line-height 24px
                font-size 10px
                color rgba(255, 255, 255, 0.4)
        .content-right
            flex 0 0 105px
            width 105px
            background #2b333b
            .pay
                height 48px
                line-height 48px
                text-align center
                font-size 12px
                font-weight 700
                &.not-enough
                    background #2b333b
                    color rgba(255, 255, 255, 0.4)
                &.enough
                    background #00b43c
                    color #fff
.shopcart-list
    position absolute
    bottom 0
    left 0
    width 100%
    z-index 10
    &.spread-enter-active, &.spread-leave-active
        opacity 1
        transition all .5s linear
        transform translate3d(0, 0, 0)
    &.spread-enter, &.spread-leave-to
        opacity 1
        transform translate3d(0, 100%, 0)
    .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
            float left
            font-size 14px
            color rgb(7, 17, 27)
        .empty
            float right
            font-size 12px
            color rgb(0, 160, 220)
    .list-content
        padding 0 18px
        max-height 217px
        background #fff
        overflow hidden
        padding-bottom 10px
        .food
            position relative
            padding 12px 0
            box-sizing border-box
            border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
                border-none()
            .name
                line-height 24px
                font-size 14px
                color rgb(7, 17, 27)
            .price
                position absolute
                right 90px
                bottom 12px
                line-height 24px
                font-size 14px
                font-weight 700
                color rgb(240, 20, 20)
            .cartctrl-wrapper
                position absolute
                right 0
                bottom 6px
.list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(7, 17, 27, 0.6)
    backdop-filter blur(10px)
    z-index 5
    &.fade-enter-active, &.fade-leave-active
        opacity 1
        transition all .3s
    &.fade-enter, &.fade-leave-to
        opacity 0
</style>
