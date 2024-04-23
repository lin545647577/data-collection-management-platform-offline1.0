import { ref,reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('user', () => {
  // localStorage.getItem('usrInfo')
  console.log('localStorage',localStorage.getItem('usrInfo'));
  const userInfo = reactive({username:123})
  return { userInfo }
})