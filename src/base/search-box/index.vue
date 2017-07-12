<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input :placeholder="placeholder" class="box" v-model="queryKey"/>
    <i class="icon-dismiss" v-show="queryKey" @click="clear"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌手、歌曲'
      }
    },
    data() {
      return {
        queryKey: ''
      }
    },
    methods: {
      setQueryKey(queryKey) {
        this.queryKey = queryKey
      },
      clear() {
        this.queryKey = ''
      }
    },
    created() {
      this.$watch('queryKey', (newVal) => {
        this.$emit('onChangeQuery', newVal)
      })
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display : flex
    align-items: center
    box-sizing : border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background-color: $color-highlight-background
    border-radius : 6px
    .icon-search
      font-size 24px
      color: $color-background
    .box
      flex : 1
      margin: 0 5px
      line-height : 24px
      background-color: $color-highlight-background
      color: $color-text
      font-size : $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
