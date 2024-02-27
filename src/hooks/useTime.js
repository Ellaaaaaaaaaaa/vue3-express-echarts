import { onBeforeUnmount, onMounted, ref } from "vue";
export default function () {
  var time = ref();
  function currentTime() {
    setInterval(formatDate, 500);
  }
  function formatDate() {
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
    time.value = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    //console.log(`${year}-${month}-${day} ${hour}:${minute}:${second}`)
  }
  onMounted(() => {
    currentTime();
  });
  onBeforeUnmount(() => {
    if (formatDate) {
      clearInterval(formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  });
  return { time };
}
