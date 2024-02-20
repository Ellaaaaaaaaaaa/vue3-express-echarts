<template>
    <div class="outerbox">
        <div class="title-text">
            <span class="">126,415,026</span>
            <div>同比</div>
            <span>+9.4%</span>
            <div>环比</div>
            <span>-9.4%</span>
        </div>
        <div id="chart5" class="det-smo-chart"></div>
    </div>
</template>

<script>
import { inject, onMounted } from "vue"
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
export default {
    setup() {
        // 2得到echarts对象
        let $echarts = inject("echarts")
        //3.需要获取到element,所以是onMounted 别忘了上面引用
        onMounted(() => {
            // 4.初始化echarts 别忘了给上面echarts容器添加id
            let myChart = $echarts.init(document.getElementById("chart5"));
            // 5.绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(20,20,20,0.8)',
                    borderColor: '#333',
                    textStyle: {
                        color: 'rgba(251,251,251,1)'
                    }
                },
                grid: {
                    height: 55
                },
                xAxis: {
                    axisTick: {
                        length: 10,
                        show: false
                    },
                    data: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01', '08/01', '09/01', '10/01', '11/01', '12/01'],
                    axisLabel: {
                        interval: 2,
                        fontSize: 12
                    },
                },
                yAxis: {
                    splitLine: false,
                    show: false,
                },
                series: [
                    {
                        name: "医疗救助",
                        data: [113, 75, 1, 173, 134, 216, 50, 32, 173, 40, 173, 120],
                        type: 'line',
                        smooth: true,
                        color: '#e76b6f',
                        showSymbol: false,
                        areaStyle: {
                            color: '#7f007f',
                            opacity: 0.4
                        }
                    },
                    {
                        name: "扶贫救灾",
                        data: [159, 67, 148, 236, 80, 17, 217, 44, 16, 163, 225, 48],
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
            window.onresize = function () {//自适应大小
                myChart.resize();
            };
        })
    }
}
</script>

<style lang="less" scoped>
.det-smo-chart {
    width: 700px;
    height: 280px;
}

.title-text {
    font-size: 17px;
    color: rgb(210, 209, 209);
    display: flex;
}
</style>