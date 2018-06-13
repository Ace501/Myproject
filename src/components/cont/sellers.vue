<template>
    <div class="sellers">
        <div class="header-wrapper">
            <div class="header">
                <span class="title">{{seller.name}}</span>
                <div class="star">
                    <star :size="36" :score="seller.score"></star>
                </div>
                <span class="rate-count">({{seller.ratingCount}})</span>
                <span class="sell-count">月售{{seller.sellCount}}单</span>
            </div>
            <div class="header-info">
                <div class="min-price">
                    <p class="mp-text1">起送价</p>
                    <span class="min-price-detail">{{seller.minPrice}}</span>
                    <p class="mp-text2">元</p>
                </div>
                <div class="delivery-price">
                    <p class="dp-text1">商家配送</p>
                    <span class="delivery-price-detail">{{seller.deliveryPrice}}</span>
                    <p class="dp-text2">元</p>
                </div>
                <div class="delivery-time">
                    <p class="dt-text1">平均配送时间</p>
                    <span class="delivery-time-detail">{{seller.deliveryTime}}</span>
                    <p class="dt-text2">分钟</p>
                </div>
            </div>
        </div>
        <div class="announce-wrapper">
            <div class="announce-head-wrapper">
                <h1 class="title">公告与活动</h1>
                <p class="announce-text">{{seller.bulletin}}</p>
            </div>
            <ul>
                <li class="activity" v-for="(support, index) in seller.supports" :key="index">
                    <span class="icon" :class="classMap[support.type]"></span>
                    <span class="activity-item">{{support.description}}</span>
                </li>
            </ul>
        </div>
        <div class="seller-show-wrapper">
            <h1 class="show-title">商家实景</h1>
            <div class="show-picture-wrapper" ref="picWrapper">
                <ul class="pic-list" ref="picList">
                    <li class="show-picture" v-for="(pic, index) in seller.pics" :key="index">
                        <img width="120px" height="90px" :src="pic" draggable="false">
                    </li>
                </ul>
            </div>
        </div>
        <div class="seller-info">
            <h1 class="info-title">商家信息</h1>
            <div class="info-detail">
                <ul>
                    <li class="info-item" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import star from '../star/star'
import BScroll from 'better-scroll'

export default {
  name: 'sellers',
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  watch: {
    'seller' () {
      this._initPics()
    }
  },
  mounted () {
    this._initPics()
  },
  props: {
    seller: {}
  },
  components: {
    star
  },
  methods: {
    _initPics () {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
.sellers
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    .header-wrapper
        position relative
        padding 18px
        &:after
            position absolute
            bottom -16px
            left 0
            width 100%
            height 16px
            background #f3f5f7
            content ''
        .header
            font-size 0
            padding-bottom 18px
            border-1px(rgba(7, 17, 27, 0.1))
            .title
                display block
                margin-bottom 8px
                font-size 14px
                rgb(7, 17, 27)
                line-height 14px
            .star
                display inline-block
                vertical-align top
            .rate-count
                display inline-block
                margin 0 12px 0 8px
                font-size 10px
                color rgb(77, 85, 93)
            .sell-count
                display inline-block
                font-size 10px
                color rgb(77, 85, 93)
                line-height 18px
        .header-info
            padding-top 18px
            display flex
            .min-price, .delivery-price, .delivery-time
                flex 1
                font-size 0
                text-align center
                .mp-text1, .dp-text1, .dt-text1
                    font-size 10px
                    rgb(147, 153, 159)
                    line-height 10px
                    margin-bottom 4px
                .min-price-detail, .delivery-price-detail, .delivery-time-detail
                    display inline-block
                    font-size 24px
                    font-weight 200
                    color rgb(7, 17, 27)
                    line-height 24px
                .mp-text2, .dp-text2, .dt-text2
                    display inline-block
                    font-size 10px
                    font-weight 200
                    color rgb(7, 17, 27)
                    line-height 24px
            .min-price, .delivery-price
                border-right 1px solid rgba(7, 17, 27, 0.1)
    .announce-wrapper
        position relative
        top 16px
        left 0
        padding 18px 18px 0 18px
        &:after
            position absolute
            bottom -16px
            left 0
            width 100%
            height 16px
            background #f3f5f7
            content ''
        .announce-head-wrapper
            padding-bottom 16px
            border-1px(rgba(7, 17, 27, 0.1))
            .title
                font-size 14px
                rgb(7, 17, 27)
                line-height 14px
                margin-bottom 8px
            .announce-text
                margin-left 12px
                font-size 12px
                font-weight 200
                color rgb(240, 20, 20)
                line-height 24px
        .activity
            padding 16px 12px
            border-1px(rgba(7, 17, 27, 0.1))
            font-size 0
            &:last-child
                border-none()
            .icon
                display inline-block
                vertical-align top
                width 16px
                height 16px
                background-size 100% 100%
                margin-right 6px
                &.decrease
                    bg-image('decrease_1')
                &.discount
                    bg-image('discount_1')
                &.guarantee
                    bg-image('guarantee_1')
                &.invoice
                    bg-image('invoice_1')
                &.special
                    bg-image('special_1')
            .activity-item
                font-weight 200
                font-size 12px
                color rgb(7, 17, 27)
                line-height 16px
    .seller-show-wrapper
        position relative
        margin-top 1px
        top 32px
        left 0
        padding 18px 0 18px 18px
        &:after
            position absolute
            bottom -16px
            left 0
            width 100%
            height 16px
            content ''
            background #f3f5f7
        .show-title
            font-size 14px
            rgb(7, 17, 27)
            line-height 14px
        .show-picture-wrapper
            margin-top 12px
            width 100%
            white-space nowrap
            overflow hidden
            .pic-list
                width 100%
                .show-picture
                    display inline
                    margin-right 6px
                    &:lastchild
                        margin-right 0
    .seller-info
        position relative
        top 50px
        left 0
        padding 18px 18px 0 18px
        .info-title
            padding-bottom 12px
            font-size 14px
            rgb(7, 17, 27)
            line-height 14px
            border-1px(rgba(7, 17, 27, 0.1))
        .info-detail
            font-size 0
            .info-item
                padding 16px 12px
                font-size 12px
                font-weight 200
                color rgb(7, 17, 27)
                line-height 16px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
</style>
