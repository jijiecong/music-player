<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box :placeholder="placeholder" ref="searchBox" @onChangeQuery="onChangeQuery"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!queryKey">
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
    <div class="search-result" v-show="queryKey">
      <suggest :queryKey="queryKey" :page="page" :catZhida="catZhida"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBox from 'base/search-box'
  import Suggest from 'components/suggest'
  import { getHotKey } from 'api/search'
  import { ERR_OK } from 'api/config'
  export default {
    data() {
      return {
        hotKey: [],
        queryKey: '',
        page: 1,
        catZhida: true
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    methods: {
      onChangeQuery(newVal) {
        this.queryKey = newVal
      },
      setQuery(queryKey) {
        this.$refs.searchBox.setQueryKey(queryKey)
      },
      _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      }
    },
    components: {
      SearchBox,
      Suggest
    },
    created() {
      this._getHotKey()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
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
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
