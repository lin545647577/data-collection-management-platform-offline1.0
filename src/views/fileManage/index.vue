<template>
  <div class="content-box">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"/>
      <el-table-column type="index" width="50"/>
      <el-table-column label="Date">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" label="Name"/>
      <el-table-column property="address" label="Address" show-overflow-tooltip />
    </el-table>
    <div class="page-box">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tim',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tim',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tim',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tim',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tim',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tim',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tim',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const currentPage=ref(1)
const pageSize=ref(10)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>
<style scoped lang="less">
.content-box{
  padding: 20px 24px;
  background-color: var(--vt-c-white);
  .page-box{
    margin-top: 20px;
    :deep(.el-pagination){
      justify-content: end
    }
  }
}
</style>