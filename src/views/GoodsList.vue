<template>
    <div>
      <nav-header></nav-header>
      <nav-bread></nav-bread>
      <div class="accessory-result-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">排序:</span>
            <a href="javascript:void(0)" class="default cur">默认</a>
            <a href="javascript:void(0)" class="price">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby">筛选</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter" id="filter">
              <dl class="filter-price">
                <dt>价格区间:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" :class="{'cur': priceChecked=='all'}">选择价格</a></dd>
                <dd v-for="(item, index) of priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur': priceChecked==index}">￥ {{item.startPrice}} - {{item.endPrice}} 元</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item, index) of goodsList" :key="item.productId">
                    <div class="pic">
                      <a href="#"><img :src="`/static/` + item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/goods-list.css'
import NavHeader from './../components/NavHeader.vue'
import NavBread from './../components/NavBread'
import NavFooter from './../components/NavFooter.vue'
export default {
  name: 'GoodsList',
  data () {
    return {
      goodsList: [
        {
          "productId":"10001",
          "productName":"小米空气净化器 2",
          "salePrice":"699",
          "productImage":"小米空气净化器 2.jpg"
        },
        {
          "productId":"10002",
          "productName":"米家空气净化器Pro",
          "salePrice":"1499",
          "productImage":"米家空气净化器Pro.jpg"
        },
        {
          "productId":"10003",
          "productName":"米家PM2.5检测仪",
          "salePrice":"399",
          "productImage":"米家PM2.5检测仪.jpg"
        },
        {
          "productId":"10004",
          "productName":"九号平衡车",
          "salePrice":"1999",
          "productImage":"九号平衡车.jpg"
        },
        {
          "productId":"10005",
          "productName":"小米路由器 3",
          "salePrice":"139",
          "productImage":"小米路由器 3.jpg"
        },
        {
          "productId":"10006",
          "productName":"米家压力 IH 电饭煲",
          "salePrice":"999",
          "productImage":"米家压力 IH 电饭煲.jpg"
        },
        {
          "productId":"10007",
          "productName":"米家IH电饭煲",
          "salePrice":"399",
          "productImage":"米家IH电饭煲.jpg"
        },
        {
          "productId":"10008",
          "productName":"米家恒温电水壶",
          "salePrice":"199",
          "productImage":"米家恒温电水壶.jpg"
        },
        {
          "productId":"10009",
          "productName":"米家小白智能摄像机",
          "salePrice":"399",
          "productImage":"米家小白智能摄像机.jpg"
        },
        {
          "productId":"10010",
          "productName":"Yeelight床头灯",
          "salePrice":"249",
          "productImage":"Yeelight床头灯.jpg"
        }
      ],
      priceFilter: [
        {
          startPrice:'0.00',
          endPrice:'1000.00'
        },
        {
          startPrice:'1000.00',
          endPrice:'2000.00'
        },
        {
          startPrice:'2000.00',
          endPrice:'3000.00'
        },
        {
          startPrice:'3000.00',
          endPrice:'4000.00'
        },
        {
          startPrice:'4000.00',
          endPrice:'5000.00'
        },
        {
          startPrice:'5000.00',
          endPrice:'6000.00'
        }
      ],
      priceChecked: 'all'
    }
  },
  components: {
    NavHeader,
    NavBread,
    NavFooter
  },
  methods: {
    setPriceFilter (index) {
      this.priceChecked = index
    }
  }
}
</script>

<style scoped>
</style>
