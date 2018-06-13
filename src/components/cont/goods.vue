<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" :key="item.name" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)"
                    class="menu-item">
                    <span class="text border-1px">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span><span>{{item.name}}</span>
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" :key="item.name" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" :key="food.name" class="food-item border-1px">
                            <div class="icon" @click="selectFood(food, $event)">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc" v-show="food.description">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}份</span><span class="good">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <div class="price1">
                                        <span class="money1">¥</span><span class="new-price">{{food.price}}</span>
                                    </div>
                                    <div class="price2">
                                        <span class="money2" v-show="food.oldPrice">¥</span><span
                                            v-show="food.oldPrice" class="old-price">{{food.oldPrice}}</span>
                                    </div>
                                </div>
                                <div class="cartctrl-wrapper">
                                    <cartctrl :food="food"></cartctrl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :selectFoods="selectFoods"></shopcart>
        <food :selectFood="selectfood" ref="showFood"></food>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart.vue'
import cartctrl from '../cartctrl/cartctrl'
import food from '../food/food'
const ERR_OK = 0

export default {
  name: 'goods',
  data () {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      listHeight: [],
      scrollY: 0,
      selectfood: {}
    }
  },
  created () {
    this.$http.get('/api/goods').then(response => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        // 异步处理
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = document.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu: function (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = document.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectfood = food
      this.$refs.showFood.show()
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  components: {
    shopcart,
    cartctrl,
    food
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
.goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
        flex 0 0 80px
        width 80px
        background #f3f5f7
        .menu-item
            position relative
            display table
            padding-left 12px
            padding-right 12px
            height 54px
            width 56px
            line-height 14px
            &.current
                position relative
                margin-top -1px
                z-index 10
                background #fff
                font-weight 700
            .text
                display table-cell
                vertical-align middle
                border-1px(rgba(7, 17, 27, 0.1))
                font-size 12px
                font-weight 200
                .icon
                    display inline-block
                    vertical-align top
                    width 12px
                    height 12px
                    margin-right 2px
                    background-size 12px 12px
                    background-repeat no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
    .foods-wrapper
        flex 1
        .food-list
            margin-left 0
            .title
                display block
                padding-left 12px
                height 26px
                font-size 12px
                color rgb(147, 153, 159)
                line-height 26px
                background: #f3f5f7
                border-left 2px solid #d9dde1
            .food-item
                position relative
                margin-left 18px
                padding-top 18px
                padding-bottom 18px
                padding-right 40px
                display flex
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                .icon
                    flex 0 0 57px
                    vertical-align top
                .content
                    position relative
                    flex 1
                    padding-top 2px
                    padding-left 10px
                    .name
                        line-height 14px
                        font-size 14px
                        padding-bottom 8px
                        color rgb(7, 17, 27)
                    .desc
                        font-size 10px
                        color rgb(147, 153, 159)
                        line-height 10px
                        padding-bottom 8px
                    .extra
                        font-size 10px
                        color rgb(147, 153, 159)
                        line-height 10px
                        .good
                            padding-left 12px
                    .price
                        position relative
                        bottom 0
                        line-height 24px
                        font-size 0
                        .price1
                            display inline-block
                            vertical-align top
                            .money1
                                color rgb(240, 20, 20)
                                font-size 10px
                                font-weight normal
                            .new-price
                                color rgb(240, 20, 20)
                                font-size 14px
                                font-weight 700
                        .price2
                            display inline-block
                            .money2
                                margin-left 8px
                                color rgb(147, 153, 159)
                                font-size 10px
                                font-weight normal
                            .old-price
                                text-decoration line-through
                                color rgb(147, 153, 159)
                                font-size 10px
                                font-weight 700
                    .cartctrl-wrapper
                        position absolute
                        right 0
                        bottom 0
</style>
