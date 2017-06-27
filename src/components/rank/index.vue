<template>
  <div>排行</div>
</template>

<script type="text/ecmascript-6">
  import { getPrivilegeList } from 'api/rank'

  export default {
    created() {
      this._getPrivilegeList()
    },
    methods: {
      _getPrivilegeList() {
        getPrivilegeList().then((res) => {
        })
      }
    }
  }
</script>
