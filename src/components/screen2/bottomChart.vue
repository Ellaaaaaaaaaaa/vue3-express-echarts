<template>
    <div class="outerbox">
        <div class="basic-compbox">
            <div class="line"></div>
            <div style="color: #FFFFFFE6;font-size: 18px;line-height: 35px;">自定义标题</div>
            <div style="color: #FFFFFF4D;font-size: 12px;line-height: 20px;">custom tittle</div>
            <div class="line"></div>
            <div class="title-text">累计帮助贫困儿童</div>
            <span style="font-size: 40px;font-weight: bold;line-height:42px">232,425</span>
            <span style="font-size: 16px;">人</span>
            <div id="chart17" class="smooth-chart"></div>
        </div>

        <div class="basic-compbox">
            <div class="line"></div>
            <div style="color: #FFFFFFE6;font-size: 18px;line-height: 35px;">自定义标题</div>
            <div style="color: #FFFFFF4D;font-size: 12px;line-height: 20px;">custom tittle</div>
            <div class="line"></div>
            <div class="title-text">医疗救助</div>
            <span style="font-size: 40px;font-weight: bold;line-height:42px">225,511</span>
            <span style="font-size: 16px;">人</span>
            <div id="chart18" class="smooth-chart"></div>
        </div>

        <div class="basic-compbox">
            <div class="line"></div>
            <div style="color: #FFFFFFE6;font-size: 18px;line-height: 35px;">自定义标题</div>
            <div style="color: #FFFFFF4D;font-size: 12px;line-height: 20px;">custom tittle</div>
            <div class="line"></div>
            <div class="title-text">累计帮助贫困儿童</div>
            <span style="font-size: 40px;font-weight: bold;line-height:42px">232,425</span>
            <span style="font-size: 16px;">人</span>
            <div id="chart19" class="smooth-chart"></div>
        </div>

        <div class="basic-compbox">
            <div class="line"></div>
            <div style="color: #FFFFFFE6;font-size: 18px;line-height: 35px;">自定义标题</div>
            <div style="color: #FFFFFF4D;font-size: 12px;line-height: 20px;">custom tittle</div>
            <div class="line"></div>
            <div class="title-text">扶贫救灾</div>
            <span style="font-size: 40px;font-weight: bold;line-height:42px">228,512</span>
            <span style="font-size: 16px;">人</span>
            <div id="chart20" class="smooth-chart"></div>
        </div>

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
        let data = reactive({})
        // let xdata = reactive([])
        // let y1data = reactive([])
        // let y2data = reactive([])
        async function getState() {
            data = await $http({ url: "smooth-chart/data" })
        }
        // 4.创建处理数据的方法
        function setData() {
            console.log("data", data)
            // 便利数据并且去除对应的值
            // xdata = data.data.data.chartData.map(v => v.time).map(v => v.time)
            // y1data = data.data.data.chartData.map(v => v.num.medicalData)
            // y2data = data.data.data.chartData.map(v => v.num.reliefData)
            // console.log("x", xdata)
            // console.log("y1", y1data)
            // console.log("y2", y2data)
        }
        //3.需要获取到element,所以是onMounted 别忘了上面引用
        onMounted(() => {

            // 4.初始化echarts 别忘了给上面echarts容器添加id
            let myChart1 = $echarts.init(document.getElementById("chart17"));
            let myChart2 = $echarts.init(document.getElementById("chart18"));
            let myChart3 = $echarts.init(document.getElementById("chart19"));
            let myChart4 = $echarts.init(document.getElementById("chart20"));
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
                        x: 10,
                        y: 30,
                        x2: 10,
                        y2: 35
                    },
                    xAxis: {
                        axisTick: {
                            length: 10,
                            show: false
                        },
                        data: data.data.data.chartData.time,
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
                            data: data.data.data.chartData.num.medicalData,
                            type: 'line',
                            smooth: true,
                            color: '#e76b6f',
                            showSymbol: false,
                            areaStyle: {
                                color: '#BA55D3',
                                opacity: 0.4
                            }
                        },
                        {
                            name: "扶贫救灾",
                            data: data.data.data.chartData.num.reliefData,
                            type: 'line',
                            smooth: true,
                            color: '#e76b6f',
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
                        x: 10,
                        y: 30,
                        x2: 10,
                        y2: 35
                    },
                    xAxis: {
                        axisTick: {
                            length: 10,
                            show: false
                        },
                        data: data.data.data.chartData.time,
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
                            data: data.data.data.chartData.num.medicalData,
                            type: 'line',
                            smooth: true,
                            color: '#e76b6f',
                            showSymbol: false,
                            areaStyle: {
                                color: '#BA55D3',
                                opacity: 0.4
                            }
                        },
                        {
                            name: "扶贫救灾",
                            data: data.data.data.chartData.num.reliefData,
                            type: 'line',
                            smooth: true,
                            color: '#e76b6f',
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
                        x: 10,
                        y: 30,
                        x2: 10,
                        y2: 35
                    },
                    xAxis: {
                        axisTick: {
                            length: 10,
                            show: false
                        },
                        data: data.data.data.chartData.time,
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
                            data: data.data.data.chartData.num.medicalData,
                            type: 'line',
                            smooth: true,
                            color: '#e76b6f',
                            showSymbol: false,
                            areaStyle: {
                                color: '#BA55D3',
                                opacity: 0.4
                            }
                        },
                        {
                            name: "扶贫救灾",
                            data: data.data.data.chartData.num.reliefData,
                            type: 'line',
                            smooth: true,
                            color: '#e76b6f',
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
                        x: 10,
                        y: 30,
                        x2: 10,
                        y2: 35
                    },
                    xAxis: {
                        axisTick: {
                            length: 10,
                            show: false
                        },
                        data: data.data.data.chartData.time,
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
                            data: data.data.data.chartData.num.medicalData,
                            type: 'line',
                            smooth: true,
                            color: '#e76b6f',
                            showSymbol: false,
                            areaStyle: {
                                color: '#BA55D3',
                                opacity: 0.4
                            }
                        },
                        {
                            name: "扶贫救灾",
                            data: data.data.data.chartData.num.reliefData,
                            type: 'line',
                            smooth: true,
                            color: '#e76b6f',
                            showSymbol: false,
                            areaStyle: {
                                color: 'rgb(29, 34, 60)',
                                opacity: 0
                            }
                        }
                    ]
                })

            })
            myChart1.clear()
            myChart2.clear()
            myChart3.clear()
            myChart4.clear()

            window.onresize = function () {//自适应大小
                myChart1.resize();
                myChart2.resize();
                myChart3.resize();
                myChart4.resize();
            };
        })
        return {
            getState, data, setData
        }
    }

}
</script>

<style lang="less" scoped>
.outerbox {
    display: flex;
    padding-left: 8px;
}

.smooth-chart {
    width: 180px;
    height: 50px;
}

.basic-compbox {
    font-family: "Microsoft Yahei";
    background-color: #04273A;
    height: 150px;
    width: 250px;
    margin-top: 28px;
    text-align: left;
}

.title-text {
    font-size: 17px;
    margin-bottom: 18px;
    color: rgb(210, 209, 209);
}

.line {
    height: 2px;
    background-color: #0B3B51;
}
</style>