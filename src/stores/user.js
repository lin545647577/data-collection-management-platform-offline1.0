import { ref,reactive } from 'vue'
import { defineStore } from 'pinia'
import { removeAuthToken } from "@/cookie/auth";
import { useRouter } from 'vue-router';
import {useMenuStore} from './menu'
export const useUserInfoStore = defineStore('user', () => {
  const {setActiveMenu}=useMenuStore()
  const router=useRouter()
  console.log('sessionStorage:user:',sessionStorage.getItem('usrInfo'));
  let userInfo = {}
  if(sessionStorage.getItem('usrInfo')){
    userInfo=reactive(sessionStorage.getItem('usrInfo'))
  }else{
    // 查询用户信息
  }
  // 查询用户信息
  const queryUserInfo=()=>{

  }
  const removeUserInfo=()=>{
    userInfo={};
    removeAuthToken()
    setActiveMenu('')//重置选中菜单
    router.push('/data-collection/login')
  }
  return { userInfo,removeUserInfo }
})