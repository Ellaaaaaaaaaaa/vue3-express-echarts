<template>
    <div class="outerbox">
        <div id="chart9" class="pie-rot-chart"></div>
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
            data = await $http({ url: "bar-chart-rot/data" })
        }
        let data = reactive({})
        function setData() {
            console.log("data", data)
        }
        //3.需要获取到element,所以是onMounted 别忘了上面引用
        onMounted(() => {
            // 4.初始化echarts 别忘了给上面echarts容器添加id
            let myChart = $echarts.init(document.getElementById("chart9"));
            // 5.绘制图表
            getState().then(() => {
                setData()
                myChart.clear();
                myChart.setOption({
                    notMerge: true,
                    color: ['#483D8B', '#8A2BE2', '#EE82EE', '#F08080', '#8B008B'],
                    xAxis: {
                        splitLine: false,
                        axisLabel: {
                            show: false
                        },
                    },
                    yAxis: [
                        {
                            splitLine: false,
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                interval: 0,
                                fontSize: 14,
                                fontWeight: '400',
                                color: 'rgb(210, 210, 210)'
                            },
                            inverse: true,
                            data: data.data.data.chartData.location,
                        },
                        {
                            inverse: true,
                            splitLine: false,
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                interval: 0,
                                fontSize: 14,
                                fontWeight: '400',
                                color: 'rgb(230, 230, 230)'
                            },
                            data: data.data.data.chartData.value1,
                        }

                    ],
                    grid: {
                        x: 75,
                        y: 35,
                        x2: 50,
                        y2: 30
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
                                color: 'rgba(180, 180, 180, 0.2)',
                                borderRadius: [10, 10, 10, 10]
                            },
                            barWidth: 12,
                            itemStyle: {
                                color: {
                                    type: 'linear',
                                    x: 1,
                                    y: 0,
                                    x2: 0,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#FFA07A' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#BA55D3' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                },
                                barBorderRadius: [10, 10, 10, 10]
                            },
                            data: data.data.data.chartData.value1,
                            name: '危险'
                        }
                    ],
                })
                window.onresize = function () {//自适应大小
                    myChart.resize();
                };
            })
        })
        return { getState, setData, data }
    }
}
</script>

<style lang="less" scoped>
.pie-rot-chart {
    width: 360px;
    height: 300px;
}

.title-text {
    font-size: 17px;
    color: rgb(210, 209, 209);
    display: flex;
}
</style>