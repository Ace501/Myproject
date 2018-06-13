<template>
    <div class="ratings">
        <div class="head-wrapper">
            <div class="score-wrapper">
                <span class="score">{{seller.score}}</span>
                <h1 class="score-h">综合评分</h1>
                <span class="score-rank">高于周边商家{{seller.rankRate}}%</span>
            </div>
            <div class="score-detail-wrapper">
                <div class="attitude-score1">
                    <span class="score1-text1">服务态度</span>
                    <div class="score1-star">
                        <star :score="seller.serviceScore" :size="36"></star>
                    </div>
                    <span class="score1-text2">{{seller.serviceScore}}</span>
                </div>
                <div class="attitude-score2">
                    <span class="score2-text1">食物评分</span>
                    <div class="score2-star">
                        <star :score="seller.foodScore" :size="36"></star>
                    </div>
                    <span class="score2-text2">{{seller.foodScore}}</span>
                </div>
                <div class="TOA">
                    <span class="toa-text">送达时间</span>
                    <span class="toa">{{seller.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
        <div class="rate-wrapper">
            <div class="rate-head">
                <div class="rate-select">
                    <div class="select-all" @click="clickAll">
                        <span>全部</span>
                        <span class="num-all">{{rateAll}}</span>
                    </div>
                    <div class="select-good" @click="clickGood">
                        <span>满意</span>
                        <span class="num-good">{{rateGood}}</span>
                    </div>
                    <div class="select-bad" @click="clickBad">
                        <span>不满意</span>
                        <span class="num-bad">{{rateBad}}</span>
                    </div>
                </div>
                <div class="rate-limit" @click="rateShowText = !rateShowText">
                    <span class="icon-check_circle check" :class="{'on': rateShowText}"></span>
                    <span class="check-text">只看有内容的评价</span>
                </div>
            </div>
            <div class="rate-detail">
                <ul>
                    <li v-for="rate in ratings" :key="rate.rateTime" class="estimate" v-show="rateShow(rate)">
                        <div class="detail-wrapper">
                            <img class="avatar" width="28px" height="28px" :src="rate.avatar">
                            <div class="detail">
                                <span class="name">{{rate.username}}</span>
                                <div class="TOA">
                                    <div class="star">
                                        <star :size="24" :score="rate.score"></star>
                                    </div>
                                    <div v-if="rate.deliveryTime" class="toa">{{rate.deliveryTime}}分钟送达</div>
                                </div>
                                <span class="text">{{rate.text}}</span>
                                <div class="label">
                                    <span :class="{'icon-thumb_up': rate.rateType === 0, 'icon-thumb_down': rate.rateType === 1}"></span>
                                    <div class="label-detail">
                                        <ul>
                                            <li v-for="(recommend, index) in rate.recommend" :key="index" class="label-box">
                                                <div class="label-box-text">
                                                    <span class="label-text">{{recommend}}</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import star from '../star/star'
const ERR_OK = 0

export default {
  name: 'ratings',
  data () {
    return {
      seller: {},
      ratings: [],
      rateShowFlag: 2,
      rateShowText: false
    }
  },
  created () {
    this.$http.get('/api/seller').then(response => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = response.data
      }
    })
    this.$http.get('/api/ratings').then(response => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
      }
    })
  },
  components: {
    star
  },
  methods: {
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
    }
  },
  computed: {
    rateAll () {
      let count = 0
      if (this.ratings) {
        this.ratings.forEach((rate) => {
          count += 1
        })
        return count
      }
    },
    rateGood () {
      let count = 0
      if (this.ratings) {
        this.ratings.forEach((rate) => {
          if (rate.rateType === 0) {
            count += 1
          }
        })
        return count
      }
    },
    rateBad () {
      let count = 0
      if (this.ratings) {
        this.ratings.forEach((rate) => {
          if (rate.rateType === 1) {
            count += 1
          }
        })
        return count
      }
    }
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
    .ratings
        position absolute
        top 174px
        left 0
        bottom 0
        width 100%
        overflow auto
        .head-wrapper
            display flex
            position relative
            &:after
                position absolute
                width 100%
                left 0
                bottom -16px
                height 16px
                background #f3f5f7
                content ''
            .score-wrapper
                flex 0 0 137px
                margin 18px 0
                font-size 0
                border-right 1px solid rgba(7, 17, 27, 0.1)
                .score
                    display block
                    font-size 24px
                    color rgb(255, 153, 0)
                    line-height 28px
                    text-align center
                    margin-bottom 6px
                .score-h
                    font-size 12px
                    color rgb(7, 17, 27)
                    line-height 18px
                    text-align center
                    margin-bottom 8px
                .score-rank
                    display block
                    font-size 10px
                    color rgb(7, 17, 27)
                    line-height 10px
                    text-align center
                    margin-bottom 6px
            .score-detail-wrapper
                flex 1
                padding 18px 24px
                .attitude-score1
                    margin-bottom 8px
                    font-size 0
                    .score1-text1
                        display inline-block
                        font-size 12px
                        color rgb(7, 17, 27)
                        line-height 18px
                        vertical-align top
                        margin-right 12px
                    .score1-star
                        display inline-block
                        margin-right 12px
                    .score1-text2
                        vertical-align top
                        display inline-block
                        font-size 12px
                        color rgb(255, 153, 0)
                        line-height 18px
                .attitude-score2
                    margin-bottom 8px
                    font-size 0
                    .score2-text1
                        display inline-block
                        font-size 12px
                        color rgb(7, 17, 27)
                        line-height 18px
                        vertical-align top
                        margin-right 12px
                    .score2-star
                        display inline-block
                        margin-right 12px
                    .score2-text2
                        vertical-align top
                        display inline-block
                        font-size 12px
                        color rgb(255, 153, 0)
                        line-height 18px
                .TOA
                    font-size 0
                    .toa-text
                        display inline-block
                        font-size 12px
                        color rgb(7, 17, 27)
                        line-height 18px
                        vertical-align top
                        margin-right 12px
                    .toa
                        font-size 12px
                        color rgb(147, 153, 159)
                        line-height 18px
        .rate-wrapper
            position relative
            top 16px
            .rate-head
                padding 18px 18px 0 18px
                border-1px(rgba(7, 17, 27, 0.1))
                .rate-select
                    font-size 0
                    padding-bottom 18px
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
                .rate-limit
                    padding 12px 0
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
            .rate-detail
                padding 0 18px
                .estimate
                    padding 18px 0
                    border-1px(rgba(7, 17, 27, 0.1))
                    &:last-child
                        border-none()
                    .detail-wrapper
                        display flex
                        img
                            position relative
                            left 0
                            top 0
                            border-radius 50%
                        .detail
                            margin-left 12px
                            font-size 0
                            .name
                                display block
                                font-size 10px
                                color rgb(7, 17, 27)
                                line-height 12px
                                margin-bottom 4px
                            .TOA
                                margin-bottom 6px
                                font-size 0
                                margin-bottom 6px
                                .star
                                    display inline-block
                                    vertical-align top
                                .toa
                                    display inline-block
                                    margin-left 6px
                                    font-size 10px
                                    font-weight 200
                                    color rgb(147, 153, 159)
                                    line-height 12px
                            .text
                                font-size 12px
                                color rgb(7, 17, 27)
                                line-height 18px
                            .label
                                font-size 0
                                display flex
                                .icon-thumb_up
                                    display inline-block
                                    margin-top 8px
                                    font-size 12px
                                    line-height 16px
                                    color rgb(0, 160, 220)
                                .icon-thumb_down
                                    display inline-block
                                    margin-top 8px
                                    font-size 12px
                                    line-height 16px
                                    color rgb(147, 153, 159)
                                .label-detail
                                    margin-left 8px
                                    display inline-block
                                    .label-box
                                        display inline-block
                                        position relative
                                        margin 8px 8px 0 0
                                        padding 0 6px
                                        border 1px solid rgba(7, 17, 27, 0.1)
                                        border-radius 2px
                                        background rgb(255, 255, 255)
                                        max-width 40px
                                        &:last-child
                                            margin-right 0
                                        .label-box-text
                                            overflow hidden
                                            white-space nowrap
                                            text-overflow ellipsis
                                            .label-text
                                                font-size 9px
                                                color rgb(147, 153, 159)
                                                line-height 16px
</style>
