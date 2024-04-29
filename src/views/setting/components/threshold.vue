<template>
  <el-form
    ref="ruleFormRef"
    :model="state.form"
    :rules="rules"
    class="demo-ruleForm"
    label-position="left"
  >
    <el-form-item label="低电压阈值：" prop="voltageThreshold">
      <el-input v-model="state.form.voltageThreshold"/><span class="tail">伏</span>
    </el-form-item>
    <el-form-item label="CPU阈值：" prop="cpuAlertThreshold">
      <el-input v-model="state.form.cpuAlertThreshold"/><span class="tail">%</span>
    </el-form-item>
    <el-form-item label="CPU阈值时间：" prop="cpuAlertDuration">
      <el-input v-model="state.form.cpuAlertDuration"/><span class="tail">秒</span>
    </el-form-item>
    <el-form-item label="内存阈值：" prop="memAlertThreshold">
      <el-input v-model="state.form.memAlertThreshold"/><span class="tail">%</span>
    </el-form-item>
    <el-form-item label="内存阈值时间：" prop="memAlertDuration">
      <el-input v-model="state.form.memAlertDuration"/><span class="tail">秒</span>
    </el-form-item>
    <el-form-item label="闪存阈值：" prop="diskThreshold">
      <el-input v-model="state.form.diskThreshold"/><span class="tail">%</span>
    </el-form-item>
    <el-form-item label="SD卡阈值：" prop="sdCardThreshold">
      <el-input v-model="state.form.sdCardThreshold"/><span class="tail">%</span>
    </el-form-item>
    <el-form-item label="SIM卡1信号阈值：" prop="simSignalThreshold">
      <el-input v-model="state.form.simSignalThreshold"/>
    </el-form-item>
    <!-- <el-form-item label="SIM卡2信号阈值：" prop="name">
      <el-input v-model="state.form.name"/>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" class="btn" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive,onBeforeMount } from 'vue'
import {queryThreshold,updateThreshold} from '@/api/setting'
import { ElMessage } from 'element-plus'
const ruleFormRef = ref()
const state = reactive({form:{
  cpuAlertDuration: "",
  cpuAlertThreshold: "",
  diskThreshold: "",
  memAlertDuration: "",
  memAlertThreshold: "",
  sdCardThreshold: "",
  simSignalThreshold: "",
  voltageThreshold: ""
}})
const initThreshold=()=>{
  queryThreshold().then(res=>{
    // console.log(res);
    state.form=res.payload
  })
}
const validatePercent = (rule, value, callback) => {
  if (value > 100 || value < 0) {
    callback(new Error('请输入正确百分比值（0-100）'))
  } else {
    callback()
  }
}
const rules = {
  voltageThreshold: [
    { required: true, message: '请输入低电压阈值', trigger: 'blur' }
  ],
  cpuAlertThreshold: [
    { required: true, message: '请输入CPU阈值', trigger: 'blur' },
    { validator: validatePercent, trigger: 'blur' },
  ],
  cpuAlertDuration: [
    { required: true, message: '请输入CPU阈值时间', trigger: 'blur' },
  ],
  memAlertThreshold: [
    { required: true, message: '请输入内存阈值', trigger: 'blur' },
    { validator: validatePercent, trigger: 'blur' },
  ],
  memAlertDuration: [
    { required: true, message: '请输入内存阈值时间', trigger: 'blur' },
  ],
  diskThreshold: [
    { required: true, message: '请输入闪存阈值', trigger: 'blur' },
    { validator: validatePercent, trigger: 'blur' },
  ],
  sdCardThreshold: [
    { required: true, message: '请输入SD卡阈值', trigger: 'blur' },
    { validator: validatePercent, trigger: 'blur' },
  ],
  simSignalThreshold: [
    { required: true, message: '请输入SIM卡1信号阈值', trigger: 'blur' },
  ],
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log('submit!',state.form)
      updateThreshold(state.form).then(res=>{
        ElMessage.success('保存成功')
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
onBeforeMount(()=>{
  initThreshold()
})
</script>
<style scoped lang="less">
.demo-ruleForm{
  /* margin: 24px 0;
  margin-left: 35.5%;*/
  margin: 24px auto 0;
  width: 331px;
  :deep(.el-form-item){
    margin-bottom: 16px;
    & .el-form-item__content{
      position: relative;
      & .el-input__inner{
        font-size: var(--dc-font-size);
        height: 32px;
        line-height: 32px;
      }
    }
    & .el-form-item__label{
      height: 32px;
      width: 140px;
      line-height: 32px;
    }
    &:last-of-type{
      margin-bottom: 0;
    }
  }
  .tail{
    position: absolute;
    right: -20px;
    font-size: var(--dc-font-size);
  }
  .btn {
    /* margin-left:60% ;*/
    margin: 0 auto;
  }
}
</style>