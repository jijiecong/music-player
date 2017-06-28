<!-- 这是用vux制作的一套页面 -->
<template>
  <div>
    <scroller lock-x height="-88px" ref="scrollerEvent">
      <div>
        <swiper :list="list" :aspect-ratio="300/800" loop auto :show-desc-mask="showDescMask" @on-index-change="onIndexChange">
        </swiper>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        <div  class="loading">
          <loading v-model="show" :text="text"></loading>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">

  import { Swiper, Scroller, Loading } from 'vux'
  import { getRecommend, getDiscList } from 'api/recommend'
  import { ERR_OK } from 'api/config'

  export default {
    data() {
      return {
        list: [],
        discList: [],
        showDescMask: false,
        show: true,
        text: '加载中...'
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            let resultList = res.data.slider
            for (var i = 0; i < resultList.length; i++) {
              let item = {url: '', img: ''}
              item.url = resultList[i].linkUrl
              item.img = resultList[i].picUrl
              this.list.push(item)
            }
          }
          this.$nextTick(() => {
            this.$refs.scrollerEvent.reset({top: 0})
          })
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
            this.show = false
          }
          this.$nextTick(() => {
            this.$refs.scrollerEvent.reset({top: 0})
          })
        })
      },
      onIndexChange() {
      }
    },
    components: {
      Swiper,
      Scroller,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend-list
    .list-title
      height: 65px
      line-height: 65px
      text-align: center
      font-size: $font-size-medium
      color: $color-theme
    .item
      display: flex
      box-sizing: border-box
      align-items: center
      padding: 0 20px 20px 20px
      .icon
        flex: 0 0 60px
        width: 60px
        padding-right: 20px
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        font-size: $font-size-medium
        .name
          margin-bottom: 10px
          color: $color-text
        .desc
          color: $color-text-d
</style>
