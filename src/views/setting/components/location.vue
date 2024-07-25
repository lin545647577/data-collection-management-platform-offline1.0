<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    label-position="left"
  >
    <div class="title">设置站号</div>
    <el-form-item label="站号：" prop="station">
      <el-input v-model="form.station" />
    </el-form-item>
    <div class="title">设置时间</div>
    <el-form-item label=" " prop="type">
      <el-segmented v-model="form.type" :options="typeOptions"></el-segmented>
    </el-form-item>
    <!-- 自动校对,因表单元素校验问题，只能用v-if -->
    <div class="auto-item" v-if="!showTime">
      <el-form-item label=" ">
        <el-checkbox-group v-model="form.gps">
          <el-checkbox value="1" name="type">GPS校时</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div v-show="showNTP">
        <el-form-item label="NTP1：" prop="ntp1" :rules="{
        required: true,
        message: '请输入NTP1',
        trigger: 'blur',
      }">
          <el-input v-model="form.ntp1" />
        </el-form-item>
        <el-form-item label="NTP2：" prop="ntp2">
          <el-input v-model="form.ntp2" />
        </el-form-item>
        <el-form-item label="NTP3：" prop="ntp3">
          <el-input v-model="form.ntp3" />
        </el-form-item>
        <el-form-item label="NTP4：" prop="ntp4">
          <el-input v-model="form.ntp4" />
        </el-form-item>
      </div>
    </div>
    <!-- 手动校对 -->
    <div class="time-item" v-else>
      <el-form-item prop="date1" :rules="{
        required: true,
        message: '请选择日期',
        trigger: 'change'
      }">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="请选择日期"
          style="width: 100%"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item prop="date2" :rules="{
        required: true,
        message: '请选择时间',
        trigger: 'change'
      }">
        <el-time-picker
          v-model="form.date2"
          placeholder="请选择时间"
          style="width: 100%"
          value-format="HH:mm:ss"
        />
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" class="btn" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, watch, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import { queryNTP,updateStationInfo } from '@/api/setting'
import { useStationStore } from '@/stores/station'
const typeOptions = ['自动校时', '手动校对']
const ruleFormRef = ref()
const stationStore = useStationStore()
const form = reactive({
  station: '',
  type: '自动校时',
  gps: [],
  ntp4: '',
  ntp3: '',
  ntp2: '',
  ntp1: '',
  date1: '',
  date2: '',
})
watch(
  () => stationStore.station,
  (val) => {
    // console.log('watch',val)
    if(val) form.station = val
  }
)
const rules = reactive({
  station: [{ required: true, message: '请输入站号', trigger: 'blur' }]
})
// 初始化信息
const initNTP=()=>{
  queryNTP().then(res=>{
    // console.log('initNTP:',res);
    res.payload && res.payload.forEach((item,index) => {
      form[`ntp${index+1}`]=item
    });
  })
}
import eventBus from '@/utils/bus';
const timeSyncMethod=ref(1)
// 修改站点信息
const updateStation=()=>{
  const address=[form.ntp1,form.ntp2,form.ntp3,form.ntp4]
  const time=`${form.date1} ${form.date2}`
  const data={
    dateTime:timeSyncMethod.value==2?time:'',
    stationNum:form.station,
    address:timeSyncMethod.value==1?address.filter(item=>item):'',
    timeSyncMethod:timeSyncMethod.value
  }
  updateStationInfo(data).then(res=>{
    if(res.payload){
      eventBus.emit('updateTime');
      eventBus.emit('updateStationName');
      ElMessage.success('保存成功')
    }
  })
}
// 保存
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateStation()
    } else {
      console.log('error submit!', fields)
    }
  })
}
const showNTP = ref(true)
watch(// 监听校时方式
  () => form.gps,
  (gps) => {
    if (gps.toString()) {
      showNTP.value = false
      timeSyncMethod.value=3
    } else {
      showNTP.value = true
      timeSyncMethod.value=1
    }
  }
)
const showTime = ref(false)
watch(// 监听校时方式
  () => form.type,
  (type) => {
    if (type == '自动校时') {
      showTime.value = false
      if(showNTP.value){
        timeSyncMethod.value=1
      }else{
        timeSyncMethod.value=3
      }
    } else {
      showTime.value = true
      timeSyncMethod.value=2
    }
  }
)
onBeforeMount(()=>{
  form.station= stationStore.station
  initNTP()
})
</script>
<style scoped lang="less">
.demo-ruleForm {
  .title {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin: 24px 0;
    &::before {
      margin-right: 8px;
      content: '';
      width: 2px;
      height: 14px;
      background-color: var(--dc-theme-blue);
    }
  }
  .btn {
    /* margin-left: 48%; */
    margin: 0 auto;
  }
  .time-item,
  .auto-item {
    margin-bottom: 16px;
  }
  .time-item {
    display: flex;
    justify-content: space-between;
    width: 384px;
    min-width:384px;
    margin: 0 auto 16px;
    :deep(.el-form-item) {
      width: 184px;
      min-width:184px;
      & .el-input{
        font-size: var(--dc-font-size);
        height: 32px;
        line-height: 32px;
      }
    }
  }
  :deep(.el-form-item) {
    /* margin-left: 39%; */
    margin: 0 auto 16px;
    width: 299px;
    min-width: 299px;
    font-size: var(--dc-font-size);
    & .el-form-item__label-wrap {
      align-items: center;
      min-width: 1px;
    }
    & .el-form-item__label,
    & .el-checkbox__label {
      font-size: var(--dc-font-size);
    }
    & .el-input__inner,
    & .el-segmented {
      font-size: var(--dc-font-size);
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>
