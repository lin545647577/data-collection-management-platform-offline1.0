<template>
  <div class="content-box">
    <div class="search-box">
      <div class="title">预警类型</div>
      <div class="my-select">
        <el-select
          v-model="searchData.type"
          placeholder="请选择"
        >
          <el-option
            label="全部预警"
            value=" "
          />
        </el-select>
      </div>
      <div class="title">是否解除</div>
      <div class="my-select">
        <el-select
          v-model="searchData.solve"
          placeholder="请选择"
        >
          <el-option
            label="全部"
            value=" "
          />
          <el-option
            label="是"
            :value="1"
          />
          <el-option
            label="否"
            :value="0"
          />
        </el-select>
      </div>
    </div>
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
    </div>
    <el-table
      ref="singleTableRef"
      :data="tableData.list"
      style="width: 100%"
      :header-cell-style="{backgroundColor: '#F5F7FA'}"
    >
      <el-table-column type="index" label="序号" width="90" />
      <el-table-column property="address" label="预警内容" show-overflow-tooltip/>
      <el-table-column property="name" label="预警类型" width="150" show-overflow-tooltip/>
      <el-table-column property="date" label="预警时间" show-overflow-tooltip/>
      <el-table-column property="date" label="预警解除时间" show-overflow-tooltip/>
      <!-- <el-table-column fixed="right" label="操作" width="80">
        <template #default="scope">
          <el-button link type="primary">
            详情
          </el-button>
        </template>
      </el-table-column> -->
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
import { ref, reactive,onBeforeMount } from 'vue'
import moment from 'moment'
const tableData = reactive({
  list:[
    {
      date: '2016-05-03 10:50:20',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-03 10:50:20',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-03 10:50:20',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-03 10:50:20',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02 16:28:38',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04 16:28:38',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01 16:28:38',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-08 16:28:38',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-06 16:28:38',
      name: 'Tim',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-07 16:28:38',
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
  input:'',
  solve:' ',
  type:' '
})
const initList=()=>{
  const {timeRange,input,solve,type}=searchData
  const start=timeRange[0]?moment(timeRange[0]).format('yyyy-MM-DD HH:mm:ss'):''
  const end=timeRange[1]?moment(timeRange[1]).format('yyyy-MM-DD HH:mm:ss'):''
  const data={
    input,
    start,
    end,
    solve,
    type,
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
  searchData.solve=' '
  searchData.type=' '
  tableData.pageNum=1
  initList()
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
  min-height: 100%;
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
    display: flex;
    align-items: center;
    margin-bottom:20px;
    .my-select{
      width: 178px;
      margin-right: 20px;
      :deep(.el-select__wrapper){
        min-height: 32px;
      }
    }
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
  .page-box{
    margin-top: 20px;
    :deep(.el-pagination){
      justify-content: end
    }
  }
}
</style>