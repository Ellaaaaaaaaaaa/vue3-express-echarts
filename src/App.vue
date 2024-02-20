<template>
  <router-view />
</template>
<script>
import { provide } from "vue"
import * as echarts from 'echarts'
import axios from 'axios'
// 设置请求基准路径
axios.defaults.baseURL = "http://localhost:3000/"
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
