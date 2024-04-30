<template>
  <div class="content-box">
    <div class="search-box">
      <div class="title">查询时间</div>
      <div class="my-picker">
        <el-date-picker
          v-model="searchData.timeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :disabled-date="(data)=>data>new Date()"
          style="width: 100%;"
        />
      </div>
      <div class="my-input">
        <el-input style="width: 100%;" v-model="searchData.input" placeholder="搜索关键字" />
      </div>
      <el-button type="primary" plain @click="handleSearch">查询</el-button>
      <el-button plain @click="handleReset">重置</el-button>
      <el-button class="btn" type="primary" :disabled="multipleSelection.length<2">批量下载</el-button>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData.list"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :header-cell-style="{backgroundColor: '#F5F7FA'}"
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
        v-model:current-page="tableData.pageNum"
        v-model:page-size="tableData.pageSize"
        :page-sizes="[5, 10, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import moment from 'moment'
const tableData = reactive({
  list:[
    {
      date: '2016-05-03',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-03',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-03',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
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
  ],
  pageNum:1,
  pageSize:10,
  total:40
})
const searchData=reactive({
  timeRange:['',''],
  input:''
})
const initList=()=>{
  const {timeRange,input}=searchData
  const start=timeRange[0]?moment(timeRange[0]).format('yyyy-MM-DD HH:mm:ss'):''
  const end=timeRange[1]?moment(timeRange[1]).format('yyyy-MM-DD HH:mm:ss'):''
  const data={
    input,
    start,
    end,
    pageNum:tableData.pageNum,
    pageSize:tableData.pageSize,
  }
  console.log('initList',data);
}
const handleSearch=()=>{
  console.log('searchData',searchData);
  initList()
}
const handleReset =()=>{
  searchData.timeRange=['','']
  searchData.input=''
  tableData.pageNum=1
  initList()
}
const multipleTableRef = ref()
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
  console.log(multipleSelection);
}
const handleDownload=(row)=>{
  console.log(row);
}
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  initList();
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  initList()
}
onBeforeMount(()=>{
  initList()
})
</script>
<style scoped lang="less">
.content-box{
  padding: 20px 24px;
  background-color: var(--vt-c-white);
  :deep(.el-button){
    height: 32px;
    line-height: 32px;
  }
  :deep(.el-input__inner){
    height: 32px;
  }
  :deep(.el-date-editor.el-input__wrapper){
    height: 32px;
  }
  .search-box{
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom:20px;
    .title{
      margin-right: 12px;
    }
    .my-picker{
      margin-right: 20px;
      width: 396px;
    }
    .my-input{
      margin-right:24px ;
      width: 240px;
    }
    .btn{
      position: absolute;
      right: 0;
    }
    :deep(.el-button.is-disabled){
      background-color: #C9C9C9;
      border-color: #C9C9C9;
    }
  }
  :deep(.el-table){
    color: var(--vt-c-indigo);
    font-size: var(--dc-font-size);
    thead{
      color: var(--vt-c-indigo);
      font-size: var(--dc-font-size);
    }
    .el-scrollbar__thumb{
      display: none;
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