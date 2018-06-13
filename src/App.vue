<template>
  <div id="app">
    <vheader :sellers="seller"></vheader>
    <tab></tab>
    <keep-alive><router-view :seller="seller"></router-view></keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import vheader from './components/header/header.vue'
import tab from './components/tab/tab.vue'

export default {
  name: 'App',
  data () {
    return {
      seller: {}
    }
  },
  created () { // 这个要好好研究一下！！！！！！！！
    this.$http.get('api/seller').then(response => {
      response = response.body
      if (response.errno === 0) {
        this.seller = response.data
      }
    })
  },
  components: {
    vheader,
    tab
  }
}
</script>

<style lang="stylus">
#app {

}
</style>
