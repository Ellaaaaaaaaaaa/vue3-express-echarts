<template>
    <div class="outerbox">
        <div id="chart10" class="text-chart"></div>
    </div>
</template>

<script>
import { inject, onMounted, onUnmounted, reactive } from "vue"
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
export default {
    setup() {
        // 2得到echarts对象
        let $echarts = inject("echarts")
        let $http = inject("axios")
        var timer;
        async function getState() {
            data = await $http({ url: "text-scroll-Det/data" })
        }
        let data = reactive({})
        function setData() {
            console.log("data", data)
        }
        //3.需要获取到element,所以是onMounted 别忘了上面引用
        onMounted(() => {
            // 4.初始化echarts 别忘了给上面echarts容器添加id
            let myChart = $echarts.init(document.getElementById("chart10"));
            // 5.绘制图表
            getState().then(() => {
                setData()
                myChart.clear()
                var option = {
                    grid: {
                        left: "99.99%",
                        top: "5%",
                        right: "0%",
                        bottom: "5%",
                    },
                    xAxis: {
                        type: 'value',
                        position: 'top',
                        axisLabel: {
                            show: false
                        },

                        splitLine: {
                            show: false,

                        },
                    },
                    yAxis: [
                        {
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            offset: 250,

                            axisLine: {
                                show: false,//隐藏y轴轴线
                                lineStyle: {
                                    color: "#ffffff",
                                    width: 0,

                                },
                            },
                            axisTick: {
                                show: false, //隐藏y轴刻度
                            },


                            axisLabel: {
                                align: 'center',
                                padding: [0, 0, 2, 0],
                                width: 50,
                                height: 20,
                                inside: true,
                                color: '#FFA07A',
                                textStyle: {
                                    fontSize: 16,

                                    interval: 0,
                                },
                            },
                            data: data.data.data.chartData.location
                        },
                        {
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            offset: 150,

                            axisLine: {
                                show: false,//隐藏y轴轴线
                                lineStyle: {
                                    color: "#ffffff",
                                    width: 0,

                                },
                            },
                            axisTick: {
                                show: false, //隐藏y轴刻度
                            },
                            axisLabel: {
                                align: 'center',
                                padding: [0, 0, 2, 0],
                                width: 50,
                                height: 20,
                                inside: true,
                                color: '#BA55D3',
                                textStyle: {
                                    fontSize: 16,

                                    interval: 0,
                                },
                            },
                            data: data.data.data.chartData.value1
                        },
                        {
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            offset: 100,

                            axisLine: {
                                show: false,//隐藏y轴轴线
                                lineStyle: {
                                    color: "#ffffff",
                                    width: 0,

                                },
                            },
                            axisTick: {
                                show: false, //隐藏y轴刻度

                            },
                            axisLabel: {
                                align: 'center',
                                padding: [0, 0, 2, 0],
                                width: 50,
                                height: 20,
                                inside: true,
                                color: '#FFA07A',
                                textStyle: {
                                    fontSize: 16,

                                    interval: 0,
                                },
                            },
                            data: data.data.data.chartData.value2
                        },
                        {
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            offset: 50,

                            axisLine: {
                                show: false,//隐藏y轴轴线
                                lineStyle: {
                                    color: "#ffffff",
                                    width: 0,

                                },
                            },
                            axisTick: {
                                show: false, //隐藏y轴刻度
                            },
                            axisLabel: {
                                align: 'center',
                                padding: [0, 0, 2, 0],
                                width: 50,
                                height: 20,
                                inside: true,
                                textStyle: {
                                    fontSize: 16,

                                    interval: 0,
                                },
                            },
                            data: data.data.data.chartData.value3
                        },
                    ],
                    dataZoom: [{
                        filterMode: "none",
                        show: false,
                        type: "inside",
                        yAxisIndex: [0, 1, 2, 3],
                        startValue: 0,
                        endValue: 4,
                    }]
                }

                //自动滚动
                var sum = (data.data.data.chartData.location).length;
                console.log(sum)
                timer = setInterval(() => {
                    if (option.dataZoom[0].endValue == sum - 1) {
                        option.dataZoom[0].endValue = 4;
                        option.dataZoom[0].startValue = 0;
                    }
                    else {
                        option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
                        option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
                    }
                    myChart.setOption(option, true);
                }, 2000);
                myChart.setOption(option, true);
            })

            window.onresize = function () {//自适应大小
                myChart.resize();
            };
        })
        onUnmounted(() => {
            clearInterval(timer)
        })
        return { getState, setData, data }
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