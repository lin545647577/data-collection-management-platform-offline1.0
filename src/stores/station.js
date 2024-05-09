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
  const timeOfDuration=ref('')
  const setTimeOfDu=(val)=>{
    timeOfDuration.value=formatDuration(val)
  }
  const formatDuration = (s) => {
    if (s < 0) s = -s;
    const time = {
      year: Math.floor(s / 31104000),
      day: Math.floor(s / 86400) % 365,
      hour: Math.floor(s / 3600) % 24,
      minute: Math.floor(s / 60) % 60
    };
    const keyToText = {
      year:'年',
      day: '天',
      hour: '小时',
      minute: '分钟'
    };
    return Object.entries(time)
      .filter(val => val[1] !== 0)
      .map(([key, val]) => `${val}${keyToText[key]}`)
      .join(' ');
  }
  return { time,station,setStation,setTime,timeOfDuration,setTimeOfDu }
})
