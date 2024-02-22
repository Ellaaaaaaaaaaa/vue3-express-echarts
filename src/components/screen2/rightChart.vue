<template>
    <div>
        <div v-for="(item, index) in item" :key="index">
            <div class="title">{{ item }}</div>
            <div class="content">
                <div style="margin: 0px 5px 0 5px;">
                    <span style="color: #bdccee72;font-size: 12px;">总数</span>
                    <span style="color: aqua;font-size: 14px;font-weight: 600;">{{ sum[index] }}万</span>
                </div>
                <div style="margin: 0px 0px 0 5px;">
                    <span style="color: #bdccee72;font-size: 12px;">环比</span>
                    <span style="color: orange;font-size: 14px;font-weight: 600;">{{ percentage[index] }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, onMounted, reactive, toRefs } from "vue"
export default {
    setup() {
        let $http = inject("axios")
        let state = reactive({
            item: [],
            sum: [],
            percentage: []
        })

        async function getData() {
            try {
                let response = await $http({ url: "text/data" })
                state.item = response.data.data.cardData.item
                state.sum = response.data.data.cardData.sum
                state.percentage = response.data.data.cardData.percentage
                console.log("item", state.item)
            } catch (error) {
                console.error("Error fetching card data:", error)
            }
        }
        onMounted(() => {
            getData()
        })

        return {
            ...toRefs(state),
            getData,
        }
    }
}
</script>

<style lang="less" scoped>
.title {
    width: 115px;
    height: 25px;
    margin: 10px 10px 0 10px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    background-color: #145393e5;
}

.content {
    width: 115px;
    height: 50px;
    display: flex;
    background-color: #033f7c59;
    margin: 0px 10px 0 10px;
}
</style>