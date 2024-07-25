<template>
  <div class="head-box">
    <div class="file-menu">
      <el-breadcrumb :separator-icon="ArrowRight" v-if="fileManageStore.showCrumb">
        <el-breadcrumb-item @click="handleClickFile('/',0)"><span :style="{'cursor': fileManageStore.crumbList.length?'pointer':'default'}">文件下载</span></el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in fileManageStore.crumbList" :key="item.name" @click="handleClickFile(item.path,index+1)"><span :style="{'cursor': fileManageStore.crumbList.length==(index+1)?'default':'pointer'}">{{ item.name }}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="info-box">
      <span>{{ sysTime }}</span>
      <span>
        <svg class="svg-header">
          <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
          <use xlink:href="#icon-header"></use>
        </svg>
        <span>{{stationName}}</span>
      </span>
      <span>持续运行{{ stationStore.timeOfDuration }}</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{username}}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :disabled="isDisabled" class="btn-menu" @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { ArrowDown,ArrowRight } from '@element-plus/icons-vue'
import { ref,onBeforeMount, onBeforeUnmount,watch } from 'vue'
import { logout } from '@/api/login'
import {querySysTime,queryStation} from '@/api/setting'
import { removeAuthToken } from '@/cookie/auth'
import { useRouter } from 'vue-router'
import moment from 'moment'
import {useFileManageStore} from '@/stores/fileManage'
const fileManageStore=useFileManageStore();
import { useUserInfoStore } from '@/stores/user'
const {username} = useUserInfoStore()
import { useStationStore } from '@/stores/station'
const stationStore =useStationStore()
const router = useRouter()
import eventBus from '@/utils/bus'
const isDisabled=ref(false);
// 登出注销
const handleLogout = async() => {
  isDisabled.value=true;
  try {
    const res = await logout()
    removeAuthToken()// 清除token
    isDisabled.value=false;
    router.push('/data-collection/login')
  } catch (error) {
    isDisabled.value=false;
  }
}
const stationName=ref('')
// 获取站点信息
const initStationName=()=>{
  queryStation().then(res=>{
    stationName.value=res.payload
    stationStore.setStation(res.payload)
  })
}
// 站点信息变更触发刷新
eventBus.on('updateStationName',()=>{
  initStationName()
})
const sysTime=ref('')
let timer=null
// 获取开机时间
const initTime=()=>{
  querySysTime().then(res=>{
    sysTime.value=moment(res.payload).format('yyyy-MM-DD HH:mm:ss')
    stationStore.setTime(res.payload)
    setTimer()
  })
}
// 设置时钟效果
const setTimer=()=>{
  if(timer){
    clearInterval(timer)
    timer=null
  }
  timer=setInterval(() => {
    sysTime.value= moment(sysTime.value).add(1,'second').format('yyyy-MM-DD HH:mm:ss')
  }, 1000);
}
eventBus.on('updateTime',()=>{
  initTime()
})
watch(
  [()=>stationStore.station,()=>stationStore.time],
  ([station,time])=>{
    stationName.value=station
    sysTime.value=time
  }
)
// 文件设置模块导航
const handleClickFile=(path,index)=>{
  if(!fileManageStore.crumbList.length || fileManageStore.crumbList.length==index) return
  fileManageStore.delCrumbItem(index)
  eventBus.emit('backFile',path)
}
onBeforeMount(()=>{
  initTime();
  initStationName();
})
onBeforeUnmount(()=>{
  clearInterval(timer)
  // sysTime.value=''
})
</script>
<style scoped lang="less">
.head-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  .file-menu{
    :deep(.el-breadcrumb){
      font-size: var(--dc-font-size);
    }
  }
  .info-box{
    font-size: var(--dc-font-size);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
    > span {
      margin-right: 24px;
    }
    && * {
      vertical-align: middle;
    }
    
    .svg-header {
      margin-right: 8px;
      width: 20px;
      height: 20px;
    }
    .el-dropdown-link {
      cursor: pointer;
      display: flex;
      align-items: center;
      outline: none;
      font-size: 14px;
      line-height: normal;
    }
  }
}
</style>
