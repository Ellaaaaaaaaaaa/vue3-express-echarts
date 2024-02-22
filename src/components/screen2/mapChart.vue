<template>
    <div class="outerbox">
        <div id="mapChart" style="height: 500px;width:500px"></div>
    </div>
</template>

<script >
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
            let myChart1 = $echarts.init(document.getElementById("mapChart"));

            // 5.绘制图表
            myChart1.clear()

            getState().then(() => {
                setData()
                myChart1.setOption({
                    notMerge: true,
                    tooltip: {
                        show: false
                    },
                    geo: {
                        map: "china",
                        roam: false,// 一定要关闭拖拽
                        zoom: 1.23,
                        center: [105, 36], // 调整地图位置
                        label: {
                            normal: {
                                show: false, //关闭省份名展示
                                fontSize: "10",
                                color: "rgba(0,0,0,0.7)"
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: "#0d0059",
                                borderColor: "#389dff",
                                borderWidth: 1, //设置外层边框
                                shadowBlur: 5,
                                shadowOffsetY: 8,
                                shadowOffsetX: 0,
                                shadowColor: "#01012a"
                            },
                            emphasis: {
                                areaColor: "#184cff",
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 5,
                                borderWidth: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    },
                    series: [
                        {
                            type: "map",
                            map: "china",
                            roam: false,
                            zoom: 1.23,
                            center: [105, 36],
                            // geoIndex: 1,
                            // aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: "#fff"
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: "#0d0059",
                                    borderColor: "#389dff",
                                    borderWidth: 0.5
                                },
                                emphasis: {
                                    areaColor: "#17008d",
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowBlur: 5,
                                    borderWidth: 0,
                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                }
                            }
                        }
                    ]
                })

            })

            window.onresize = function () {//自适应大小
                myChart1.resize();

            };
        })
    }
}
</script>

<style lang="less" scoped></style>