<template>
  <div class="content-box">
    index132
  </div>
</template>
<script setup>
  import { ref, reactive,onBeforeMount, onMounted } from 'vue'
  import {useMenuStore} from "@/stores/menu"
  const menuStore=useMenuStore()
onMounted(()=>{
  menuStore.setActiveMenu('/data-collection/index')
})
</script>
<style scoped lang="less">
.content-box{
  
}
</style>