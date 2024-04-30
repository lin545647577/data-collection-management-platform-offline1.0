<template>
  <div class="content-box">
    <div class="import-box">
      <el-button type="primary" plain>导入配置文件</el-button>
    </div>
    <el-table :data="tableData.list" :header-cell-style="{backgroundColor: '#F5F7FA'}">
      <el-table-column prop="version" label="配置文件"  show-overflow-tooltip/>
      <el-table-column prop="ctime" label="创建时间"  show-overflow-tooltip/>
      <el-table-column prop="mtime" label="修改时间"  show-overflow-tooltip/>
      <el-table-column prop="activeTime" label="激活时间"  show-overflow-tooltip/>
      <el-table-column prop="modifyBy" label="修改人"  show-overflow-tooltip/>
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button link type="primary" :disabled="!!scope.row.status" @click="showActivateDia(scope.row)">
            激活配置
          </el-button>
          <el-button link type="primary" @click="showRemark(scope.row)">查看备注</el-button>
          <el-button link type="primary" :disabled="!!scope.row.status" @click="handleDownload(scope.row.id)">下载</el-button>
          <el-button link type="danger" :disabled="!!scope.row.status" @click="showDeleteDia(scope.row)">删除</el-button>
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
    <div class="dia-408">
      <el-dialog v-model="activateDia" title="激活配置文件" center :before-close="handleClose">
        <div class="dia-content">
          <svg class="svg-warning">
            <use xlink:href="#icon-warning"></use>
          </svg>
          <span>激活配置文件将会重启采集程序，统计值将会清零，请确认是否激活？</span>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="activateDia = false">取消</el-button>
            <el-button type="primary" @click="handleActivate">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog v-model="deleteDia" title="提示" center :before-close="handleClose">
        <div class="dia-content flex-center">
          <svg class="svg-warning">
            <use xlink:href="#icon-warning"></use>
          </svg>
          <span>删除文件将无法恢复，请确认是否删除</span>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="activateDia = false">取消</el-button>
            <el-button type="primary" @click="handleDelete">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="dia-592">
      <el-dialog v-model="remarkDia" title="备注记录" center :before-close="handleClose">
        <div class="dia-content">
          <el-descriptions
            :column="1"
            size="large"
            border
          >
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  配置文件
                </div>
              </template>
              {{choosedRow.version}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  备注
                </div>
              </template>
              {{choosedRow.noteRecords}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  修改时间
                </div>
              </template>
              {{choosedRow.mtime}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  修改人
                </div>
              </template>
              {{choosedRow.modifyBy}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { ElMessage  } from 'element-plus'
import {queryConfigList,activateConfig,downloadConfig,deleteConfig} from '@/api/config'
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const tableData = reactive({
  list:[],
  pageNum:1,
  pageSize:10,
  total:0
})
const initList=()=>{
  queryConfigList({pageNum:tableData.pageNum,pageSize:tableData.pageSize}).then(res=>{
    const data=res.payload
    // data.content.push({
    //   activeTime:	'2024-4-23',
    //   createBy	:"张三",
    //   ctime	:'2024-4-20',
    //   filePath	:'c:npm/',
    //   id:	999,
    //   modifyBy	:'李四',
    //   mtime	:'2024-4-24',
    //   noteRecords:	'test',
    //   status:	0,
    //   version:	're4.1.10'
    // })
    tableData.total=data.totalPages
    tableData.list=data.content
  })
}
const choosedRow=ref({})
// 激活
const activateDia=ref(false)
const showActivateDia = (row) => {
  choosedRow.value=row
  activateDia.value=true
}
const handleActivate=()=>{
  activateConfig(choosedRow.value.id).then(res=>{
    activateDia.value=false
    ElMessage.success('激活成功')
  })
}
// 查看备注
const remarkDia=ref(false)
const showRemark=(row)=>{
  choosedRow.value=row
  // console.log('showRemark:',row);
  remarkDia.value=true
}
// 删除
const deleteDia=ref(false)
const showDeleteDia=(row)=>{
  choosedRow.value=row
  // console.log('Delete:',row);
  deleteDia.value=true
}
const handleDelete=()=>{
  deleteConfig(choosedRow.value.id).then(res=>{
    ElMessage.success('删除成功')
    deleteDia.value=false
  })
}
// 下载
const handleDownload=(id)=>{
  downloadConfig(id).then(res=>{
    // console.log('handleDownload',res);
    ElMessage.success('下载成功')
  })
}
// 关闭弹框
const handleClose=()=>{
  deleteDia.value=false
  remarkDia.value=false;
  activateDia.value=false;
  choosedRow.value={};
}
onBeforeMount(()=>{
  initList()
})
</script>
<style scoped lang="less">
.content-box{
  :deep(.el-button){
    height: 32px;
    line-height: 32px;
  }
  padding: 20px 24px;
  background-color: #ffffff;
  :deep(.el-table){
    font-size: var(--dc-font-size);
    thead {
      color:var(--dc-color);
    }
    .el-button.is-link.is-disabled{
      color:#999999 ;
    }
  }
  .page-box{
    margin-top: 20px;
    :deep(.el-pagination){
      justify-content: end
    }
  }
  .import-box{
    margin-bottom: 20px;
  }
  .dia-408{
    :deep(.el-dialog){
      width: 408px;
      padding: 24px 20px;
    }
    .dia-content{
      display: flex;
      align-items: center;
      .svg-warning{
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
    }
    .flex-center{
      justify-content: center;
    }
  }
  .dia-592{
    :deep(.el-dialog){
      width: 592px;
      padding: 24px 20px;
    }
  }
  .dia-592,.dia-408{
    :deep(.el-dialog__headerbtn){
      font-size: 20px;
      right: 15px;
      top: 15px;
      .el-dialog__close{
        color:#323233 ;
      }
    }
  }
}
</style>