import { ref,reactive } from 'vue'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const activeMenu=ref('')
  const setActiveMenu =(path)=>{
    activeMenu.value=path
    sessionStorage.setItem('activeMenu',path)
    // console.log('sessionStorage:',sessionStorage.getItem('activeMenu'));
  }
  sessionStorage.getItem('activeMenu') && setActiveMenu(sessionStorage.getItem('activeMenu'))
  return { activeMenu,setActiveMenu }
})