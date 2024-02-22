<template>
    <div v-if="tableData && columns">
        <el-table :row-class-name="tableRowClassName" :show-header="false" :data="tableData"
            style="width: 100%;height: 200px;">
            <el-table-column :prop="item.prop" :label="item.label" v-for="(item, index) in columns" :key="index">
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
import { inject, onMounted, reactive, toRefs } from "vue"

export default {
    setup() {
        let $http = inject("axios")
        let state = reactive({
            tableData: [],
            columns: []
        })

        async function getTable() {
            try {
                let response = await $http({ url: "text/data" })
                state.tableData = response.data.data.tableData
                state.columns = response.data.data.columns
                console.log("table", state.tableData)
                console.log("columns", state.columns)
            } catch (error) {
                console.error("Error fetching table data:", error)
            }
        }
        function tableRowClassName({ rowIndex }) {
            if (rowIndex % 2 == 0) {
                return "even";
            } else {
                return "odd";
            }
        }
        onMounted(() => {
            getTable()
        })

        return {
            ...toRefs(state),
            getTable,
            tableRowClassName
        }
    }
}
</script>
  
<style lang="less" scoped>
// 表格内背景颜色
::v-deep .el-table tr,
::v-deep .el-table td {
    //background-color: #09384D; // 背景透明
    --el-table-border: 0px; //去除间隔线
    color: #00ffffdf; // 修改字体颜色
    font-size: 12px;
    height: 5px;
}

// 去除底部table有白线
:deep(.el-table__inner-wrapper::before) {
    height: 0;
}

// 表格斑马自定义颜色
::v-deep .el-table__row.odd {
    background: #235d77;
}

::v-deep .el-table__row.even {
    background: #09384D;
}

//字体
::v-deep .el-table__body tr,
::v-deep .el-table__body td {
    padding: 0;
    height: 40px;
    text-align: center;
}

::v-deep .el-table tbody tr {
    pointer-events: none;
}

.el-table__body-wrapper::-webkit-scrollbar {
    width: 30px;
    height: 30px;
}

.el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #dddee0;
    border-radius: 8px;

}
</style>
  