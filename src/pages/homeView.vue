<template>
    <div>
        <el-container>
            <el-header>
                <div class="title">可视化数据模板</div>

                <el-dropdown @command="doCommand" trigger="click">
                    <span class="el-dropdown-link"> {{ store.state.userName }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <!--点击时触发doCommand方法并传入logout-->
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-container style="height:1000px;">
                <el-aside width="200px">Aside</el-aside>
                <el-main>
                    <el-row>
                        <el-col :span="8" v-for="(item, index) in 2" :key="item" :offset="index > 0 ? 2 : 0">
                            <el-card :body-style="{ padding: '1px' }" shadow="hover">
                                <img :src="`/img/bigscreen${index}.png`" alt="" class="image">
                                <div>
                                    <span>模板{{ index + 1 }}</span>
                                    <div class="bottom clearfix">
                                        <el-button @click="$router.push('screenView' + (index + 1))" type="text"
                                            class="button">查看</el-button>
                                        <el-button @click="$router.push('screenView' + (index + 1))" type="text"
                                            class="button">编辑</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
export default {
    setup() {
        const getSrc = (index) => {
            //return new URL(`/src/assets/bigscreen${index}.png`, import.meta.url).href;
            var url = `./src/assets/bigscreen${index}.png`
            return url;
        };
        const router = useRouter()
        const store = useStore()
        async function doCommand(e) {
            if (e === "logout") {
                localStorage.clear();
                router.replace({ name: 'loginView' })
            }
        }

        return { getSrc, doCommand, store, ArrowDown }
    }


}
</script>

<style lang="less" scoped>
.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: #E9EEF3 2px solid;
}

.title {
    font-family: "Microsoft Yahei";
    font-size: 26px;
    color: black;
    font-weight: 400;
    text-align: left;
    text-indent: 0px;
    line-height: 50px;
}

.el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 200px;
    border-right: #E9EEF3 2px solid;
}

.el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
}

.el-container {
    height: 100vh;
}

.el-menu-vertical-demo {
    border: none;
}

.bottom {
    margin-top: 1px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: flex;
    content: "";
}

.clearfix:after {
    clear: both
}

.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    font-size: 18px;
}
</style>