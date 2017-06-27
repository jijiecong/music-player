<template>
  <div class="singer-detail">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <blur :blur-amount=40 :url="this.avatar" ref="blurEvent">
      <p class="center"><img :src="this.avatar"></p>
    </blur>
    <scroller lock-x height="-200px" ref="scrollerEvent" @on-scroll="onScroll">
      <div class="music-list">
        <ul>
          <li class="item" v-for="item in songs">
            <div class="text">
              <h2 class="name" v-html="item.name"></h2>
              <p class="desc" v-html="_getDesc(item)"></p>
            </div>
          </li>
        </ul>
      </div>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Blur, Scroller } from 'vux'

  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      avatar: {
        type: String,
        default: ''
      }
    },
    watch: {
      songs() {
        this.$nextTick(() => {
          this.$refs.scrollerEvent.reset({top: 0})
        })
      }
    },
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      _getDesc(song) {
        return `${song.singer} - ${song.album}`
      },
      onScroll (pos) {
      },
      back() {
        this.$router.back()
      }
    },
    components: {
      Blur,
      Scroller
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-text
    .center {
      text-align: center;
      padding-top: 30px;
    }
    .center img {
      height: 80%;
      border-radius: 50%;
    }
    .music-list
      .item
        align-items: center
        padding: 10px 20px 10px 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          letter-spacing : 0.5px
        .name
          margin-bottom: 5px
          color: $color-text
        .desc
          color: $color-text-d

</style>
