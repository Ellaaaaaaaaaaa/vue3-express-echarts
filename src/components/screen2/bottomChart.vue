<template>
    <div class="outerbox">
        <div class="basic-compbox" style="width: 15%;">
            <div style="color: #FFFFFFE6;font-size: 18px;line-height: 35px;">自定义标题</div>
            <div style="color: #FFFFFF4D;font-size: 12px;line-height: 20px;">custom tittle</div>
            <div class="title-text">累计帮助贫困儿童</div>
            <span style="font-size: 25px;font-weight: bold;line-height:4px">232,425</span>
            <span style="font-size: 16px;color: #FFFFFFE6;">人</span>
            <div id="chart17" class="smooth-chart"></div>
        </div>

        <div class="basic-compbox" style="width: 15%;">
            <div style="color: #FFFFFFE6;font-size: 18px;line-height: 35px;">自定义标题</div>
            <div style="color: #FFFFFF4D;font-size: 12px;line-height: 20px;">custom tittle</div>
            <div class="title-text">医疗救助</div>
            <span style="font-size: 25px;font-weight: bold;line-height:4px">225,511</span>
            <span style="font-size: 16px;color: #FFFFFFE6;">人</span>
            <div id="chart18" class="smooth-chart"></div>
        </div>

        <div class="basic-compbox" style="width: 15%;">
            <div style="color: #FFFFFFE6;font-size: 18px;line-height: 35px;">自定义标题</div>
            <div style="color: #FFFFFF4D;font-size: 12px;line-height: 20px;">custom tittle</div>

            <div class="title-text">累计帮助贫困儿童</div>
            <span style="font-size: 25px;font-weight: bold;line-height:4px">232,425</span>
            <span style="font-size: 16px;color: #FFFFFFE6;">人</span>
            <div id="chart19" class="smooth-chart"></div>
        </div>

        <div class="basic-compbox" style="width: 15%;">

            <div style="color: #FFFFFFE6;font-size: 18px;line-height: 35px;">自定义标题</div>
            <div style="color: #FFFFFF4D;font-size: 12px;line-height: 20px;">custom tittle</div>

            <div class="title-text">扶贫救灾</div>
            <span style="font-size: 25px;font-weight: bold;line-height:4px">228,512</span>
            <span style="font-size: 16px;color: #FFFFFFE6;">人</span>
            <div id="chart20" class="smooth-chart"></div>
        </div>
        <div class="basic-compbox" style="width: 40%;">
            <div style="display: flex;gap: 5px;">
                <div>
                    <div id="chart21" style="width: 300px;height: 80px;"></div>
                    <div id="chart22" style="width: 300px;height: 90px;"></div>
                </div>
                <div id="chart23" style="width: 100px;height: 170px;"></div>
                <div id="chart24" style="width: 100px;height: 170px;"></div>
            </div>
        </div>
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
        let data1 = reactive({})
        let data2 = reactive({})
        let y1data = reactive({})
        let y2data = reactive({})
        let y3data = reactive({})
        let y4data = reactive({})

        var timer = ''

        async function getState() {
            data1 = await $http({ url: "smooth-chart/data" })
            data2 = await $http({ url: "text/data" })
        }
        // 4.创建处理数据的方法
        function setData() {
            console.log("data", data1)
            y1data = data2.data.data.tableData.map(v => v.name)
            y2data = data2.data.data.tableData.map(v => v.IDnumber)
            y3data = data2.data.data.tableData.map(v => v.location)
            y4data = data2.data.data.tableData.map(v => v.place)
        }
        //3.需要获取到element,所以是onMounted 别忘了上面引用
        onMounted(() => {

            // 4.初始化echarts 别忘了给上面echarts容器添加id
            let myChart1 = $echarts.init(document.getElementById("chart17"));
            let myChart2 = $echarts.init(document.getElementById("chart18"));
            let myChart3 = $echarts.init(document.getElementById("chart19"));
            let myChart4 = $echarts.init(document.getElementById("chart20"));
            let myChart5 = $echarts.init(document.getElementById("chart21"));
            let myChart6 = $echarts.init(document.getElementById("chart22"));
            let myChart7 = $echarts.init(document.getElementById("chart23"));
            let myChart8 = $echarts.init(document.getElementById("chart24"));
            // 5.绘制图表
            getState().then(() => {
                setData()
                myChart1.setOption({
                    notMerge: true,
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(20,20,20,0.8)',
                        borderColor: '#333',
                        textStyle: {
                            color: 'rgba(251,251,251,1)'
                        }
                    },
                    grid: {
                        top: 10,
                        left: 10,
                        right: 10,
                        bottom: 20,
                    },
                    xAxis: {
                        axisTick: {
                            length: 10,
                            show: false
                        },
                        data: data1.data.data.chartData.time,
                        axisLabel: {
                            interval: 2,
                            fontSize: 12,
                            fontWeight: '400',
                            color: 'rgb(210, 209, 209)'
                        },
                    },
                    yAxis: {
                        splitLine: false,
                        show: false,
                    },
                    series: [
                        {
                            name: "医疗救助",
                            data: data1.data.data.chartData.num.medicalData,
                            type: 'line',

                            color: '#0989b3',
                            showSymbol: false,
                            areaStyle: {
                                color: '#96CDCD',
                                opacity: 0.4
                            }
                        },
                        {
                            name: "扶贫救灾",
                            data: data1.data.data.chartData.num.reliefData,
                            type: 'line',

                            color: '#0989b3',
                            showSymbol: false,
                            areaStyle: {
                                color: 'rgb(29, 34, 60)',
                                opacity: 0
                            }
                        }
                    ]
                })
                myChart2.setOption({
                    notMerge: true,
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(20,20,20,0.8)',
                        borderColor: '#333',
                        textStyle: {
                            color: 'rgba(251,251,251,1)'
                        }
                    },
                    grid: {
                        top: 10,
                        left: 10,
                        right: 10,
                        bottom: 20,
                    },
                    xAxis: {
                        axisTick: {
                            length: 10,
                            show: false
                        },
                        data: data1.data.data.chartData.time,
                        axisLabel: {
                            interval: 2,
                            fontSize: 12,
                            fontWeight: '400',
                            color: 'rgb(210, 209, 209)'
                        },
                    },
                    yAxis: {
                        splitLine: false,
                        show: false,
                    },
                    series: [
                        {
                            name: "医疗救助",
                            data: data1.data.data.chartData.num.medicalData,
                            type: 'line',

                            color: '#0989b3',
                            showSymbol: false,
                            areaStyle: {
                                color: '#96CDCD',
                                opacity: 0.4
                            }
                        },
                        {
                            name: "扶贫救灾",
                            data: data1.data.data.chartData.num.reliefData,
                            type: 'line',

                            color: '#0989b3',
                            showSymbol: false,
                            areaStyle: {
                                color: 'rgb(29, 34, 60)',
                                opacity: 0
                            }
                        }
                    ]
                })
                myChart3.setOption({
                    notMerge: true,
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(20,20,20,0.8)',
                        borderColor: '#333',
                        textStyle: {
                            color: 'rgba(251,251,251,1)'
                        }
                    },
                    grid: {
                        top: 10,
                        left: 10,
                        right: 10,
                        bottom: 20,
                    },
                    xAxis: {
                        axisTick: {
                            length: 10,
                            show: false
                        },
                        data: data1.data.data.chartData.time,
                        axisLabel: {
                            interval: 2,
                            fontSize: 12,
                            fontWeight: '400',
                            color: 'rgb(210, 209, 209)'
                        },
                    },
                    yAxis: {
                        splitLine: false,
                        show: false,
                    },
                    series: [
                        {
                            name: "医疗救助",
                            data: data1.data.data.chartData.num.medicalData,
                            type: 'line',

                            color: '#0989b3',
                            showSymbol: false,
                            areaStyle: {
                                color: '#96CDCD',
                                opacity: 0.4
                            }
                        },
                        {
                            name: "扶贫救灾",
                            data: data1.data.data.chartData.num.reliefData,
                            type: 'line',

                            color: '#0989b3',
                            showSymbol: false,
                            areaStyle: {
                                color: 'rgb(29, 34, 60)',
                                opacity: 0
                            }
                        }
                    ]
                })
                myChart4.setOption({
                    notMerge: true,
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(20,20,20,0.8)',
                        borderColor: '#333',
                        textStyle: {
                            color: 'rgba(251,251,251,1)'
                        }
                    },
                    grid: {
                        top: 10,
                        left: 10,
                        right: 10,
                        bottom: 20,

                    },
                    xAxis: {
                        axisTick: {
                            length: 10,
                            show: false
                        },
                        data: data1.data.data.chartData.time,
                        axisLabel: {
                            interval: 2,
                            fontSize: 12,
                            fontWeight: '400',
                            color: 'rgb(210, 209, 209)'
                        },
                    },
                    yAxis: {
                        splitLine: false,
                        show: false,
                    },
                    series: [
                        {
                            name: "医疗救助",
                            data: data1.data.data.chartData.num.medicalData,
                            type: 'line',

                            color: '#0989b3',
                            showSymbol: false,
                            areaStyle: {
                                color: '#96CDCD',
                                opacity: 0.4
                            }
                        },
                        {
                            name: "扶贫救灾",
                            data: data1.data.data.chartData.num.reliefData,
                            type: 'line',

                            color: '#0989b3',
                            showSymbol: false,
                            areaStyle: {
                                color: 'rgb(29, 34, 60)',
                                opacity: 0
                            }
                        }
                    ]
                })
                myChart5.setOption({
                    xAxis: {
                        splitLine: false,
                        axisLabel: {
                            show: false
                        },
                    },
                    yAxis: [
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
                                fontSize: 10,
                                fontWeight: '300',
                                color: 'rgb(230, 230, 230)'
                            },
                            data: data2.data.data.barData.name,
                        }

                    ],
                    grid: {
                        top: 0,
                        left: 50,
                        bottom: 0,
                        right: 5
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
                                        offset: 0, color: '#8eeede' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#0989b3' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                },
                                barBorderRadius: [10, 10, 10, 10]
                            },
                            data: data2.data.data.barData.state,
                            name: '未处理预警'
                        }
                    ],
                })
                var option = ({
                    series: [],
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
                            offset: 290,
                            data: y1data,
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
                                height: 40,
                                inside: true,
                                color: '#389dff',
                                textStyle: {
                                    fontSize: 10,

                                    interval: 0,
                                },
                            },

                        },
                        {
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            offset: 200,
                            data: y2data,

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
                                height: 40,
                                inside: true,
                                color: 'rgba(251,251,251,0.7)',
                                textStyle: {
                                    fontSize: 10,

                                    interval: 0,
                                },
                            },
                        },
                        {
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            offset: 90,
                            data: y3data,

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
                                height: 40,
                                inside: true,
                                color: '#FFA07A',
                                textStyle: {
                                    fontSize: 10,

                                    interval: 0,
                                },
                            },

                        },
                        {
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            offset: 30,
                            data: y4data,

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
                                height: 40,
                                inside: true,
                                color: "rgba(251,251,251,0.7)",
                                textStyle: {
                                    fontSize: 10,

                                    interval: 0,
                                },
                            },

                        },
                    ],
                    dataZoom: [{
                        filterMode: "none",
                        show: false,
                        type: "inside",
                        yAxisIndex: [0, 1, 2, 3],
                        startValue: 0,
                        endValue: 2,
                    }, {   //默认控制x轴
                        type: 'slider',//图标下方的伸缩条
                        show: true,//是否显示
                        yAxisIndex: [0, 1, 2, 3],	//控制x轴，数组可以同时控制多个轴
                        realtime: true,
                        start: 0,
                        end: 11,
                        top: "5%",
                        width: 5,
                        borderRadius: 5,
                        handleSize: '0%',
                        brushSelect: false,
                        showDetail: false,
                        right: 0,
                        fillerColor: '#ffffff4c', // 平移条的填充颜色
                        borderColor: 'transparent', // 边框颜色
                    }]
                })
                myChart7.setOption({
                    notMerge: true,
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
                                interval: 1,
                                fontSize: 8,
                                fontWeight: '400',
                                color: 'rgb(210, 210, 210)'
                            },
                            inverse: true,
                            data: data2.data.data.barData.name,
                        }

                    ],
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            color: 'rgb(210, 210, 210)',
                            fontSize: 10,
                            fontWeight: '400',
                        },
                        splitLine: false,
                    },
                    grid: {
                        x: 25,
                        y: 15,
                        x2: 10,
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
                                color: '#061B264c',
                                borderRadius: [10, 10, 10, 10]
                            },
                            barWidth: 10,
                            barGap: 0.3,
                            itemStyle: {
                                color: "#8eeede",
                                barBorderRadius: [10, 10, 10, 10]
                            },
                            data: data2.data.data.barData.state,
                            name: '危险'
                        },
                    ],

                })
                myChart8.setOption({
                    notMerge: true,
                    color: ['#FFA07A', '#0989b3', '#8eeede'],
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(20,20,20,0.8)',
                        borderColor: '#333',
                        textStyle: {
                            color: 'rgba(251,251,251,1)'
                        }
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ['60%', '80%'],
                            center: ['55%', '50%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            labelLine: {
                                show: false
                            },
                            data: data2.data.data.barData.data
                        }
                    ]

                })
                //自动滚动
                var sum = (data2.data.data.tableData).length;
                console.log(sum)
                timer = setInterval(() => {
                    if (option.dataZoom[0].endValue == sum - 1) {
                        option.dataZoom[0].endValue = 2;
                        option.dataZoom[0].startValue = 0;
                    }
                    else {
                        option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
                        option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
                    }
                    myChart6.setOption(option, true);
                }, 2000);
                myChart6.setOption(option, true);
            })

            window.onresize = function () {//自适应大小
                myChart1.resize();
                myChart2.resize();
                myChart3.resize();
                myChart4.resize();
            };
        })
        onUnmounted(() => {
            clearInterval(timer)
        })
        return {
            getState, data1, data2, y1data, y2data, y3data, y4data, setData
        }
    }

}
</script>

<style lang="less" scoped>
.outerbox {
    height: 100px;
    display: flex;
    gap: 10px;
}

.smooth-chart {
    width: 190px;
    height: 55px;
}

.basic-compbox {
    font-family: "Microsoft Yahei";
    background-color: #04273A;
    height: 170px;
    color: aqua;
    margin-top: 0px;
    padding-left: 10px;
    text-align: left;
}

.title-text {
    font-size: 13px;
    margin-bottom: 10px;
    color: rgb(210, 209, 209);
}
</style>