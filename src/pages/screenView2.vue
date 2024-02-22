<template>
    <div>
        <div class="container">
            <div class="combox" style="height:100px;margin: 20px 20px 10px 20px;display:flex;">
                <div style="height: 80px;width:400px;margin: 15px 20px 0px 20px;">
                    <div class="title-main">暗夜绿色大数据统计大屏</div>
                    <div class="title-bottom">Dark-green big data statistic screen</div>
                </div>
                <div style="width: 750px;">
                    <div class="line" style="margin-top: 15px;"></div>
                    <div class="line" style="margin-bottom:15px;margin-top: 65px;"></div>
                </div>
                <div>
                    <div style="height: 35px;margin: 15px 10px 5px 25px;border: 3px solid #FFFFFF99;">
                        <div class="title-logo">大屏LOGO</div>
                    </div>
                    <span class="tittle-time">{{ time }}</span>
                </div>
            </div>
            <div style="height: 700px;display: flex;margin: 15px 20px 10px 20px;gap:10px">
                <div class="combox" style="width: 40%;">
                    <div style="margin: 30px 30px 10px 30px;">
                        <div class="line"></div>
                        <div style="color: #FFFFFFE6;font-size: 18px;line-height: 35px;">自定义标题</div>
                        <div style="color: #FFFFFF4D;font-size: 12px;line-height: 20px;">custom tittle</div>
                        <div class="line"></div>
                        <leftChart></leftChart>
                    </div>

                </div>
                <div class="combox" style="width: 50%;">
                    <mapChart></mapChart>
                </div>
                <div class="combox" style="width: 10%;">
                    <rightChart></rightChart>
                </div>
            </div>

            <div style="margin: 15px 20px 10px 20px;height: 200px;">
                <bottomChart></bottomChart>
            </div>
        </div>

    </div>
</template>

<script>
import { inject } from "vue"
import leftChart from "@/components/screen2/leftChart.vue"
import bottomChart from "@/components/screen2/bottomChart.vue"
import mapChart from "@/components/screen2/mapChart.vue"
import rightChart from "@/components/screen2/rightChart.vue"
export default {
    components: {
        leftChart,
        mapChart,
        bottomChart,
        rightChart
    },
    data() {
        return {
            time: "",
        }
    },
    methods: {
        currentTime() {
            setInterval(this.formatDate, 500);
        },
        formatDate() {
            let date = new Date();
            let year = date.getFullYear(); // 年
            let month = date.getMonth() + 1; // 月
            let day = date.getDate(); // 日
            let hour = date.getHours(); // 时
            hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
            let minute = date.getMinutes(); // 分
            minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
            let second = date.getSeconds(); // 秒
            second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
            this.time = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
        }
    },
    mounted() {
        this.currentTime();
    },
    beforeUnmount() {
        if (this.formatDate) {
            clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
        }
    },
    setup() {
        let $echarts = inject("echarts")
        let $http = inject("axios")
        console.log($echarts)
        console.log($http)
    }

}
</script>

<style lang="less" scoped>
.container {
    margin: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #061B26;
    overflow: scroll;

}

.combox {
    transform: rotate(0deg);
    background-color: #04273A;
    border-width: initial;
    border-top-color: rgb(51, 51, 51);
    border-image: initial;
    border-radius: 0px;
}

.title-logo {
    font-family: "Microsoft Yahei";
    font-size: 30px;
    color: #FFFFFF99;
    font-weight: bold;
    text-align: center;
    text-indent: 0px;
    line-height: 35px;
}

.title-main {
    font-family: "Microsoft Yahei";
    font-size: 35px;
    color: rgb(251, 251, 251, 1);
    font-weight: 1000;
    text-align: left;
    text-indent: 0px;
    line-height: 50px;
}

.title-bottom {
    font-family: "Microsoft Yahei";
    font-size: 15px;
    color: rgb(251, 251, 251, 1);
    font-weight: 400;
    text-align: left;
    text-indent: 0px;
    line-height: 15px;
}

.tittle-time {
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF99;
    text-indent: 0px;
    line-height: 15px;
    position: absolute;
    right: 15px
}

.line {
    height: 2px;
    background-color: #0B3B51;
}
</style>