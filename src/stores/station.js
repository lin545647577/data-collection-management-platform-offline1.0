import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStationStore = defineStore('station', () => {
  const station = ref('')
  const time=ref('')
  const setStation=(val)=>{
    station.value=val
  }
  const setTime=(val)=>{
    time.value=val
  }
  return { time,station,setStation,setTime }
})
