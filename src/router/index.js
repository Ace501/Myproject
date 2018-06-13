import Vue from 'vue'
import Router from 'vue-router'
import ratings from '../components/cont/ratings.vue'
import goods from '../components/cont/goods.vue'
import sellers from '../components/cont/sellers.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/sellers',
      name: 'sellers',
      component: sellers
    },
    {
      path: '/',
      name: 'regoods',
      redirect: goods
    }
  ],
  linkActiveClass: 'active'
})
