<template>
  <scroller lock-x scrollbar-y ref="scrollerEvent" height="-178px" use-pullup
            @on-pullup-loading="load" :pullup-config="pullupConfig">
    <div class="suggest">
      <ul class="suggest-list">
        <li class="suggest-item" v-for="(item, index) in results"
            @click="select(item)">
          <div class="icon">
            <i :class="getIconCls(item)"></i>
          </div>
          <div class="name">
            <p class="text" v-html="getDisplayName(item)"></p>
          </div>
        </li>
      </ul>
    </div>
  </scroller>
</template>
<script type="text/ecmascript-6">
  import { searchByKey } from 'api/search'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import { Scroller } from 'vux'
  import { mapMutations } from 'vuex'

  const TYPE_SINGER = 'singer'

  export default {
    data() {
      return {
        page: 1,
        results: [],
        pullupConfig: {
          content: '上拉加载更多',
          downContent: '松开进行加载',
          upContent: '上拉加载更多',
          loadingContent: '加载中...'
        }
      }
    },
    watch: {
      queryKey() {
        this.page = 1
        this.results = []
        this.$nextTick(() => {
          this.$refs.scrollerEvent.reset({top: 0})
        })
        this._searchByKey()
      }
    },
    methods: {
      select(item) {
        if (item.type === TYPE_SINGER) {
          this.$router.push({path: '/search' + '/' + item.singerid})
          let singer = {
            id: item.singermid,
            name: item.singername,
            link: 'https://y.qq.com/n/yqq/singer/' + item.singermid + '.html#stat=y_new.singerlist.singerpic',
            avatar: 'https://y.gtimg.cn/music/photo_new/T001R150x150M000' + item.singermid + '.jpg?max_age=2592000'
          }
          this.setSinger(singer)
        }
      },
      load () {
        this.page = this.page + 1
        this._searchByKey()
        this.$refs.scrollerEvent.donePullup()
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return `${item.singername}`
        } else {
          return `${item.name} ${item.singer}`
        }
      },
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      _getResluts(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      _searchByKey() {
        if (this.queryKey === '') {
          return
        }
        searchByKey(this.queryKey, this.catZhida, this.page).then((res) => {
          if (res.code === ERR_OK) {
            this.results = this.results.concat(this._getResluts(res.data))
          }
        })
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    props: {
      queryKey: {
        type: String,
        default: ''
      },
      catZhida: {
        type: Boolean,
        default: true
      }
    },
    components: {
      Scroller
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^='icon-']
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
