<template>
    <div class="outerbox">
        <div class="title-text">
            <span style="margin: 20px 0 0 20px;height:30px;width: 28px;">126,415,026</span>
            <div style="margin: 15px 0 0 435px;line-height:30px;width: 36px;">同比</div>
            <span style="margin: 20px 0 0 5px;height:30px;width: 28px;">+9.4%</span>
            <div style="margin: 19px 0 0 28px;height:30px;width: 36px;">环比</div>
            <span style="margin: 20px 10px 0 5px;height:30px;width: 28px;">-9.4%</span>
        </div>
        <div id="chart5" class="det-chart2"></div>
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
            //myChart.clear()
            myChart.setOption({
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
                    x: 50,
                    y: 25,
                    x2: 25,
                    y2: 40
                },
                xAxis: {
                    axisTick: {
                        length: 10,
                        show: false
                    },
                    data: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01', '08/01', '09/01', '10/01', '11/01', '12/01'],
                    axisLabel: {
                        fontSize: 12,
                        fontWeight: '400',
                        color: 'rgb(210, 209, 209)'
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    splitLine: false,
                    axisLabel: {
                        fontSize: 12,
                        fontWeight: '400',
                        color: 'rgb(210, 209, 209)'
                    },
                },
                series: [
                    {
                        name: "医疗救助",
                        data: [113, 75, 1, 173, 134, 216, 50, 32, 173, 40, 173, 120],
                        type: 'line',
                        smooth: true,
                        color: '#BA55D3',
                        showSymbol: false,
                        areaStyle: {
                            color: '#BA55D3',
                            opacity: 0.25
                        }
                    },
                    {
                        name: "扶贫救灾",
                        data: [159, 67, 148, 236, 80, 17, 217, 44, 16, 163, 225, 48],
                        type: 'line',
                        smooth: true,
                        color: '#BA55D3',
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
.det-chart2 {
    width: 700px;
    height: 280px;
}

.title-text {
    font-size: 17px;
    color: rgb(210, 209, 209);
    display: flex;
}
</style>