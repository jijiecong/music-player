<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(item, index) in songs"
          @click="click(item, index)">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
        </div>
        <div class="content">
          <h2 class="name" v-html="item.name"></h2>
          <p class="desc" v-html="_getDesc(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getRankText(index) {
        if (index > 2) {
          return index + 1
        }
      },
      getRankCls(index) {
        if (index <= 2) {
          return 'icon icon' + index
        } else {
          return 'text'
        }
      },
      _getDesc(song) {
        return `${song.singer} - ${song.album}`
      },
      click(item, index) {
        this.$emit('select', item, index)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      padding: 10px 20px 10px 20px
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        font-size: $font-size-medium
        letter-spacing: 0.5px
      .name
        margin-bottom: 5px
        color: $color-text
      .desc
        color: $color-text-d
</style>
