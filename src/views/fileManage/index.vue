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
        <el-input style="width: 100%;" v-model="searchData.keyword" placeholder="搜索关键字" />
      </div>
      <el-button type="primary" plain @click="handleSearch">查询</el-button>
      <el-button plain @click="handleReset">重置</el-button>
      <el-button class="btn" type="primary" :disabled="multipleSelection.length<2" @click="handleMulDownload">批量下载</el-button>
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
          <div :class="['name-box',scope.row.type==1?'cursor-name':'']" @click="handleClickFolder(scope.row)">
            <svg class="svg-file">
              <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
              <use v-if="scope.row.type==1" xlink:href="#icon-folder"></use>
              <use v-else xlink:href="#icon-file"></use>
            </svg>
            <span>
              {{ scope.row.name }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="length" label="大小（字节）"/>
      <el-table-column property="lastModified" label="最后修改时间" show-overflow-tooltip>
        <template #default="scope">
          {{ scope.row.lastModified ? moment(scope.row.lastModified).format('yyyy-MM-DD HH:mm:ss'):'' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
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
import { ref, reactive, onBeforeMount, onBeforeUnmount } from 'vue'
import {queryFileList,download,mulDownload} from '@/api/file'
import { saveAs } from 'file-saver'
import moment from 'moment'
import { useFileManageStore } from '@/stores/fileManage'
const {setShowCrumb,addCrumbList,delCrumbItem} =useFileManageStore()
import eventBus from '@/utils/bus'

const tableData = reactive({
  list:[],
  pageNum:1,
  pageSize:10,
  total:0
})
const searchData=reactive({
  timeRange:['',''],
  keyword:'',
  path:'/'
})
const ttt=(val)=>{
  console.log(val);
}
const initList=()=>{
  const {timeRange,keyword,path}=searchData
  const start=timeRange[0]?moment(timeRange[0]).format('yyyy-MM-DD HH:mm:ss'):''
  const end=timeRange[1]?moment(timeRange[1]).format('yyyy-MM-DD HH:mm:ss'):''
  const data={
    keyword,
    start,
    end,
    pageNum:tableData.pageNum,
    pageSize:tableData.pageSize,
    path
  }
  queryFileList(data).then(res=>{
    const tempData=res.payload;
    tableData.list=tempData.content
    tableData.total=tempData.total
  })
}
const handleSearch=()=>{
  // console.log('searchData',searchData);
  initList()
}
const handleClickFolder=(row)=>{
  if(row.type==2) return
  searchData.path=row.path
  searchData.timeRange=['','']
  searchData.keyword=''
  tableData.pageNum=1
  addCrumbList({path:row.path,name:row.name})
  initList()
}
const handleReset =()=>{
  searchData.timeRange=['','']
  searchData.keyword=''
  tableData.pageNum=1
  // searchData.path='/'
  // delCrumbItem()
  initList()
}
const multipleTableRef = ref()
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const handleMulDownload=()=>{
  const list=[]
  multipleSelection.value.forEach(item=>list.push(item.path))
  mulDownload(list).then(res=>{
    saveAs(res.data, `文件压缩包.zip`)
    ElMessage.success('下载成功')
  })
}
const handleDownload=(row)=>{
  download(row.path).then(res=>{
    saveAs(res.data,row.type==1?`${row.name}.zip`:row.name)
    ElMessage.success('下载成功')
  })
}
const handleSizeChange = (val) => {
  initList();
}
const handleCurrentChange = (val) => {
  initList()
}
eventBus.on('backFile',(path)=>{
  console.log(path);
  searchData.path=path
  handleReset()
})
onBeforeMount(()=>{
  setShowCrumb(true)
  initList()
})
onBeforeUnmount(()=>{
  setShowCrumb(false)
  delCrumbItem()
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
  .cursor-name{
    cursor: pointer;
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