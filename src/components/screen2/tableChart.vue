<template>
    <div v-if="tableData && columns">
        <el-table :row-class-name="tableRowClassName" :show-header="false" :data="tableData" style="width: 100%">
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
        function tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 0 && row !== null) {
                return "";
            } else {
                return "warning-row";
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
    background-color: #09384D; // 背景透明
    border: 0px;
    color: #00ffffdf; // 修改字体颜色
    font-size: 12px;
    height: 5px;
}

// 表格斑马自定义颜色
::v-deep .el-table__row.warning-row {
    background: #063570;
}

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
  