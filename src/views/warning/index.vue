<template>
  <div class="content-box">
    <div class="search-box">
      <div class="title">预警类型</div>
      <div class="my-select">
        <el-select
          v-model="searchData.alertType"
          placeholder="请选择"
        >
        <el-option label="全部预警" value=" " />
        <el-option v-for="item in ALERT_TYPE_OPTIONS" :key="item.value" :label="item.key" :value="item.value" />
        </el-select>
      </div>
      <div class="title">是否解除</div>
      <div class="my-select">
        <el-select
          v-model="searchData.completed"
          placeholder="请选择"
        >
          <el-option
            label="全部"
            value=" "
          />
          <el-option
            label="是"
            :value="true"
          />
          <el-option
            label="否"
            :value="false"
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
        <el-input style="width: 100%;" v-model="searchData.keyword" placeholder="搜索关键字" />
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
      <el-table-column property="description" label="预警内容" show-overflow-tooltip/>
      <el-table-column property="alertType" label="预警类型" width="150" show-overflow-tooltip>
        <template #default="scope">
          {{ ALERT_TYPE_OBJ[scope.row.alertType] }}
        </template>
      </el-table-column>
      <el-table-column property="startTime" label="预警时间" show-overflow-tooltip/>
      <el-table-column property="endTime" label="预警解除时间" show-overflow-tooltip/>
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
import { reactive,onBeforeMount } from 'vue'
import {queryWarningList} from '@/api/warning'
import moment from 'moment'
const ALERT_TYPE_OPTIONS=[
  {
    key:'资源预警',
    value:1
  },
  {
    key:'供电预警',
    value:2
  },
  {
    key:'通讯预警',
    value:3
  },
  {
    key:'数值预警',
    value:4
  },
]
const ALERT_TYPE_OBJ={
  1:'资源预警',
  2:'供电预警',
  3:'通讯预警',
  4:'数值预警'
}
const tableData = reactive({
  list:[],
  pageNum:1,
  pageSize:10,
  total:40
})
const searchData=reactive({
  timeRange:['',''],
  keyword:'',
  completed:' ',
  alertType:' '
})
const initList=()=>{
  const {timeRange,keyword,completed,alertType}=searchData
  const start=timeRange[0]?moment(timeRange[0]).format('yyyy-MM-DD HH:mm:ss'):''
  const end=timeRange[1]?moment(timeRange[1]).format('yyyy-MM-DD HH:mm:ss'):''
  const data={
    keyword,
    start,
    end,
    completed,
    alertType,
    pageNum:tableData.pageNum,
    pageSize:tableData.pageSize,
  }
  queryWarningList(data).then(res=>{
    const data=res.payload
    // data.content.push({ // mock
    //   "alertType": "1",
    //   "description": "前端页面假数据",
    //   "endTime": "2024-4-15 10:15:20",
    //   "id": 1,
    //   "startTime": "2024-4-15 9:15:20",
    //   "triggerValue": "string"
    // })
    tableData.total=data.totalPages
    tableData.list=data.content
  })
}
const handleSearch=()=>{
  console.log('searchData',searchData);
  initList()
}
const handleReset =()=>{
  searchData.timeRange=['','']
  searchData.keyword=''
  searchData.completed=' '
  searchData.alertType=' '
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
    tr{
      height: 40px;
      min-height: 40px;
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