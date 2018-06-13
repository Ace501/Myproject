<template>
    <transition name="fade">
        <div class="food" v-show="flag">
            <div class="food-wrapper">
                <div class="image">
                    <img :src="selectFood.image">
                </div>
                <div class="left" @click="back">
                    <i class="icon-arrow_lift"></i>
                </div>
                <div class="title">
                    <div class="name">{{selectFood.name}}</div>
                    <div class="extra">
                        <span>月售{{selectFood.sellCount}}份</span><span class="good">好评率{{selectFood.rating}}%</span>
                    </div>
                    <div class="price">
                        <div class="newPrice">¥{{selectFood.price}}</div>
                        <div class="oldPrice" v-show="selectFood.oldPrice">¥{{selectFood.oldPrice}}</div>
                    </div>
                    <div class="cart-ctrl">
                        <cartctrl :food="selectFood"></cartctrl>
                    </div>
                    <div class="foodIn" @click="addFood" v-show="!selectFood.count">加入购物车</div>
                </div>
                <div class="foodDetail" v-show="selectFood.info">
                    <div class="introduce">商品介绍</div>
                    <div class="food-info">{{selectFood.info}}</div>
                </div>
                <div class="food-estimate">
                    <div class="rate-head">
                        <span class="good-rate">商品评价</span>
                        <div class="estimate-select">
                            <div class="select-all" @click="clickAll">
                                <span>全部</span>
                                <span class="num-all">{{rateAll}}</span>
                            </div>
                            <div class="select-good" @click="clickGood">
                                <span>推荐</span>
                                <span class="num-good">{{rateGood}}</span>
                            </div>
                            <div class="select-bad" @click="clickBad">
                                <span>吐槽</span>
                                <span class="num-bad">{{rateBad}}</span>
                            </div>
                        </div>
                        <div class="estimate-limit" @click="rateShowText = !rateShowText">
                            <span class="icon-check_circle check" :class="{'on': rateShowText}"></span>
                            <span class="check-text">只看有内容的评价</span>
                        </div>
                    </div>
                    <div class="estimate-wrapper">
                        <ul>
                            <li v-for="rate in selectFood.ratings" :key="rate.name" class="estimate-detail" v-show="rateShow(rate)">
                                <div class="time">{{rate.rateTime | formatDate}}</div>
                                <span class="name">{{rate.username}}</span>
                                <img class="user-avatar" width="12px" height="12px" :src="rate.avatar">
                                <div class="user-rate" v-if="rate.text">
                                    <span :class="{'icon-thumb_up': rate.rateType === 0, 'icon-thumb_down': rate.rateType === 1}"></span>
                                    <span class="user-rate-text">{{rate.text}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Vue from 'vue'
import {formatDate} from '/MyProject/WebStorm/sell/src/common/js/date.js'
import cartctrl from '../cartctrl/cartctrl'

export default {
  name: 'food',
  props: {
    selectFood: {
      type: Object
    }
  },
  components: {
    cartctrl
  },
  data () {
    return {
      flag: false,
      rateShowFlag: 2,
      rateShowText: false
    }
  },
  methods: {
    show () {
      this.flag = true
    },
    back () {
      this.flag = false
    },
    clickAll () {
      this.rateShowFlag = 2
    },
    clickGood () {
      this.rateShowFlag = 0
    },
    clickBad () {
      this.rateShowFlag = 1
    },
    rateShow (rate) {
      if (this.rateShowText === true) {
        if (rate.text) {
          if (this.rateShowFlag === 2 || rate.rateType === this.rateShowFlag) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        if (this.rateShowFlag === 2 || rate.rateType === this.rateShowFlag) {
          return true
        } else {
          return false
        }
      }
    },
    addFood () {
      if (!this.selectFood.count) {
        Vue.set(this.selectFood, 'count', 1)
      } else {
        this.selectFood.count += 1
      }
    }
  },
  computed: {
    rateAll () {
      let count = 0
      if (this.selectFood.ratings) {
        this.selectFood.ratings.forEach((rate) => {
          count += 1
        })
        return count
      }
    },
    rateGood () {
      let count = 0
      if (this.selectFood.ratings) {
        this.selectFood.ratings.forEach((rate) => {
          if (rate.rateType === 0) {
            count += 1
          }
        })
        return count
      }
    },
    rateBad () {
      let count = 0
      if (this.selectFood.ratings) {
        this.selectFood.ratings.forEach((rate) => {
          if (rate.rateType === 1) {
            count += 1
          }
        })
        return count
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
.food
    position fixed
    left 0
    top 0
    bottom 48px
    width 100%
    min-height 100%
    overflow auto
    background #fff
    z-index 5
    &.fade-enter-active, &.fade-leave-active
        opacity 1
        transition all .3s linear
        transform translate3d(0, 0, 0)
    &.fade-enter, &.fade-leave-to
        opacity 0
        transform translate3d(100%, 0, 0)
    .food-wrapper
        padding-bottom 64px
        .image
            position relative
            width 100%
            height 0
            padding-top 100%
            img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
        .left
            position absolute
            top 10px
            left 0
            .icon-arrow_lift
                display block
                padding 10px
                font-size 20px
                color #fff
        .title
            padding 18px
            position relative
            &:after
                display block
                position absolute
                width 100%
                left 0
                bottom -16px
                height 16px
                background #f3f5f7
                content ''
            .name
                font-size 14px
                font-weight 700
                color rgb(7, 17, 27)
                line-height 14px
            .extra
                margin-top 8px
                font-size 10px
                color rgb(147, 153, 159)
                line-height 10px
                .good
                    margin-left 12px
            .price
                margin-top 18px
                display inline-block
                font-size 0
                .newPrice
                    display inline-block
                    vertical-align top
                    font-size 14px
                    font-weight 700
                    color rgb(240, 20, 20)
                    line-height 24px
                .oldPrice
                    display inline-block
                    margin-left 8px
                    text-decoration line-through
                    font-size 10px
                    font-weight 700
                    color rgb(147, 153, 159)
                    line-height 24px
            .cart-ctrl
                position absolute
                right 18px
                bottom 25px
                width 74px
                height 24px
                z-index 5
            .foodIn
                display inline-block
                position absolute
                right 18px
                bottom 18px
                width 74px
                height 24px
                background rgb(0, 160, 220)
                font-size 10px
                line-height 24px
                text-align center
                color rgb(255, 255, 255)
                border-radius 12px
                z-index 10
        .foodDetail
            position relative
            margin-top 16px
            padding 18px
            &:after
                display block
                position absolute
                width 100%
                left 0
                bottom -16px
                height 16px
                background #f3f5f7
                content ''
            .introduce
                line-height 14px
                font-size 14px
                color rgb(7, 17, 27)
            .food-info
                margin-top 6px
                padding 0 8px
                font-size 12px
                font-weight 200
                color rgb(77, 85, 93)
                line-height 24px
        .food-estimate
            margin-top 16px
            .rate-head
                padding 16px 16px 0 16px
                border-bottom 1px solid rgba(7, 17, 27, 0.2)
                .good-rate
                    margin-bottom 6px
                    line-height 14px
                    font-size 14px
                    color rgb(7, 17, 27)
                .estimate-select
                    padding 12px 0 18px 0
                    font-size 0
                    border-1px(rgba(7, 17, 27, 0.1))
                    .select-all
                        display inline-block
                        padding 8px 12px
                        background rgb(0, 160, 220)
                        font-size 12px
                        line-height 16px
                        color rgb(255, 255, 255)
                        border-radius 2px
                        margin-right 8px
                        .num-all
                            font-size 8px
                    .select-good
                        display inline-block
                        padding 8px 12px
                        background rgba(0, 160, 220, 0.2)
                        font-size 12px
                        line-height 16px
                        color rgb(77, 85, 93)
                        border-radius 2px
                        margin-right 8px
                        .num-good
                            font-size 8px
                    .select-bad
                        display inline-block
                        padding 8px 12px
                        background rgba(77, 85, 93, 0.2)
                        font-size 12px
                        line-height 16px
                        color rgb(77, 85, 93)
                        border-radius 2px
                        .num-bad
                            font-size 8px
                .estimate-limit
                    margin 12px 0
                    font-size 0
                    .check
                        display inline-block
                        vertical-align top
                        margin-right 4px
                        font-size 24px
                        color rgb(147, 153, 159)
                        line-height 24px
                        &.on
                            color #00c850
                    .check-text
                        display inline-block
                        font-size 12px
                        line-height 24px
                        color rgb(147, 153, 159)
            .estimate-wrapper
                margin 0 18px
                .estimate-detail
                    padding 16px 0
                    position relative
                    border-1px(rgba(7, 17, 27, 0.2))
                    &:last-child
                        border-none()
                    .time
                        margin-bottom 6px
                        left 0
                        top 0
                        font-size 10px
                        line-height 12px
                        color rgb(147, 153, 159)
                    .name
                        position: absolute
                        right 18px
                        top 16px
                        font-size 10px
                        line-height 12px
                        color rgb(147, 153, 159)
                    .user-avatar
                        position absolute
                        right 0
                        top 16px
                        border-radius 50%
                    .user-rate
                        position relative
                        .icon-thumb_up
                            font-size 12px
                            line-height 24px
                            color rgb(0, 160, 220)
                        .icon-thumb_down
                            font-size 12px
                            line-height 24px
                            color rgb(147, 153, 159)
                        .user-rate-text
                            font-size 12px
                            line-height 16px
                            color rgb(7, 17, 27)
</style>
