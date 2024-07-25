<template>
  <div class="menu-box">
    <div class="logo">
      <svg class="svg-logo">
        <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
        <use xlink:href="#icon-logo"></use>
      </svg>
      <span> 数据采集管理平台 </span>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      background-color="none"
      text-color="#ffffff"
      active-text-color="#ffffff"
      @open="handleOpen"
      router
      :popper-offset="15"
      unique-opened	
    >
      <el-menu-item v-for="item in list" :key="item.menuId" :index="item.path">
        <svg class="svg-menu">
          <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
          <use :xlink:href="item.icon"></use>
        </svg>
        <span>{{ item.menuName }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import { ref,onBeforeMount,watch } from 'vue'
import { useMenuStore } from '@/stores/menu';
const menuStore=useMenuStore();
const activeIndex = ref('/data-collection/index') // 激活标识
const list = [
  {
    menuId: '1',
    menuName: '实时监控',
    icon: '#icon-menu-monitor',
    path: '/data-collection/index',
  },
  {
    menuId: '2',
    menuName: '预警信息',
    icon: '#icon-menu-warning',
    path: '/data-collection/warning',
  },
  {
    menuId: '3',
    menuName: '配置管理',
    icon: '#icon-menu-configManage',
    path: '/data-collection/configManage',
  },
  {
    menuId: '4',
    menuName: '文件下载',
    icon: '#icon-menu-fileManage',
    path: '/data-collection/fileManage',
  },
  {
    menuId: '5',
    menuName: '参数设置',
    icon: '#icon-menu-setting',
    path: '/data-collection/setting',
  }
]
onBeforeMount(()=>{
  if(menuStore.activeMenu) activeIndex.value=menuStore.activeMenu
})
watch(
  ()=>menuStore.activeMenu,
  (activeMenu)=>{
    activeIndex.value=activeMenu
  }
)
const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath)
  menuStore.setActiveMenu(key)
}
</script>
<style scoped lang="less">
.menu-box {
  width: 100%;
  background-color: var(--dc-theme-blue);
  height: 100%;
  padding: 15px 0;
  color: var(--vt-c-white);
  .logo {
    padding: 0 15px 15px 15px;
    .svg-logo {
      width: 32px;
      height: 26.5px;
    }
  }
  .logo * {
    vertical-align: middle;
  }
  .logo > span {
    font-size: 16px;
    margin-left: 3px;
  }
  .el-menu {
    .svg-menu {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
  :deep(.el-menu) {
    border-right: none;
  }
  :deep(.el-sub-menu__title) {
    font-size: 14px;
    padding: 0 0 0 16px !important;
    height: 40px;
  }
  :deep(.el-sub-menu__title:hover) {
    background: rgba(0, 0, 0, 0.2);
  }
  :deep(.el-menu-item) {
    font-size: 14px;
    padding: 0 0 0 16px !important;
    height: 40px;
  }
  :deep(.el-menu-item.is-active) {
    background: rgba(0, 0, 0, 0.2);
    border-right: 3px solid #009cff;
  }
  :deep(.el-menu-item:hover) {
    background: rgba(0, 0, 0, 0.2);
    border-right: 3px solid #009cff;
  }
}
</style>
