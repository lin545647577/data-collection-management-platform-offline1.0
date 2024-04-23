<template>
  <div class="common-layout">
    <el-container class="index-box">
      <el-aside class="aside-box">
        <Menu />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main class="main-bg">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import Header from './header.vue'
import Menu from './menu.vue';
import { ref, reactive } from 'vue'
import {useUserInfoStore} from '@/stores/user'
const userStore=useUserInfoStore()
console.log('userStore',userStore);
</script>
<style scoped lang="less">
.index-box{
  height: 100vh;
  .aside-box{
    width: 210px;
  }
  .main-bg{
    background-color: #F2F2F2;
    padding: 16px;
  }
  :deep(.el-header){
    height: 56px;
  }
}
</style>