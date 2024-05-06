<template>
  <div class="content-box">
    <div class="system-info">
      <svg class="svg-sys">
        <use xlink:href="#icon-index-cpu"></use>
      </svg>
      <span>CPU</span>
      <span class="info">60%</span>
      <el-divider direction="vertical" />
      <svg class="svg-sys">
        <use xlink:href="#icon-index-memory"></use>
      </svg>
      <span>内存</span>
      <span class="info">60%</span>
      <el-divider direction="vertical" />
      <svg class="svg-sys">
        <use xlink:href="#icon-index-disk"></use>
      </svg>
      <span>闪存</span>
      <span class="info">60%</span>
      <el-divider direction="vertical" />
      <svg class="svg-sys">
        <use xlink:href="#icon-index-sd"></use>
      </svg>
      <span>SD卡</span>
      <span class="info">6%</span>
      <el-divider direction="vertical" />
      <svg class="svg-sys">
        <use xlink:href="#icon-index-voltage"></use>
      </svg>
      <span>电压</span>
      <span class="info-voltage">11.2V</span>
      <el-divider direction="vertical" />
      <svg class="svg-sys">
        <use xlink:href="#icon-index-sim1"></use>
      </svg>
      <span>SIM1移动</span>
      <span class="info-text">良好</span>
      <span class="info-tips">(25)</span>
      <el-divider direction="vertical" />
      <svg class="svg-sys">
        <use xlink:href="#icon-index-sim1"></use>
      </svg>
      <span>SIM2联通</span>
      <span class="info-text">良好</span>
      <span class="info-tips">(25)</span>
    </div>
    <div class="left-box">
      <div class="table-box">

      </div>
      <div class="message-box">
        <div class="header">
          <span>报文监控</span>
          <!-- <span>已发送</span> -->
          <span class="warning">未发送</span>
        </div>
        <div class="msg">
          {"func" : 0, "auth" : "a36d-yw31-yom6-87ep", "sname" : "G3501", "net" : 0 , "oper" : 1, "serial" : 123, "len" : 1234,
          "data" :  {"time" : "2022-07-05 12:00:00", avgTemp" : 25.2, "avgHum" : 102, "ws" : 3.1, "wd" : null, "pa" : 998.5 , "rn" : 4.2, "vis" : 15000}
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
    </div>
  </div>
</template>
<script setup>
import { ref, reactive,onBeforeMount, onMounted } from 'vue'
import {useMenuStore} from "@/stores/menu"
const menuStore=useMenuStore()
const searchData =reactive({
  timeRange:['','']
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
      height: 336px;
      background-color: var(--vt-c-white);
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