<template>
    <div class="outerbox">
        <div style="height:180px;width:500px;display: flex;">
            <div class="pie-wrapper" v-for="(item, index) in list" :key="index">
                <div class="pie-chart" style="height:100px;width:100px;margin-top:40px;"></div>
            </div>
            <div id="chart13" style="height:180px;width:300px;"></div>
        </div>
        <div class="text">
            <div id="chart14" style="height: 200px;width: 500px;"></div>
        </div>

        <div>
            <div id="chart15"></div>
            <div id="chart16"></div>
        </div>
    </div>
</template>

<script>
import { inject, onMounted, reactive } from "vue"

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
export default {
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
        // let xdata = reactive([])
        // let y1data = reactive([])
        // let y2data = reactive([])
        async function getState() {
            data1 = await $http({ url: "bar-chart/data" })
            data2 = await $http({ url: "text/data" })
        }
        function setData() {
            console.log("data-bar", data1)
            console.log("text", data2)
        }
        //3.需要获取到element,所以是onMounted 别忘了上面引用
        onMounted(() => {
            // 4.初始化echarts 别忘了给上面echarts容器添加id
            let myCharts = document.getElementsByClassName("pie-chart");
            let myChart2 = $echarts.init(document.getElementById("chart13"));
            let myChart3 = $echarts.init(document.getElementById("chart14"));
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

                myChart3.setOption({
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
                            offset: 470,

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
                                width: 40,
                                height: 42,
                                inside: true,
                                color: '#7AC5CD',
                                textStyle: {
                                    fontSize: 16,

                                    interval: 0,
                                },
                            },
                            data: data2.data.data.chartData.name
                        },
                        {
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            offset: 365,

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
                                width: 130,
                                height: 42,
                                overflow: "break",
                                inside: true,
                                color: '#7AC5CD',
                                textStyle: {
                                    fontSize: 16,

                                    interval: 0,
                                },
                            },
                            data: data2.data.data.chartData.IDnumber
                        },
                        {
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            offset: 235,

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
                                height: 42,
                                color: "#7AC5CD",
                                inside: true,
                                textStyle: {
                                    fontSize: 16,

                                    interval: 0,
                                },
                            },
                            data: data2.data.data.chartData.location
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
                                height: 42,
                                color: "#7AC5CD",
                                inside: true,
                                textStyle: {
                                    fontSize: 16,

                                    interval: 0,
                                },
                            },
                            data: data2.data.data.chartData.place
                        },
                        {
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            offset: 60,

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
                                width: 130,
                                height: 42,
                                overflow: "break",
                                inside: true,
                                color: '#7AC5CD',
                                textStyle: {
                                    fontSize: 16,

                                    interval: 0,
                                },
                            },
                            data: data2.data.data.chartData.time
                        },
                    ],
                    dataZoom: [{
                        filterMode: "none",
                        show: true,
                        type: "slider",
                        startValue: 0,
                        endValue: 4,
                        width: '5',
                        showDetail: false,
                        yAxisIndex: [0, 1, 2, 3, 4],
                        height: "90%",
                        fillerColor: "#8aafb3", // 滚动条颜色
                        borderColor: "rgb(255,255,255,0)",
                        backgroundColor: 'rgb(255,255,255,0)',//两边未选中的滑动条区域的颜色
                        showDataShadow: false,//是否显示数据阴影 默认auto
                        top: '1%',
                        zoomLock: true,
                        brushSelect: false,
                        right: 0,
                        borderRadius: 5
                    },
                    {
                        type: 'inside',
                        startValue: 0,
                        endValue: 4,
                        yAxisIndex: [0, 1, 2, 3, 4],
                        zoomOnMouseWheel: false,  //滚轮是否触发缩放
                        moveOnMouseMove: true,  //鼠标滚轮触发滚动
                        moveOnMouseWheel: true
                    }
                    ]
                })

                myChart4.setOption({

                })
                myChart5.setOption({

                })
            })
            window.onresize = function () {//自适应大小
                myChart2.resize();
                myChart3.resize();
                myChart4.resize();
                myChart5.resize();
            };
        })
        return { getState, data1, data2, setData }
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