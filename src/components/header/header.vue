<template>
  <div class="headd">
    <div class="content-wrapper">
        <div class="avatar">
            <img width="64" height="64" :src="sellers.avatar">
        </div>
        <div class="content">
            <div class="title">
                <span class="brand"></span>
                <span class="name">{{sellers.name}}</span>
            </div>
            <div class="discription">
                {{sellers.description}}/{{sellers.deliveryTime}}分钟送达
            </div>
            <!--防止异步过程发生-->
            <div v-if="sellers.supports" class="support">
                <span class="icon" :class="classMap[sellers.supports[0].type]"></span>
                <span class="text">{{sellers.supports[0].description}}</span>
            </div>
        </div>
        <div v-if="sellers.supports" class="support-count" @click="showDetail">
            <span class="count">{{sellers.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span><span class="bulletin-text">{{sellers.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="back-ground">
        <img :src="sellers.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
          <div class="detail-wrapper clearfix">
              <div class="detail-main">
                  <h1 class="name">{{sellers.name}}</h1>
                  <div class="star-wrapper">
                      <star :size="48" :score="sellers.score"></star>
                  </div>
                  <div class="title">
                      <div class="line"></div>
                      <div class="text">优惠信息</div>
                      <div class="line"></div>
                  </div>
                  <ul v-if="sellers.supports" class="supports">
                      <li class="support-item" v-for="item in sellers.supports" :key="item.type">
                          <span class="icons" :class="classMap[item.type]"></span><span class="texts">{{item.description}}</span>
                      </li>
                  </ul>
                  <div class="title">
                      <div class="line"></div>
                      <div class="text">商家公告</div>
                      <div class="line"></div>
                  </div>
                  <div class="bulletins">
                      <p class="contents">{{sellers.bulletin}}</p>
                  </div>
              </div>
          </div>
          <div class="detail-close" @click="closeDetail">
              <i class="icon-close"></i>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star'

export default {
  name: 'vheader',
  props: {
    sellers: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    closeDetail () {
      this.detailShow = false
    }
  },
  components: {
    star
  }
}
</script>

<style scoped lang="stylus">
.headd {
  position: relative;
  color: #fff;
  overflow: hidden;
  background: rgba(7, 17, 27, 0.5);
}
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }
    .avatar {
      display: inline-block;
      vertical-align: top;
    }
      .avatar img {
        border-radius: 2px;
      }
    .content {
      display: inline-block;
      margin-left: 16px;
    }
      .title {
        margin: 2px 0 8px 0;
      }
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          bg-image("brand");
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
        }
      .discription {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support {
      }
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-left: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: top;
        }
          .decrease {
            bg-image('decrease_1');
           }
          .discount {
            bg-image('discount_1');
          }
          .guarantee {
            bg-image('guarantee_1');
          }
          .invoice {
            bg-image('invoice_1');
          }
          .special {
            bg-image('special_1');
          }
        .text {
          line-height: 12px;
          font-size: 10px;
          margin-left: 4px;
        }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 24px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
    }
      .count {
        font-size: 10px;
        vertical-align: top;
      }
      .support-count .icon-keyboard_arrow_right {
        margin-left: 2px;
        font-size: 10px;
        line-height: 24px;
      }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    background: rgba(7, 17, 27, 0.2);
    padding: 0 22px 0 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
    .bulletin-title {
      vertical-align: top;
      display: inline-block;
      margin-left: 12px;
      margin-right: 4px;
      margin-top: 8px;
      border-radius: 1px;
      height: 12px;
      width: 22px;
      background-size: 22px 12px;
      background-repeat: no-repeat;
      bg-image('bulletin');
    }
    .bulletin-text {
      line-height: 28px;
      text-align: center;
      font-size: 10px;
      font-weight: 200;
      color: rgb(255, 255, 255);
    }
    .bulletin-wrapper .icon-keyboard_arrow_right {
      position: absolute;
      right: 12px;
      bottom: 8px;
      margin-left: 4px;
      font-size: 10px;
      }
  .back-ground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    backdop-filter: blur(10px);
  }
    .fade-enter-active, .fade-leave-active {
      opacity: 1;
      transition: all .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    .detail-wrapper {
      min-height: 100%;
      width: 100%;
    }
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
      }
        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrapper {
          margin-top: 16px;
          padding: 2px 0;
          text-align: center;
        }
        .detail-main .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
        }
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            padding: 0 12px 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        .detail-main .supports {
          display: block;
          position: relative;
          width: 80%;
          margin: 0 auto 0 auto;
        }
          .detail-main .support-item {
            margin-bottom: 12px;
            margin-left: 12px;
            margin-right: 12px;
            font-size: 0;
          }
          .detail-main .support-item:last-child {
            margin-bottom: 0;
          }
            .detail-main .icons {
              display: inline-block;
              width: 16px;
              height: 16px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              vertical-align: top;
            }
            .detail-main .supports .texts {
              display: inline-block;
              margin-left: 6px;
              font-size: 12px;
              font-weight: 200;
              color: rgb(255, 255, 255);
              line-height: 16px;
            }
        .bulletins {
          width: 80%;
          margin: 0 auto;
        }
          .contents {
            margin: 0 12px 0 12px;
            font-size: 12px;
            font-weight: 200;
            color: rgb(255, 255, 255);
            line-height: 24px;
          }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
      color: rgba(255, 255, 255, 0.5);
    }
</style>
