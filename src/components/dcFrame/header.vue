<template>
  <div class="head-box">
    <span>{{ sysTime }}</span>
    <span>
      <svg class="svg-header">
        <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
        <use xlink:href="#icon-header"></use>
      </svg>
      <span>{{stationName}}</span>
    </span>
    <!-- <span>持续运行12天2小时34分</span> -->
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
</template>
<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref,onBeforeMount, onBeforeUnmount,watch } from 'vue'
import { logout } from '@/api/login'
import {querySysTime,queryStation} from '@/api/setting'
import { removeAuthToken } from '@/cookie/auth'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { useUserInfoStore } from '@/stores/user'
const {username} = useUserInfoStore()
import { useStationStore } from '@/stores/station'
const stationStore =useStationStore()
const router = useRouter()
const isDisabled=ref(false);
const handleLogout = async() => {
  isDisabled.value=true;
  try {
    const res = await logout()
    removeAuthToken()
    isDisabled.value=false;
    router.push('/data-collection/login')
  } catch (error) {
    isDisabled.value=false;
  }
}
const stationName=ref('')
const queryStationName=()=>{
  queryStation().then(res=>{
    stationName.value=res.payload
    stationStore.setStation(res.payload)
  })
}

const sysTime=ref('')
let timer=null
const getTime=()=>{
  querySysTime().then(res=>{
    sysTime.value=moment(res.payload).format('yyyy-MM-DD HH:mm:ss')
    stationStore.setTime(res.payload)
    setTimer()
  })
}
const setTimer=()=>{
  timer=setInterval(() => {
    sysTime.value= moment(sysTime.value).add(1,'second').format('yyyy-MM-DD HH:mm:ss')
  }, 1000);
}
watch(
  [()=>stationStore.station,()=>stationStore.time],
  ([station,time])=>{
    stationName.value=station
    sysTime.value=time
  }
)

onBeforeMount(()=>{
  getTime();
  queryStationName();
})
onBeforeUnmount(()=>{
  clearInterval(timer)
  // sysTime.value=''
})
</script>
<style scoped lang="less">
.head-box {
  height: 56px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
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
</style>
