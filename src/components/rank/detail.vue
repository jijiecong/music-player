<template>
  <transition>
    <music-list :rank="rank" :title="title" :avatar="avatar" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music/musicList'
  import { mapGetters } from 'vuex'
  import { getTopDetail } from 'api/rank'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'

  export default {
    data() {
      return {
        songs: [],
        avatar: '',
        rank: true
      }
    },
    created() {
      this._getTopDetail()
    },
    methods: {
      _getTopDetail() {
        if (!this.getRank.id) {
          this.$router.back()
          return
        }
        getTopDetail(this.getRank.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
            this.avatar = this.songs[0].image
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          if (item.data.songid && item.data.albummid) {
            ret.push(createSong(item.data))
          }
        })
        return ret
      }
    },
    computed: {
      title() {
        return this.getRank.toptitle
      },
      ...mapGetters([
        'getRank'
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
