<template>
  <div class="content-box">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="站点设置" name="1">
        <Location />
      </el-tab-pane>
      <el-tab-pane label="阈值设置" name="2">
        <Threshold/>
      </el-tab-pane>
      <el-tab-pane label="5G设置" name="3">
        <FiveG/>
      </el-tab-pane>
      <el-tab-pane label="网口设置" name="4">
        <InternetAccess/>
      </el-tab-pane>
      <el-tab-pane label="WIFI设置" name="5">
        <Wifi/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
  import { ref, reactive } from 'vue'
  import Location from './components/location.vue'
  import Threshold from './components/threshold.vue'
  import FiveG from './components/fiveG.vue';
  import InternetAccess from './components/internetAccess.vue'
  import Wifi from './components/wifi.vue'
  const activeName =ref('1')
  const handleClick = (tab, event) => {
    console.log(tab.paneName, event)
    if(activeName!=tab.paneName){
      // 重置原页面数据
    }
  }
</script>
<style scoped lang="less">
.content-box{
  background-color: var(--vt-c-white);
  width: 100%;
  // height: 100%;
  min-height: 100%;
  .demo-tabs{
    :deep(.el-tabs__nav-wrap){
      padding: 0 16px;
      font-size: 14px;
    }
    :deep(.el-tabs__item){
      padding: 0 16px;
      height: 48px;
      &:hover{
        color: #333333;
      }
      &.is-active{
        color: #333333;
      }
    }
    :deep(.el-tabs__header){
      margin:0;
    }
    :deep(.el-tabs__content){
      padding:0 24px 24px 24px;
    }
  }
}
</style>