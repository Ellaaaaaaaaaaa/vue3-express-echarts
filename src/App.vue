<template>
  <router-view />
</template>
<script>
import { provide } from "vue"
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  setup() {
    provide("echarts", echarts)
    provide("axios", axios)
  }
}
</script>

<style lang="less">
hyml,
body {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}
</style>
