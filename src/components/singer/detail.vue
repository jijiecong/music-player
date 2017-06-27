<template>
  <transition name="slide">
    <music-list :songs="songs" :title="this.getSinger.name" :avatar="this.getSinger.avatar"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { getSingerDetail } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import MusicList from 'components/music/musicList'
  import { createSong } from 'common/js/song'

  export default {
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSingerDetail()
    },
    methods: {
      _getSingerDetail() {
        if (!this.getSinger.id) {
          this.$router.back()
          return
        }
        getSingerDetail(this.getSinger.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          if (item.musicData.songid && item.musicData.albummid) {
            ret.push(createSong(item.musicData))
          }
        })
        return ret
      },
      back() {
        this.$router.back()
      }
    },
    computed: {
      ...mapGetters(['getSinger'])
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100% ,0, 0)
</style>
