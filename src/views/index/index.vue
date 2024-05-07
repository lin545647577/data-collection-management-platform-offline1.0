<template>
  <div class="content-box">
    <div class="system-info">
      <svg class="svg-sys">
        <use xlink:href="#icon-index-cpu"></use>
      </svg>
      <span>CPU</span>
      <span class="info">{{systemInfo.info.cpuUsage?.toFixed(2)||0}}%</span>
      <el-divider direction="vertical" />
      <svg class="svg-sys">
        <use xlink:href="#icon-index-memory"></use>
      </svg>
      <span>内存</span>
      <span class="info">{{systemInfo.info.memUsage?.toFixed(2)||0}}%</span>
      <el-divider direction="vertical" />
      <svg class="svg-sys">
        <use xlink:href="#icon-index-disk"></use>
      </svg>
      <span>闪存</span>
      <span class="info">{{systemInfo.info.cpuUsage?.toFixed(2)||0}}%</span>
      <el-divider direction="vertical" />
      <svg class="svg-sys">
        <use xlink:href="#icon-index-sd"></use>
      </svg>
      <span>SD卡</span>
      <span class="info">{{systemInfo.info.cpuUsage?.toFixed(2)||0}}%</span>
      <el-divider direction="vertical" />
      <svg class="svg-sys">
        <use :xlink:href="getVoltageStatus(systemInfo.info.voltage).icon"></use>
      </svg>
      <span>电压</span>
      <span class="info" :style="{'color':getVoltageStatus(systemInfo.info.voltage).color}">{{systemInfo.info.voltage||0}}V</span>
      <template v-for="(item,index) in systemInfo.info.simcard" :key="item.cardCCID">
        <el-divider direction="vertical" />
        <svg class="svg-sys">
          <use :xlink:href="`#icon-index-sim${index+1}`"></use>
        </svg>
        <span>SIM{{index+1}}{{ item.cardOperator=='ChinaUnicom'?'联通':'移动' }}</span>
        <span class="info-text">良好</span>
        <span class="info-tips">({{ item.signal }})</span>
      </template>
      <!-- <svg class="svg-sys">
        <use xlink:href="#icon-index-sim1"></use>
      </svg>
      <span>SIM2联通</span>
      <span class="info-text">良好</span>
      <span class="info-tips">(25)</span> -->
    </div>
    <div class="left-box">
      <div class="table-box">
        <el-table :data="tableData">
          <el-table-column type="index" label="序号" min-width="65"/>
          <el-table-column prop="name" label="要素" min-width="110"/>
          <el-table-column label="数值" min-width="110">
            <template #default="scope">{{scope.row.value||'--'}}</template>
          </el-table-column>
          <el-table-column label="状态" min-width="80">
            <template #default="scope">
              <div class="status-box">
                <svg class="svg-status">
                  <use :xlink:href="`#icon-${STATUSOBJ[scope.row.status].icon}`"></use>
                </svg>
                <span :style="{'color':STATUSOBJ[scope.row.status].color}">
                  {{ STATUSOBJ[scope.row.status].label }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="dataTime" label="时间" show-overflow-tooltip min-width="150"/>
        </el-table>
      </div>
      <div class="message-box">
        <div class="header">
          <span>报文监控</span>
          <!-- <span>已发送</span> -->
          <span class="warning">未发送</span>
        </div>
        <div class="msg">
          <el-scrollbar height="100%">
            <p v-for="(item,index) in systemInfo.msg" :key="index">{{ item }}</p>
            <!-- <p>{"func" : 0, "auth" : "a36d-yw31-yom6-87ep", "sname" : "G3501", "net" : 0 , "oper" : 1, "serial" : 123, "len" : 1234,
            "data" :  {"time" : "2022-07-05 12:00:00", avgTemp" : 25.2, "avgHum" : 102, "ws" : 3.1, "wd" : null, "pa" : 998.5 , "rn" : 4.2, "vis" : 15000}</p>
            <p>{"funddddd" : 0, "auth" : "a36d-yw31-yom6-87ep", "sname" : "G3501", "net" : 0 , "oper" : 1, "serial" : 123, "len" : 1234,
            "data" :  {"time" : "2022-07-05 12:00:00", avgTemp" : 25.2, "avgHum" : 102, "ws" : 3.1, "wd" : null, "pa" : 998.5 , "rn" : 4.2, "vis" : 15000}</p> -->
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="search">
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
      </div>
      <el-radio-group v-model="radioTime">
          <el-radio :value="1">近一小时</el-radio>
          <el-radio :value="2">近两小时</el-radio>
          <el-radio :value="3">今天</el-radio>
          <el-radio :value="4">近一天</el-radio>
        </el-radio-group>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive,onBeforeMount, onMounted } from 'vue'
import {queryMessage,queryTableData} from '@/api/index'
import {querySystemInfo} from '@/api/system' 
import {useMenuStore} from "@/stores/menu"
const menuStore=useMenuStore()
const STATUSOBJ={
  0:{label:'缺测',icon:'error',color:'#FF4D4F'},
  1:{label:'正常',icon:'normal',color:'#67C23A'},
  2:{label:'异常',icon:'exception',color:'#FAAD14'}
}
const getVoltageStatus=(val)=>{
  let data={}
  if(val>75){
    data={
      color:'#67C23A',
      icon:'#icon-index-voltage100'
    }
  }else if(val>50){
    data={
      color:'#67C23A',
      icon:'#icon-index-voltage75'
    }
  }else if(val>25){
    data={
      color:'#FAAD14',
      icon:'#icon-index-voltage50'
    }
  }else if(val>0){
    data={
      color:'#FF4D4F',
      icon:'#icon-index-voltage25'
    }
  }else{
    data={
      color:'#C9C9C9',
      icon:'#icon-index-voltage0'
    }
  }
  return data
}
const tableData = [
  {
    dataTime: '2016-05-03 10:12:28',
    name: '分钟温度',
    value: '12313.54',
    status:1
  },
  {
    dataTime: '2016-05-02 10:12:28',
    name: '分钟温度',
    value: '12313.54',
    status:2
  },
  {
    dataTime: '2016-05-04 10:12:28',
    name: '瞬时湿度',
    value: '',
    status:0
  },
  {
    dataTime: '2016-05-01 10:12:28',
    name: '瞬时湿度',
    value: '12313.54',
    status:1
  },
  {
    dataTime: '2016-05-01 10:12:28',
    name: '瞬时湿度',
    value: '4544',
    status:1
  },
  {
    dataTime: '2016-05-01 10:12:28',
    name: '瞬时湿度',
    value: '12313.54',
    status:1
  },
  {
    dataTime: '2016-05-01 10:12:28',
    name: '瞬时湿度',
    value: '12313.54',
    status:1
  },
]
const searchData =reactive({
  timeRange:['','']
})
const radioTime =ref(1)
const systemInfo =reactive({
  info:{},
  list:[],
  msg:[]
})
const initSystemInfo=()=>{
  querySystemInfo().then(res=>{
    console.log(res);
    systemInfo.info=res.payload
  })
}
const msg=ref('')
const initMessage=()=>{
  queryMessage().then(res=>{
    console.log('initMessage:',res);
    systemInfo.msg=res.payload||[]
  })
}
const initTableList=()=>{
  queryTableData().then(res=>{
    console.log('initTableList',res);
    systemInfo.list=res.payload
  })
}
onBeforeMount(()=>{
  initMessage()
  initSystemInfo()
  initTableList()
})
onMounted(()=>{
  menuStore.setActiveMenu('/data-collection/index')
})
</script>
<style scoped lang="less">
.content-box{
  min-height: 100%;
  & * {
    vertical-align: top;
  }
  .system-info{
    color: #333333;
    background-color: var(--vt-c-white);
    display: flex;
    align-items: center;
    padding: 17px 20px;
    margin-bottom: 16px;
    .svg-sys{
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    .info{
      margin-left: 5px;
      color: var(--dc-theme-blue);
    }
    .info-voltage{
      margin-left: 5px;
      color:#FAAD14 ;
    }
    .info-text{
      margin-left: 5px;
      color:#67C23A;
    }
    .info-tips{
      margin-left: 5px;
      color:#999999 ;
    }
    :deep(.el-divider--vertical){
      margin: 0 12px;
    }
  }
  .left-box{
    display: inline-block;
    width: 560px;
    margin-right: 16px;
    .table-box{
      width: 100%;
      background-color: var(--vt-c-white);
      :deep(.el-table){
        color: var(--vt-c-indigo);
        font-size: var(--dc-font-size);
        thead{
          color: var(--vt-c-indigo);
          font-size: var(--dc-font-size);
        }
        tr{
          height: 40px;
          min-height: 40px;
        }
        .el-scrollbar{
          height: 299px
        }
      }
      .status-box{
        display: flex;
        align-items: center;
        .svg-status{
          width: 14px;
          height: 14px;
          margin-right:6px ;
        }
      }
    }
    .message-box{
      width: 100%;
      margin-top: 16px;
      background-color: var(--vt-c-white);
      padding: 10px 20px 14px;
      .header{
        display: flex;
        justify-content: space-between;
        color: #666666;
        .warning{
          color: #FAAD14;;
        }
      }
      .msg{
        margin-top: 10px;
        height: 120px;
        overflow: hidden;
        overflow-y: auto;
        border: 1px solid #C9C9C9;
        border-radius: 4px;
        text-align: justify;
      }
    }
  }
  .right-box{
    display: inline-block;
    width: 560px;
    height: 100%;
    background-color: var(--vt-c-white);
    padding: 20px;
    .search{
      display: flex;
      align-items: center;
      margin-bottom:12px;
      .title{
        margin-right: 12px;
      }
      .my-picker{
        margin-right: 20px;
        width: 396px;
      }
    }
  }
}
</style>