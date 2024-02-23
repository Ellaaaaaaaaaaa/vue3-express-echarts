<template>
    <div class="outerbox">
        <div id="chart8" class="bar-chart"></div>
    </div>
</template>

<script>
import { inject, onMounted, reactive } from "vue"
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
export default {
    setup() {
        // 2得到echarts对象
        let $echarts = inject("echarts")
        let $http = inject("axios")
        async function getState() {
            data = await $http({ url: "bar-chart/data" })
        }
        let data = reactive({})
        function setData() {
            console.log("data", data)
        }
        //3.需要获取到element,所以是onMounted 别忘了上面引用
        onMounted(() => {
            // 4.初始化echarts 别忘了给上面echarts容器添加id
            let myChart = $echarts.init(document.getElementById("chart8"));
            // 5.绘制图表
            getState().then(() => {

                setData()
                myChart.clear();
                myChart.setOption({
                    notMerge: true,
                    color: ['#483D8B', '#8A2BE2', '#EE82EE', '#F08080', '#8B008B'],
                    xAxis: {
                        axisTick: {
                            length: 10,
                            show: false
                        },
                        axisLabel: {
                            interval: 0,
                            fontSize: 12,
                            fontWeight: '400',
                            color: 'rgb(210, 209, 209)'
                        },
                        data: data.data.data.chartData.time
                    },
                    yAxis: {
                        splitLine: false,
                        show: false,
                    },
                    grid: {
                        x: 15,
                        y: 45,
                        x2: 15,
                        y2: 40
                    },
                    tooltip: {
                        //trigger: 'axis',
                        backgroundColor: 'rgba(20,20,20,0.8)',
                        borderColor: '#333',
                        textStyle: {
                            color: 'rgba(251,251,251,1)'
                        }
                    },
                    series: [
                        {
                            type: 'bar',
                            showBackground: true,
                            backgroundStyle: {
                                color: 'rgba(180, 180, 180, 0.2)'
                            },
                            barWidth: 12,
                            itemStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#FFA07A' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#BA55D3' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            },
                            data: data.data.data.chartData.valve,
                            name: '轻微'
                        }
                    ],
                })
            })
            window.onresize = function () {//自适应大小
                myChart.resize();
            };
        })
        return { getState, setData, data }
    }
}
</script>

<style lang="less" scoped>
.bar-chart {
    width: 100%;
    height: 330px;
}

.title-text {
    font-size: 17px;
    color: rgb(210, 209, 209);
    display: flex;
}
</style>