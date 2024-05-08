import { reactive, ref, toRefs } from 'vue'
import { defineStore } from 'pinia'

export const useFileManageStore = defineStore('fileManage', () => {
  const showCrumb=ref(false)
  const setShowCrumb =(val)=>{
    showCrumb.value=val
  }
  const crumbList=ref([])
  const addCrumbList=(item)=>{
    crumbList.value.push(item)
  }
  const delCrumbItem=(index=0)=>{
    crumbList.value=crumbList.value.slice(0,index)
  }
  return { showCrumb,crumbList,setShowCrumb,addCrumbList,delCrumbItem }
})