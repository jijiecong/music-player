<template>
  <transition>
    <music-list :title="title" :avatar="avatar" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music/musicList'
  import { mapGetters } from 'vuex'
  import { getDiscDetail } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'

  export default {
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDiscDetail()
    },
    methods: {
      _getDiscDetail() {
        if (!this.getDisc.dissid) {
          this.$router.back()
          return
        }
        getDiscDetail(this.getDisc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          if (item.songid && item.albummid) {
            ret.push(createSong(item))
          }
        })
        return ret
      }
    },
    computed: {
      title() {
        return this.getDisc.dissname
      },
      avatar() {
        return this.getDisc.imgurl
      },
      ...mapGetters([
        'getDisc'
      ])
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
    transform: translate3d(100%, 0, 0)
</style>
