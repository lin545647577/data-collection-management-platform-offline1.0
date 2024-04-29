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
  if(sessionStorage.getItem('username')){
    console.log(sessionStorage.getItem('username'));
    username.value=sessionStorage.getItem('username')
  }
  const setUserInfo=(val)=>{
    sessionStorage.setItem('username',val)
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