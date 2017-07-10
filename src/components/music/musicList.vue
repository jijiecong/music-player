<template>
  <div class="singer-detail">
    <x-header class="header" :left-options="{backText: ''}"></x-header>
    <scroller lock-x height="-40px" ref="scrollerEvent" @on-scroll="onScroll">
      <div>
        <blur :blur-amount=15 :url="this.avatar" ref="blurEvent" class="blur">
          <p class="center"><img :src="this.avatar"></p>
          <div class="play-wrapper">
            <div v-show="songs.length>0" class="play" @click="random">
              <i class="icon-play"></i>
              <span class="text">随机播放全部</span>
            </div>
          </div>
        </blur>
        <song-list :songs="songs" @select="select"></song-list>
      </div>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Blur, Scroller, XHeader } from 'vux'
  import SongList from 'components/song'
  import {mapActions, mapGetters} from 'vuex'

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
      avatar() {
        this.$nextTick(() => {
          this.$refs.scrollerEvent.reset({top: 0})
        })
      },
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
    computed: {
      ...mapGetters(['getPlayList'])
    },
    methods: {
      random() {
        let fullScreen = !(this.getPlayList.length > 0)
        this.randomPlayer({
          playlist: this.songs,
          fullScreen: fullScreen
        })
      },
      _getDesc(song) {
        return `${song.singer} - ${song.album}`
      },
      onScroll (pos) {
      },
      back() {
        this.$router.back()
      },
      select(item, index) {
        let fullScreen = !(this.getPlayList.length > 0)
        this.initPlayer({
          playlist: this.songs,
          index: index,
          fullScreen: fullScreen
        })
      },
      ...mapActions([
        'initPlayer',
        'randomPlayer'
      ])
    },
    components: {
      Blur,
      Scroller,
      XHeader,
      SongList
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
    .header
      background-color: $color-background
      padding: 0 0
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
      height: 160px;
      width: 320px;
      text-align: center;
      padding-top: 10px;
    }
    .center img {
      height: 80%;
      border-radius: 50%;
    }
    .play-wrapper
      position: absolute
      bottom: 10px
      z-index: 50
      width: 100%
      .play
        box-sizing: border-box
        width: 135px
        padding: 4px 0
        margin: 0 auto
        text-align: center
        border: 1px solid $color-theme
        color: $color-theme
        border-radius: 100px
        font-size: 0
        .icon-play
          display: inline-block
          vertical-align: middle
          margin-right: 6px
          font-size: $font-size-medium-x
        .text
          display: inline-block
          vertical-align: middle
          font-size: $font-size-small
</style>
