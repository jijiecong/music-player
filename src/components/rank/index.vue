<template>
  <div class="rank">
    <scroller lock-x height="-88px" ref="scrollerEvent">
      <ul>
        <li class="item" v-for="(item,index) in topList" @click="to_router('/rank',item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl"/>
          </div>
          <div class="song-list">
            <div class="song" v-for="(song,index) in item.songList">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </div>
          </div>
        </li>
      </ul>
    </scroller>
    <div class="loading">
      <loading v-model="show" :text="text"></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getTopList } from 'api/rank'
  import { ERR_OK } from 'api/config'
  import { Scroller, Loading } from 'vux'
  import { mapMutations } from 'vuex'

  export default {
    data() {
      return {
        topList: [],
        text: '加载中...',
        show: true
      }
    },
    created() {
      this._getTopList()
    },
    methods: {
      to_router(router, item) {
        this.$router.push({path: router + '/' + item.id})
        this.setRank(item)
      },
      _getTopList() {
        getTopList().then((res) => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList
            console.log(this.topList)
            this.show = false
            this.$nextTick(() => {
              this.$refs.scrollerEvent.reset({top: 0})
            })
          }
        })
      },
      ...mapMutations({
        setRank: 'SET_RANK'
      })
    },
    components: {
      Scroller,
      Loading
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/sytlus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: absolute
    width: 100%
    top: 88px
    bottom: 0
    .item
      display: flex
      margin: 0 20px
      padding-top: 20px
      height: 100px
      .icon
        flex: 0 0 100px
        width: 100px
        height: 100px
      .song-list
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        padding: 0 20px
        height: 100px
        overflow: hidden
        background: $color-highlight-background
        color: $color-text-d
        font-size: $font-size-small
        .song
          no-wrap()
          line-height: 26px
</style>
