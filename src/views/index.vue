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
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/index/header.vue'
import Menu from '@/components/index/menu.vue';
import { ref, reactive } from 'vue'

</script>
<style scoped lang="less">
.index-box{
  height: 100vh;
  .aside-box{
    width: 210px;
  }
}
</style>