<template>
  <div>
    <scroller lock-x height="-88px" ref="scrollerEvent">
      <div class="singer-list">
        <ul>
          <li class="item" v-for="item in singerList">
            <a @click="to_router('/singer',item)">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.avatar"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.name"></h2>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="loading">
        <loading v-model="show" :text="text"></loading>
      </div>
    </scroller>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import { Scroller, Loading } from 'vux'
  import { mapMutations } from 'vuex'

  export default {
    data() {
      return {
        singerList: [],
        text: '加载中...',
        show: true
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            for (let index in res.data.list) {
              this.singerList.push({
                id: res.data.list[index].Fsinger_mid,
                name: res.data.list[index].Fsinger_name,
                link: 'https://y.qq.com/n/yqq/singer/' + res.data.list[index].Fsinger_mid + '.html#stat=y_new.singerlist.singerpic',
                avatar: 'https://y.gtimg.cn/music/photo_new/T001R150x150M000' + res.data.list[index].Fsinger_mid + '.jpg?max_age=2592000'
              })
            }
            this.show = false
            this.$nextTick(() => {
              this.$refs.scrollerEvent.reset({top: 0})
            })
          }
        })
      },
      to_router(router, singer) {
        this.$router.push({path: router + '/' + singer.id})
        this.setSinger(singer)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      Scroller,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-list
    .list-title
      height: 65px
      line-height: 65px
      text-align: center
      font-size: $font-size-medium
      color: $color-theme
    .item
      align-items: center
      padding: 10px 20px 10px 20px
      a
        display: flex
        box-sizing: border-box
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
          img
            border-radius: 50%;
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
        .name
          margin-bottom: 10px
          color: $color-text
</style>
