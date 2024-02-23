<template>
    <div class="outerbox">
        <div class="mapBG">
            <div id="mapChart" style="height: 700px;width:100%;"></div>
        </div>

    </div>
</template>

<script >
import { inject, onMounted, reactive } from "vue"
import chinaMap from "@/utils/china.json";
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
            $echarts.registerMap("china", chinaMap)
            getState().then(() => {
                setData()
                myChart1.setOption({
                    notMerge: true,
                    tooltip: {
                        show: false
                    },
                    geo: {
                        map: "china",
                        roam: true,// 拖拽
                        zoom: 1.2,
                        center: [105, 36], // 调整地图位置
                        label: {
                            normal: {
                                show: true, //省份名展示
                                fontSize: "11",
                                color: "rgb(251, 251, 251, 1)"
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: "#0e435fa1",
                                borderColor: "#389dff",
                                borderWidth: 1, //设置外层边框
                                shadowBlur: 5,
                                shadowOffsetY: 8,
                                shadowOffsetX: 0,
                                shadowColor: "#01012a"
                            },
                            emphasis: {
                                areaColor: "#79CDCD",
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 5,
                                borderWidth: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    },

                })

            })

            window.onresize = function () {//自适应大小
                myChart1.resize();

            };
        })
    }
}
</script>

<style lang="less" scoped>
//格子背景效果
.mapBG {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(0deg,
            rgba(188, 224, 228, 0.219) 1px,
            transparent 1px,
        ), linear-gradient(90deg,
            rgba(188, 224, 228, 0.219) 1px,
            transparent 1px,
        );
    background-size: 30px 30px;
    z-index: -1;
}
</style>