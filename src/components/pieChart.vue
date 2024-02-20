<template>
    <div class="outerbox" style="display: flex;">
        <div style="height:330px">
            <div style="display: flex;">
                <div id="chart6" class="pie-chart"></div>
                <div id="chart7" class="pie-chart"></div>
            </div>
            <div style="display: flex;gap:50px;color: rgb(210, 209, 209);font-size: 16;font-weight: 200;">
                <div style="margin-left:60px">任务类型分布</div>
                <div style="margin-left:40px">任务类型分布</div>
            </div>

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
        async function getState() {
            data = await $http({ url: "pie-chart/data" })
        }
        // 4.创建处理数据的方法
        function setData() {
            console.log("data", data)
        }
        //3.需要获取到element,所以是onMounted 别忘了上面引用
        onMounted(() => {
            // 4.初始化echarts 别忘了给上面echarts容器添加id
            let myChart1 = $echarts.init(document.getElementById("chart6"));
            let myChart2 = $echarts.init(document.getElementById("chart7"));
            // 5.绘制图表
            myChart1.clear()
            myChart2.clear()
            getState().then(() => {
                setData()
                myChart1.setOption({
                    notMerge: true,
                    color: ['#9370DB', '#FFB6C1', '#FFA07A', '#BA55D3', '#483D8B', '#8A2BE2', '#EE82EE', '#F08080', '#8B008B'],
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(20,20,20,0.8)',
                        borderColor: '#333',
                        textStyle: {
                            color: 'rgba(251,251,251,1)'
                        }
                    },
                    title: {
                        text: "20.62%",
                        subtext: "分类",
                        textStyle: {
                            color: 'rgba(251,251,251,1)',
                            fontSize: 20
                        },
                        subtextStyle: {
                            color: 'rgba(251,251,251,1)',
                            fontSize: 20
                        },
                        textAlign: 'center',
                        x: '53%',
                        y: '40%'
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
                            data: data.data.data.chartData
                        }
                    ]
                })
                myChart2.setOption({
                    notMerge: true,
                    title: {
                        text: "82.66%",
                        textStyle: {
                            color: 'rgba(251,251,251,1)',
                            fontSize: 24
                        },
                        textAlign: 'center',
                        x: '45%',
                        y: '42%'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ['60%', '80%'],
                            center: ['45%', '50%'],
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
                                    value: 82.66,
                                    name: '',
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
                                },
                                {
                                    value: 18.34,
                                    name: '',
                                    itemStyle: {
                                        color: 'rgb(70, 73, 94)'
                                    }

                                }
                            ]
                        }
                    ]
                })
            })

            window.onresize = function () {//自适应大小
                myChart1.resize();
                myChart2.resize();
            };
        })
    }
}
</script>

<style lang="less" scoped>
.pie-chart {
    width: 200px;
    height: 250px;
}

.title-text {
    font-size: 17px;
    color: rgb(210, 209, 209);
    display: flex;
}
</style>