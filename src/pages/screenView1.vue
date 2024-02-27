<template>
    <div>
        <div class="container">
            <div class="combox-tittle" style="margin: 0 0 0 0;border-radius: 40px 40px 0px 0px;">
                <div style="height: 25px;margin: 10px 0px 5px 40px;border: 3px solid white;">
                    <div class="title-logo">大屏LOGO</div>
                </div>
                <div style="height: 50px;width:400px;margin-left: 20px;">
                    <div class="title-main">渐变大气模板大屏</div>
                </div>
                <span class="tittle-time">{{ time }}</span>
            </div>
            <div style="margin: 0 20px 0 20px;">
                <div class="box1">
                    <div class="combox-tittle" style="border-radius: 40px 40px 0px 0px;">
                        <div class="tittle-diy">自定义标题</div>
                    </div>
                    <div class="combox-content" style="display: flex;height: 150px;">
                        <!-- 插入图表 -->
                        <smoothChart></smoothChart>
                    </div>

                </div>
                <div class="box2" style="display:flex;gap:10px;height: 390px;">
                    <div style="width:50%;">
                        <div class="combox-tittle">
                            <div class="tittle-diy">自定义标题</div>
                        </div>
                        <div class="combox-content">
                            <detailSmoChart></detailSmoChart>
                        </div>
                    </div>
                    <div style="width:30%;">
                        <div class="combox-tittle">
                            <div class="tittle-diy">自定义标题</div>
                        </div>
                        <div class="combox-content" style="width:100%">
                            <pieChart></pieChart>
                        </div>
                    </div>
                    <div style="width:20%">
                        <div class="combox-tittle">
                            <div class="tittle-diy">自定义标题</div>
                        </div>
                        <div class="combox-content" style="width:100%">
                            <barChart></barChart>
                        </div>
                    </div>

                </div>
                <div class="box3" style="display: flex;gap:10px;height: 390px;">
                    <div style="width:28%">
                        <div class="combox-tittle">
                            <div class="tittle-diy">自定义标题</div>
                        </div>
                        <div class="combox-content" style="border-radius: 0px 0px 0px 40px;">
                            <barChartRot></barChartRot>
                        </div>
                    </div>
                    <div style="width:22%">
                        <div class="combox-tittle">
                            <div class="tittle-diy">自定义标题</div>
                        </div>
                        <div class="combox-content" style="width:100%">
                            <textScroll></textScroll>
                        </div>
                    </div>
                    <div style="width:50%">
                        <div class="combox-tittle">
                            <div class="tittle-diy">自定义标题</div>
                        </div>
                        <div class="combox-content" style="border-radius: 0px 0px 40px 0px;width:100%">
                            <textScrollDet></textScrollDet>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    </div>
</template>

<script>
import smoothChart from '@/components/screen1/smoothChart.vue';
import detailSmoChart from '@/components/screen1/detailSmoChart.vue';
import pieChart from '@/components/screen1/pieChart.vue'
import barChart from '@/components/screen1/barChart.vue'
import barChartRot from '@/components/screen1/barChartRot.vue'
import textScroll from '@/components/screen1/textScroll.vue'
import textScrollDet from '@/components/screen1/textScrollDet.vue'
import useTime from '@/hooks/useTime.js'
export default {
    components: {
        smoothChart,
        detailSmoChart,
        pieChart,
        barChart,
        barChartRot,
        textScroll,
        textScrollDet
    },
    setup() {
        var { time } = useTime()
        return { time }
    }

}
</script>

<style lang="less" scoped>
.container {
    margin: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #151A2F;
    overflow: scroll;

}

.title-logo {
    font-family: "Microsoft Yahei";
    font-size: 20px;
    color: rgb(251, 251, 251, 1);
    font-weight: bold;
    text-align: center;
    text-indent: 0px;
    line-height: 25px;
}

.title-main {
    font-family: "Microsoft Yahei";
    font-size: 26px;
    color: rgb(251, 251, 251, 1);
    font-weight: 400;
    text-align: left;
    text-indent: 0px;
    line-height: 50px;
}

.tittle-time {
    font-size: 16px;
    font-weight: 400;
    color: rgb(251, 251, 251, 1);
    text-indent: 0px;
    line-height: 50px;
    position: absolute;
    right: 50px
}

.tittle-diy {
    font-family: "Microsoft Yahei";
    font-size: 26px;
    color: rgb(251, 251, 251, 1);
    font-weight: 400;
    text-align: left;
    text-indent: 0px;
    line-height: 50px;
    position: absolute;
    left: 50px
}

.combox-tittle {
    margin-top: 10px;
    transform: rotate(0deg);
    background-image: linear-gradient(90deg, rgb(39, 46, 73), rgb(84, 89, 107));
    border-width: initial;
    border-top-color: rgb(51, 51, 51);
    border-image: initial;
    height: 50px;
    display: flex
}

.combox-content {
    margin: auto;
    transform: rotate(0deg);
    background-image: linear-gradient(90deg, rgb(29, 34, 60), rgb(70, 73, 94));
    border-width: initial;
    border-top-color: rgb(51, 51, 51);
    border-image: initial;
    border-radius: 0px;
}
</style>