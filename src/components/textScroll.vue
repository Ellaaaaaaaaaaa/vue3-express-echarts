<template>
    <div class="outerbox">
        <div id="chart10" class="text-chart"></div>
    </div>
</template>

<script>
import { inject, onMounted } from "vue"
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
export default {
    setup() {
        // 2得到echarts对象
        let $echarts = inject("echarts")
        //3.需要获取到element,所以是onMounted 别忘了上面引用
        onMounted(() => {
            // 4.初始化echarts 别忘了给上面echarts容器添加id
            let myChart = $echarts.init(document.getElementById("chart10"));
            // 5.绘制图表
            myChart.setOption({


            })
            window.onresize = function () {//自适应大小
                myChart.resize();
            };
        })
    }
}
</script>

<style lang="less" scoped>
.text-chart {
    width: 300px;
    height: 300px;
}

.title-text {
    font-size: 17px;
    color: rgb(210, 209, 209);
    display: flex;
}
</style>