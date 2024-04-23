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
      @close="handleClose"
      router
      :popper-offset="15"
    >
      <template v-for="item in list" :key="item.menuId">
        <el-sub-menu :index="item.path" v-if="item.children">
          <template #title>
            <svg class="svg-menu">
              <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
              <use :xlink:href="item.icon"></use>
            </svg>
            <span>{{ item.menuName }}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.menuId"
            :index="subItem.path"
            >{{ subItem.menuName }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item :index="item.path" v-else>
          <svg class="svg-menu">
            <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
            <use :xlink:href="item.icon"></use>
          </svg>
          <span>{{ item.menuName }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const activeIndex = ref('1')
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
  },
  {
    menuId: 48,
    menuName: '库存管理',
    menuCode: 'operations-stock-control',
    icon: 'menu-2',
    path: '#',
    children: [
      {
        menuId: 51,
        menuName: '领用申请',
        menuCode: 'operations-use-apply',
        icon: 'layui-icon-star-fill',
        path: '/operations/use-apply',
        sort: 0,
        parentId: 48,
        app: 5,
        children: null,
      },
      {
        menuId: 49,
        menuName: '配件库存',
        menuCode: 'operations-parts-stock',
        icon: 'layui-icon-star-fill',
        path: '/operations/parts-stock',
        sort: 0,
        parentId: 48,
        app: 5,
        children: null,
      },
      {
        menuId: 50,
        menuName: '库存预警',
        menuCode: 'operations-parts-stock-warn',
        icon: 'layui-icon-star-fill',
        path: '/operations/parts-stock-warn',
        sort: 0,
        parentId: 48,
        app: 5,
        children: null,
      },
      {
        menuId: 52,
        menuName: '领用审批',
        menuCode: 'operations-use-approval',
        icon: 'layui-icon-star-fill',
        path: '/operations/use-approval',
        sort: 0,
        parentId: 48,
        app: 5,
        children: null,
      },
    ],
  },
]
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
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
    padding: 0 16px 15px 16px;
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
