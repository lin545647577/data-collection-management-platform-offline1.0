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
      <template v-for="item in systemInfo.info.fileSystem" :key="item.name">
        <template v-if="item.name=='/'">
          <svg class="svg-sys">
            <use xlink:href="#icon-index-disk"></use>
          </svg>
          <span>闪存</span>
          <span class="info">{{item.usage?.toFixed(2)||0}}%</span>
          <el-divider direction="vertical" />
        </template>
        <!-- <template v-else>
          <svg class="svg-sys">
            <use xlink:href="#icon-index-sd"></use>
          </svg>
          <span>SD卡</span>
          <span class="info">{{item.usage?.toFixed(2)||0}}%</span>
          <el-divider direction="vertical" />
        </template> -->
      </template>
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
        <span>SIM{{index+1}}{{ getSimCardType(item.cardOperator) }}</span>
        <span class="info-text">良好</span>
        <span class="info-tips">({{ item.signal }})</span>
      </template>
    </div>
    <div class="left-box">
      <div class="table-box">
        <svg class="svg-element" @click="handleShowElement">
          <use xlink:href="#icon-index-element"></use>
        </svg>
        <el-table :data="systemInfo.list" @row-click="handleClickRow" :row-class-name="handleActive">
          <el-table-column type="index" label="序号" min-width="65"/>
          <el-table-column prop="name" label="要素" min-width="140"/>
          <el-table-column label="数值" min-width="80">
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
          <span>已发送</span>
          <!-- <span class="warning">未发送</span> -->
        </div>
        <div class="msg">
          <el-scrollbar height="100%">
            <p class="content-msg" v-for="(item,index) in systemInfo.msg" :key="index">
              <span>{{ item.dateTime }}</span> : <span>{{ item.msg }}</span>
            </p>
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
            @change="changePicker"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :disabled-date="(data)=>data>new Date()"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 100%;"
          />
        </div>
      </div>
      <div class="radio-box">
        <el-radio-group v-model="searchData.radioTime" @change="changeRadio">
          <el-radio :value="1">近一小时</el-radio>
          <el-radio :value="2">近两小时</el-radio>
          <el-radio :value="3">今天</el-radio>
          <el-radio :value="4">近一天</el-radio>
        </el-radio-group>
      </div>
      <div class="echart-box">
        <el-scrollbar>
          <div v-for="(item,index) in systemInfo.echartData" :key="item.elementId" :id="`elEchart${index}`" class="temperature-echart"></div>
        </el-scrollbar>
      </div>
    </div>
    <el-dialog v-model="elementShow" title="自定义要素展示" center @before-colse="handleCloseEle">
      <div class="dia-box">
        <div class="dia-type">
          <span>展示类型：</span>
          <el-radio-group v-model="showType">
            <el-radio :value="1" size="large">要素展示</el-radio>
            <!-- <el-radio :value="2" size="large">标签展示</el-radio> -->
          </el-radio-group>
        </div>
        <div>
          <el-tree
            v-if="showType==1"
            ref="treeElement"
            :data="systemInfo.elementTree"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="treeProps"
          />
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="elementShow = false">取消</el-button>
          <el-button type="primary" @click="handleEleItem">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive,onBeforeMount, onMounted, onBeforeUnmount, watch } from 'vue'
import {queryMessage,queryTableData,queryElements,queryHistoryList} from '@/api/index'
import { ElMessage  } from 'element-plus'
import {querySystemInfo} from '@/api/system' 
import {useStationStore} from '@/stores/station'
import * as echarts from 'echarts';
import {useMenuStore} from "@/stores/menu"
import moment from 'moment'
const menuStore=useMenuStore()
const {setTimeOfDu} =useStationStore()
const STATUSOBJ={
  0:{label:'缺测',icon:'error',color:'#FF4D4F'},
  1:{label:'正常',icon:'normal',color:'#67C23A'},
  2:{label:'异常',icon:'exception',color:'#FAAD14'}
}
const showType=ref(1)
const getSimCardType=(val)=>{
  const typeObj={
    ChinaUnicom:'联通',
    ChinaMobile:'移动'
  }
  return typeObj[val]||'电信'
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
  // return data
  return { // 假数据暂时写死
      color:'#67C23A',
      icon:'#icon-index-voltage100'
    }
}
const searchData =reactive({
  timeRange:['',''],
  radioTime:1,
  start:moment().subtract(1,'hour').format('yyyy-MM-DD hh:mm:ss'),
  end:moment().format('yyyy-MM-DD hh:mm:ss'),
  elementIds:[],
  echartEleIds:[]
})
const changePicker=()=>{
  searchData.radioTime=0
  searchData.start=searchData.timeRange[0]
  searchData.end=searchData.timeRange[1]
  initHistory()
}
const changeRadio=(val)=>{
  // console.log(val);
  searchData.timeRange=['','']
  if(searchData.radioTime==1){
    searchData.start=moment().subtract(1,'hour').format('yyyy-MM-DD hh:mm:ss'),
    searchData.end=moment().format('yyyy-MM-DD hh:mm:ss')
  }else if(searchData.radioTime==2){
    searchData.start=moment().subtract(2,'hour').format('yyyy-MM-DD hh:mm:ss'),
    searchData.end=moment().format('yyyy-MM-DD hh:mm:ss')
  }else if(searchData.radioTime==3){
    searchData.start=`${moment().format('yyyy-MM-DD')} 00:00:00`,
    searchData.end=moment().format('yyyy-MM-DD hh:mm:ss')
  }else if(searchData.radioTime==4){
    searchData.start=moment().subtract(1,'day').format('yyyy-MM-DD hh:mm:ss'),
    searchData.end=moment().format('yyyy-MM-DD hh:mm:ss')
  }
  initHistory()
}
const setTreeDisabled=(data)=>{
  // console.log(data);
  if(data.properties && !data.properties.IS_VISIBLE) return true
  return false
}
const treeElement=ref()
const treeProps={
  children: 'children',
  label: 'label',
  disabled:setTreeDisabled
}
const systemInfo =reactive({
  info:{},
  list:[],
  msg:[],
  elementTree:[],
  echartData:[],
  tempMultipleSelection:[]
})
const initElementTree=()=>{
  queryElements().then(res=>{
    // console.log('initElementTree:',res);
    systemInfo.elementTree=res.payload?.children||[]
  })
}
const handleEleItem=()=>{
  // console.log(treeElement.value.getCheckedKeys(true))
  searchData.echartEleIds=[]
  systemInfo.echartData=[]
  isFirstTime.value=true
  searchData.elementIds=treeElement.value.getCheckedKeys(true)
  initTableList()
  elementShow.value=false
}
const elementShow=ref(false)
const handleShowElement=()=>{
  elementShow.value=true
}
const handleCloseEle=()=>{
  elementShow.value=false
}
const initSystemInfo=()=>{
  querySystemInfo().then(res=>{
    // console.log('initSystemInfo',res.payload);
    setTimeOfDu(res.payload.systemUptime)
    systemInfo.info=res.payload
    systemInfo.info.voltage=12.3  // 假数据暂时写死
  })
}
const initMessage=()=>{
  queryMessage().then(res=>{
    // console.log('initMessage:',res);
    systemInfo.msg=res.payload||[]
  })
}
const addEchartItem=(item)=>{
  searchData.echartEleIds.push(item.elementId)
  systemInfo.echartData.push({
    elementId:item.elementId,
    name:item.name,
    valueList:[],
    timeList:[]
  })
  // console.log('addEchartItem',{
  //   echartData:systemInfo.echartData,
  //   echartEleIds:searchData.echartEleIds
  // });
}
const delEchartItem=(item)=>{
  const index=searchData.echartEleIds.findIndex(i=>i==item.elementId)
  searchData.echartEleIds.splice(index,1)
  systemInfo.echartData.splice(index,1)
  // console.log('delEchartItem',{
  //   echartData:systemInfo.echartData,
  //   echartEleIds:searchData.echartEleIds
  // });
}
const handleClickRow=(row)=>{
  // console.log('handleClickRow',row);
  row.active=!row.active
  if(row.active){
    addEchartItem(row)
  }else{
    // row.active=true
    // if(searchData.echartEleIds.length==1) {
    //   ElMessage.warning('查看元素至少有一个')
    //   return
    // }
    delEchartItem(row)
  }
}
const handleActive = (row)=>{
  if(row.row.active) return 'is-active'
}
const isFirstTime=ref(true)
import {debounce} from '@/utils/util'
const initTableList=()=>{
  queryTableData(searchData.elementIds).then(res=>{
    // console.log('initTableList',res);
    const tempList=res.payload
    tempList.forEach((item,index) => {
      if(!item.value){ // 赋值状态
        item.status=0
      }else if(!item.maxThreshold&&!item.minThreshold){
        item.status=1
      }else if(item.value>item.maxThreshold||item.value<item.minThreshold){
        item.status=2
      }else{
        item.status=1
      }
      item.active=false
      if(searchData.echartEleIds.length && !isFirstTime.value){
        if(searchData.echartEleIds.includes(item.elementId)){
          item.active=true
          debounce(()=>initHistory(),100)()
        }
      }else{
        if(index<2) {
          item.active=true
          addEchartItem(item)
        }
      }
    });
    isFirstTime.value=false
    systemInfo.list=tempList
  })
}
const drawEacht=(eOption,index)=>{
  echarts.dispose(document.getElementById(`elEchart${index}`)) // 卸载已有的图表，以免重复init报错
  const temEchart=echarts.init(document.getElementById(`elEchart${index}`))
  const option = {
    title:{
      text:eOption.name,
      left:'center',
      textStyle:{
        color:"#333333",
        fontWeight : 'bolder',
        fontSize : 14,
      }
    },
    tooltip: {// 自定义悬浮标签tabs
      trigger: 'axis',
      formatter: (arr) => {
        const val = arr[0];
        let str =`${val.marker}${val.name}<span style="margin-left:20px;display: inline-block;"></span> ${val.value}`
        return str;
      },
      padding:[6,12],
      textStyle:{
        color:'#646566',
        fontSize:12
      },
      axisPointer: {
        type: 'cross'
      }
    },
    grid:{
      left: '7%' ,
      top: '20%' ,
      right: '5%' ,
      bottom: '15%' ,
    },
    xAxis: {
      type: 'category',
      data: eOption.timeList
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data:eOption.valueList,
        type: 'line'
      }
    ]
  };
  temEchart.setOption(option)
}
const initData=()=>{
  initMessage()
  initSystemInfo()
  initTableList()
}
watch(
  ()=>searchData.echartEleIds.length,
  (length)=>{
    if(length) initHistory()
  }
)
const initHistory=()=>{
  queryHistoryList({
    elements:searchData.echartEleIds,
    start:searchData.start,
    end:searchData.end
  }).then(res=>{
    if(!res.payload.data){
      systemInfo.echartData.forEach(item=>{
        item.valueList=[0,0]
        item.timeList=[searchData.start,searchData.end]
      })
      systemInfo.echartData.forEach(((item,index)=>drawEacht(item,index)))
      return
    }
    const tempData=res.payload.data||[]
    // console.log('systemInfo.echartData:',systemInfo.echartData);
    systemInfo.echartData.forEach((item)=>{
      item.valueList=[]
      item.timeList=[]
      if(tempData[item.name].length){
        tempData[item.name].forEach(i=>{
          item.valueList.push(i.value)
          item.timeList.push(moment(i.time).format('HH:mm'))
        })
      }else{
        item.valueList=[0,0]
        item.timeList=[searchData.start,searchData.end]
      }
    })
    systemInfo.echartData.forEach(((item,index)=>drawEacht(item,index)))
  })
}
let timer=null
const setTimer=()=>{
  timer=setInterval(() => {
    initData()
  },60000);// 首页自动刷新频率60秒一次
}
onBeforeMount(()=>{
  initData()
  setTimer()
  initElementTree()
})
onMounted(()=>{
  menuStore.setActiveMenu('/data-collection/index')
})
onBeforeUnmount(()=>{
  clearInterval(timer)
  timer=null
})
</script>
<style scoped lang="less">
.content-box{
  min-height: 100%;
  & * {
    vertical-align: top;
  }
  :deep(.el-button){
    height: 32px;
    line-height: 32px;
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
      position: relative;
      width: 100%;
      background-color: var(--vt-c-white);
      .svg-element{
        position: absolute;
        width: 20px;
        height: 20px;
        z-index: 5;
        top: 10px;
        right: 20px;
        cursor: pointer;
      }
      :deep(.el-table){
        .is-active{
          background-color: #F5F7FA;
        }
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
        .cell{
          line-height: 25px;
        }
        .el-scrollbar{
          height: 300px
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
        height: 140px;
        overflow: hidden;
        overflow-y: auto;
        border: 1px solid #C9C9C9;
        border-radius: 4px;
        text-align: justify;
        .content-msg{
          word-wrap: break-word;
        }
        p{
          margin: 0 5px;
        }
      }
    }
  }
  .right-box{
    display: inline-block;
    width: 560px;
    height: 100%;
    background-color: var(--vt-c-white);
    // padding: 20px;
    // padding-bottom: 10px;
    .radio-box{
      margin: 0 20px 12px 20px;
    }
    .search{
      margin: 20px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      margin-bottom:12px;
      .title{
        margin-right: 12px;
      }
      .my-picker{
        margin-right: 20px;
        width: 396px;
        :deep(.el-range-editor.el-input__wrapper){
          height: 32px;
        }
      }
    }
    .echart-box{
      :deep(.el-scrollbar){
        height: 440px;
      }
      .temperature-echart{
        width:100% ;
        height:220px ;
        margin: 0 auto;
      }
    }
  }
  :deep(.el-dialog){
    width:408px ;
    .el-dialog__title{
      font-size: 16px;
    }
    .el-tree-node__content{
      height: 32px;
    }
  }
  .dia-box{
    .dia-type{
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      >span{
        margin-right: 12px;
      }
      :deep(.el-radio__label){
        font-size: var(--dc-font-size);
      }
    }
  }
}
</style>