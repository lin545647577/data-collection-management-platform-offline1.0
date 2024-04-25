<template>
  <div class="head-box">
    <span>2022-07-10 14:22:10</span>
    <span>
      <svg class="svg-header">
        <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
        <use xlink:href="#icon-header"></use>
      </svg>
      <span>G3501</span>
    </span>
    <span>持续运行12天2小时34分</span>
    <el-dropdown>
      <span class="el-dropdown-link">
        张晓晓
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="loading" class="btn-menu" @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { logout } from '@/api/login'
import { removeAuthToken } from '@/cookie/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const loading=ref(false);
const handleLogout = async() => {
  loading.value=true;
  try {
    const res = await logout()
    removeAuthToken()
    loading.value=false;
    router.push('/data-collection/login')
  } catch (error) {
    loading.value=false;
  }
}
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
