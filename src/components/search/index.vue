<template>
  <div class="search">
    <search
      :placeholder="placeholder"
      @on-result-click="resultClick"
      @on-change="onChange"
      :results="results"
      v-model="query"
      position="absolute"
      auto-scroll-to-top top="88px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
    <div class="shortcut-wrapper">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="(item,index) in hotKey"
                @click="setQuery(item.k)">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Search } from 'vux'
  import { getHotKey, searchByHotKey } from 'api/search'
  import { ERR_OK } from 'api/config'
  export default {
    data() {
      return {
        cancelText: null,
        query: '',
        hotKey: [],
        results: []
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    methods: {
      setQuery(k) {
        this.query = k
      },
      _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      onChange() {
        if (this.query === '') {
          return
        }
        searchByHotKey(this.query).then((res) => {
          if (res.code === ERR_OK) {
            this.results = this._normalizeResult(res.data.song.list)
            this.$refs.search.setFocus()
          }
        })
      },
      _normalizeResult(list) {
        let ret = []
        list.forEach((item) => {
          if (item.songid && item.albummid) {
            ret.push({
              title: `${item.songname} ${item.singer[0].name}`,
              id: `${item.songid}`
            })
          }
        })
        return ret
      },
      resultClick(item) {
        console.log(item)
      },
      onFocus() {},
      onCancel() {
        this.quert = ''
        this.results = []
      },
      onSubmit() {}
    },
    components: {
      Search
    },
    created() {
      this._getHotKey()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search
    color: #222
    .shortcut-wrapper
      position: fixed
      top: 148px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d

</style>
