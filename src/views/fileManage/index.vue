<template>
  <div class="content-box">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"/>
      <el-table-column type="index" label="序号" width="80"/>
      <el-table-column label="文件名" show-overflow-tooltip>
        <template #default="scope">
          <div class="name-box">
            <svg class="svg-file">
              <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
              <use xlink:href="#icon-file"></use>
            </svg>
            <span>
              {{ scope.row.address }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="name" label="大小（字节）"/>
      <el-table-column property="date" label="最后修改时间" show-overflow-tooltip/>
      <el-table-column fixed="right" label="操作" width="80">
      <template #default="scope">
        <el-button link type="primary" @click="handleDownload(scope.row)">
          下载
        </el-button>
      </template>
    </el-table-column>
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
const handleDownload=(row)=>{
  console.log(row);
}
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
  :deep(.el-table){
    color: var(--vt-c-indigo);
    font-size: var(--dc-font-size);
    & thead{
      color: var(--vt-c-indigo);
      font-size: var(--dc-font-size);
    }
  }
  .name-box{
    display: flex;
    align-items: center;
    .svg-file{
      width: 16px;
      height: 16px;
      margin-right: 12px;
    }
  }
  .page-box{
    margin-top: 20px;
    :deep(.el-pagination){
      justify-content: end
    }
  }
}
</style>