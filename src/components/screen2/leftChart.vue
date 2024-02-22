<template>
    <div class="outerbox">
        <div style="height:180px;width:500px;display: flex;">
            <div class="pie-wrapper" v-for="(item, index) in list" :key="index">
                <div class="pie-chart" style="height:100px;width:100px;margin-top:40px;"></div>
            </div>
            <div id="chart13" style="height:180px;width:300px;">
            </div>

        </div>
        <div class="text">
            <div style="height: 200px;width: 500px;overflow: auto;">
                <tableChart></tableChart>
            </div>

        </div>

        <div style="display: flex;">
            <div id="chart15" style="height: 220px;width: 300px;"></div>
            <div id="chart16" style="height: 220px;width: 300px;"></div>
        </div>
    </div>
</template>

<script>
import { inject, onMounted, reactive } from "vue"
import tableChart from './tableChart.vue';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
export default {
    components: {
        tableChart,
    },
    data() {
        return {
            list: [{ id: 1 }, { id: 2 }]
        }
    },

    setup() {
        // 2得到echarts对象
        let $echarts = inject("echarts")
        let $http = inject("axios")
        let data1 = reactive({})
        let data2 = reactive({})
        let data3 = reactive({})
        let data4 = reactive({})
        async function getState() {
            data1 = await $http({ url: "bar-chart/data" })
            data2 = await $http({ url: "text/data" })
            data3 = await $http({ url: "bar-chart-rot/data" })
            data4 = await $http({ url: "radar/data" })
        }
        function setData() {
            console.log("data-bar", data1)
            console.log("text", data2)
            console.log("radar", data4)
        }
        //3.需要获取到element,所以是onMounted 别忘了上面引用
        onMounted(() => {
            // 4.初始化echarts 别忘了给上面echarts容器添加id
            let myCharts = document.getElementsByClassName("pie-chart");
            let myChart2 = $echarts.init(document.getElementById("chart13"));
            let myChart4 = $echarts.init(document.getElementById("chart15"));
            let myChart5 = $echarts.init(document.getElementById("chart16"));

            // 5.绘制图表
            //myChart.clear()
            getState().then(() => {
                setData()
                for (var i = 0; i < myCharts.length; i++) {
                    var myChart = $echarts.init(myCharts[i])
                    myChart.setOption({
                        title: {
                            text: "46.83%",
                            textStyle: {
                                color: 'rgba(251,251,251,1)',
                                fontSize: 17
                            },
                            textAlign: 'center',
                            x: '45%',
                            y: '40%'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: ['65%', '90%'],
                                center: ['50%', '50%'],
                                avoidLabelOverlap: false,
                                label: {
                                    show: false,
                                    position: 'center'
                                },
                                labelLine: {
                                    show: false
                                },
                                data: [
                                    {
                                        value: 46.83,
                                        name: '',
                                        itemStyle: {
                                            color: {
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 0,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0, color: '#8eeede' // 0% 处的颜色
                                                }, {
                                                    offset: 1, color: '#0989b3' // 100% 处的颜色
                                                }],
                                                global: false // 缺省为 false
                                            }
                                        },
                                    },
                                    {
                                        value: 53.17,
                                        name: '',
                                        itemStyle: {
                                            color: 'rgb(70, 73, 94)'
                                        }

                                    }
                                ]
                            }
                        ]
                    })
                }
                myChart2.setOption({
                    notMerge: true,
                    xAxis: {
                        axisTick: {
                            length: 5,

                        },
                        axisLabel: {
                            interval: 1,
                            fontSize: 12,
                            fontWeight: '400',
                            color: 'rgb(210, 209, 209)'
                        },
                        data: data1.data.data.chartData.time
                    },
                    yAxis: {
                        splitLine: false,
                        axisLine: {
                            show: true,
                        },
                        axisTick: {
                            show: true,
                        },
                    },
                    grid: {
                        x: 45,
                        y: 15,
                        x2: 0,
                        y2: 25
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
                                        offset: 0, color: '#8eeede' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#0989b3' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            },
                            data: data1.data.data.chartData.valve,
                            name: '轻微'
                        }
                    ],
                })

                myChart4.setOption({
                    notMerge: true,
                    color: ['#483D8B', '#8A2BE2', '#EE82EE', '#F08080', '#8B008B'],
                    xAxis: [
                        {
                            splitLine: false,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                interval: 0,
                                fontSize: 14,
                                fontWeight: '400',
                                color: 'rgb(210, 210, 210)'
                            },
                            inverse: true,
                            data: data3.data.data.chartData.location,
                        }

                    ],
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        splitLine: false,
                    },
                    grid: {
                        x: 30,
                        y: 25,
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
                                color: "#8eeede",
                                barBorderRadius: [10, 10, 10, 10]
                            },
                            data: data3.data.data.chartData.value1,
                            name: '危险'
                        },
                        {
                            type: 'bar',
                            showBackground: true,
                            backgroundStyle: {
                                color: 'rgba(180, 180, 180, 0.2)',
                                borderRadius: [10, 10, 10, 10]
                            },
                            barWidth: 10,
                            itemStyle: {
                                color: "#0989b3",
                                barBorderRadius: [10, 10, 10, 10]
                            },
                            data: data3.data.data.chartData.value2,
                            name: '轻微'
                        }
                    ],

                })
                myChart5.setOption({
                    color: ["#0989b3", "#8eeede"],

                    radar: {
                        indicator: data4.data.data.chartData.location,
                        radius: '65%',
                        nameGap: 8,
                        shape: 'circle',
                        axisName: {
                            color: "white"
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#0989b3',
                                opacity: 0.5
                            }

                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#0989b3',
                                opacity: 0.5
                            }
                        },
                        splitArea: {
                            show: false,
                        }

                    },
                    series: {
                        type: "radar",
                        symbol: 'none',
                        areaStyle: {
                            opacity: 0.7
                        },
                        data: [data4.data.data.chartData.value1, data4.data.data.chartData.value2]
                    }
                })
            })
            window.onresize = function () {//自适应大小
                myChart2.resize();
                myChart4.resize();
                myChart5.resize();
            };
        })
        return { getState, data1, data2, data3, data4, setData }
    }
}
</script>

<style lang="less" scoped>
.text {
    height: 200px;
    width: 500px;
    border: 6px solid;
    border-color: #7AC5CD #09384D #09384D #09384D;
}
</style>