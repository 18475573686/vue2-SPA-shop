<template>
    <div>
      <nav-header></nav-header>
      <nav-bread></nav-bread>
      <div class="accessory-result-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">排序:</span>
            <a href="javascript:void(0)" class="default cur" @click.stop="defaultSort">默认</a>
            <a href="javascript:void(0)" class="price" :class="{'sort-up': sortFlag}" @click.stop="sortGoods">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby" @click.stop="showFilterPop">筛选</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter" id="filter" :class="{'filterby-show': filterBy}">
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
                      <a href="#"><img v-lazy="`/static/` + item.productImage" alt=""></a>
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
              <div class="view-more-normal"
                   v-infinite-scroll="loadMore"
                  infinite-scroll-disabled="busy"
                  infinite-scroll-distance="20">
              <img src="./../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
             </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="filterBy" @click.stop="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/goods-list.css'
import NavHeader from './../components/NavHeader.vue'
import NavBread from './../components/NavBread'
import NavFooter from './../components/NavFooter.vue'
import axios from 'axios'
export default {
  name: 'GoodsList',
  data () {
    return {
      goodsList: [],
      priceFilter: [
        {
          startPrice:'0.00',
          endPrice:'100.00'
        },
        {
          startPrice:'100.00',
          endPrice:'500.00'
        },
        {
          startPrice:'500.00',
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
          endPrice:'6000.00'
        }
      ],
      priceChecked: 'all',
      filterBy: false,
      page: 1,
      pageSize: 8,
      sortFlag: true,
      busy:true,
      loading:false,
    }
  },
  mounted () {
    this.getGoodsList();
  },
  components: {
    NavHeader,
    NavBread,
    NavFooter
  },
  methods: {
    getGoodsList (flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      }
      this.loading = true;
      axios.get('http://localhost:3000/goods', {
        params: param
      }).then(res => {
        this.loading = false;
        if (res.data.status == '0') {
          if (flag) {
            this.goodsList = this.goodsList.concat(res.data.result.list);
            if (res.data.result.count === 0) {
              this.busy = true;
            } else {
              this.busy = false;
            }
          }else {
            this.goodsList = res.data.result.list;
            this.busy = false;
          }
        }else {
          this.goodsList = [];
        }
      });
    },
    setPriceFilter (index) {
      this.priceChecked = index;
      this.page = 1;
      this.getGoodsList();
    },
    showFilterPop () {
      this.filterBy = true
    },
    closePop () {
      this.filterBy = false
    },
    sortGoods () {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
    },
    defaultSort () {
      this.sortFlag = true;
      this.page = 1;
      this.getGoodsList();
    },
    loadMore () {
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);
    }
  }
}
</script>

<style scoped>
</style>
