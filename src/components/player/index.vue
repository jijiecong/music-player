<template>
  <div class="player" v-show="getPlayList.length>0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="full-screen" v-show="getFullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="getCurrentSong.image">
        </div>
        <div class="top">
          <div class="back">
            <x-icon type="ios-arrow-down" size="30" @click="mini"></x-icon>
          </div>
          <h1 class="title" v-html="getCurrentSong.name"></h1>
          <h2 class="subtitle" v-html="getCurrentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="getCurrentSong.image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left" :class="iconDis">
              <i class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon i-center" :class="iconDis">
              <i :class="iconPlay" @click="togglePlay"></i>
            </div>
            <div class="icon i-right" :class="iconDis">
              <i class="icon-next" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="mini-screen" v-show="!getFullScreen" >
      <div class="icon" @click="max" >
        <img :class="cdCls" width="100%" height="100%" :src="getCurrentSong.image">
      </div>
      <div class="text" @click="max">
        <h2 class="name" v-html="getCurrentSong.name"></h2>
        <p class="desc" v-html="getCurrentSong.singer"></p>
      </div>
      <div class="control">
        <i :class="iconPlayMini" @click="togglePlay"></i>
      </div>
      <div class="control">
        <i class="icon-playlist"></i>
      </div>
    </div>
    <audio ref="audio" :src="getCurrentSong.url" @play="canPlay" @error="error"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        ready: false
      }
    },
    computed: {
      cdCls() {
        return this.getPlaying ? 'play' : 'play pause'
      },
      iconPlay() {
        return this.getPlaying ? 'icon-pause' : 'icon-play'
      },
      iconPlayMini() {
        return this.getPlaying ? 'icon-pause-mini' : 'icon-play-mini'
      },
      iconDis() {
        return this.ready ? '' : 'disable'
      },
      ...mapGetters([
        'getPlayList',
        'getFullScreen',
        'getCurrentSong',
        'getPlaying',
        'getCurrentIndex'
      ])
    },
    methods: {
      prev() {
        if (!this.ready) {
          return
        }
        this.ready = false
        let index = this.getCurrentIndex - 1
        if (index === -1) {
          index = this.getPlayList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.getPlaying) {
          this.togglePlay()
        }
      },
      next() {
        if (!this.ready) {
          return
        }
        this.ready = false
        let index = this.getCurrentIndex + 1
        if (index === this.getPlayList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.getPlaying) {
          this.togglePlay()
        }
      },
      canPlay() {
        this.ready = true
      },
      error() {
        this.ready = true
      },
      togglePlay() {
        this.setPlaying(!this.getPlaying)
      },
      enter() {
      },
      afterEnter() {
      },
      leave() {
      },
      afterLeave() {
      },
      mini() {
        this.setFullScreen(false)
      },
      max() {
        this.setFullScreen(true)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULLSCREEN',
        setPlaying: 'SET_PLAYING',
        setCurrentIndex: 'SET_CURRENTINDEX'
      })
    },
    watch: {
      getCurrentSong() {
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      getPlaying(newVal) {
        this.$nextTick(() => {
          const audio = this.$refs.audio
          newVal ? audio.play() : audio.pause()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .full-screen
      position: fixed
      left:0
      right:0
      top:0
      bottom:0
      z-index:150
      background: $color-background
      .background
        positon: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: fixed
        top: 0
        left: 0
        right: 0
        .back
          position: absolute
          top: 10px
          left: 2%
          z-index: 50
          .vux-x-icon
            fill: $color-text
        .title
          position: relative
          top: 10px
          z-index: 80
          width: 70%
          margin: 3px auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
            .pure-music
              padding-top: 50%
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom, .cd-wrapper
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.00)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
        .cd-wrapper
          transform: translate3d(-100px, 400px, 0)
    .mini-screen
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 8%
      background: $color-highlight-background
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
