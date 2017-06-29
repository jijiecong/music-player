<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(item, index) in songs" @click="click(item, index)">
        <div class="text">
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
      }
    },
    methods: {
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

  .song-list
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
