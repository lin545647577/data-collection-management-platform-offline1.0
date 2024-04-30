import { ref } from 'vue'
import { defineStore } from 'pinia'
import { removeAuthToken } from "@/cookie/auth";
import { useRouter } from 'vue-router';
import {useMenuStore} from './menu'
export const useUserInfoStore = defineStore('user', () => {
  const {setActiveMenu}=useMenuStore()
  const router=useRouter()
  // console.log('sessionStorage:user:',sessionStorage.getItem('username'));
  const username = ref('')
  if(localStorage.getItem('username')){
    // console.log(localStorage.getItem('username'));
    username.value=localStorage.getItem('username')
  }
  const setUserInfo=(val)=>{
    localStorage.setItem('username',val)
    username.value=val
  }
  const removeUserInfo=()=>{
    setUserInfo('')
    removeAuthToken()
    setActiveMenu('')//重置选中菜单
    router.push('/data-collection/login')
  }
  return { username,removeUserInfo,setUserInfo }
})