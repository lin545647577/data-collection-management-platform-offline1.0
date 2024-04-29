<template>
  <el-form
    ref="ruleFormRef"
    :model="state"
    class="demo-ruleForm"
    label-position="left"
  >
    <div class="title">网口1({{ state.form1.name }})</div>
    <div class="form-item-box">
      <el-form-item label="IP获取方式：">
        <el-radio-group v-model="state.form1.method" @change="handleChangeRadio({type:state.form1.method,key:'form1'})">
          <el-radio :value="2">自动获取</el-radio>
          <el-radio :value="1">手动设置</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="IP地址：" prop="form1.ipAddress" :rules="setRule(state.form1.method,'IP地址')">
        <el-input v-model="state.form1.ipAddress" :disabled="state.form1.method==2"/>
      </el-form-item>
      <el-form-item label="子网掩码：" prop="form1.subnetMask" :rules="setRule(state.form1.method,'子网掩码')">
        <el-input v-model="state.form1.subnetMask" :disabled="state.form1.method==2"/>
      </el-form-item>
      <el-form-item label="网关：" prop="form1.gateway" :rules="setRule(state.form1.method,'网关')">
        <el-input v-model="state.form1.gateway" :disabled="state.form1.method==2"/>
      </el-form-item>
      <el-form-item label="主DNS服务器：" prop="preferredDns">
        <el-input v-model="state.form1.preferredDns" :disabled="state.form1.method==2"/>
      </el-form-item>
      <el-form-item label="备DNS服务器：" prop="alternateDns">
        <el-input v-model="state.form1.alternateDns" :disabled="state.form1.method==2"/>
      </el-form-item>
    </div>
    <div class="title">网口2({{ state.form2.name }})</div>
    <div class="form-item-box">
      <el-form-item label="IP获取方式：">
        <el-radio-group v-model="state.form2.method" @change="handleChangeRadio({type:state.form2.method,key:'form2'})">
          <el-radio :value="2">自动获取</el-radio>
          <el-radio :value="1">手动设置</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="IP地址：" prop="form2.ipAddress" :rules="setRule(state.form2.method,'IP地址')">
        <el-input v-model="state.form2.ipAddress" :disabled="state.form2.method==2"/>
      </el-form-item>
      <el-form-item label="子网掩码：" prop="form2.subnetMask" :rules="setRule(state.form2.method,'子网掩码')">
        <el-input v-model="state.form2.subnetMask" :disabled="state.form2.method==2"/>
      </el-form-item>
      <el-form-item label="网关：" prop="form2.gateway" :rules="setRule(state.form2.method,'网关')">
        <el-input v-model="state.form2.gateway" :disabled="state.form2.method==2"/>
      </el-form-item>
      <el-form-item label="主DNS服务器：" prop="preferredDns">
        <el-input v-model="state.form2.preferredDns" :disabled="state.form2.method==2"/>
      </el-form-item>
      <el-form-item label="备DNS服务器：" prop="alternateDns">
        <el-input v-model="state.form2.alternateDns" :disabled="state.form2.method==2"/>
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
import { ref, reactive,onBeforeMount } from 'vue'
import {queryEthernet,updateEthernet} from '@/api/setting'
import { ElMessage } from 'element-plus'
const state =reactive({
  form1:{
    alternateDns: "",
    gateway: "",
    ipAddress: "",
    method: 1,
    name: "",
    preferredDns: "",
    subnetMask: ""
  },
  form2:{
    alternateDns: "",
    gateway: "",
    ipAddress: "",
    method: 1,
    name: "",
    preferredDns: "",
    subnetMask: ""
  },
  form1backup:{},
  form2backup:{}
})
const setRule=(type,msg)=>{
  const rule={ required: true, message: `请输入${msg}`, trigger: 'blur' }
  return type==1? rule:{}
}
const handleChangeRadio = (val)=>{
  const {type,key}=val
  if(type==2){
    state[key].alternateDns=''
    state[key].gateway=''
    state[key].ipAddress=''
    state[key].preferredDns=''
    state[key].subnetMask=''
    ruleFormRef.value.clearValidate()
  }else{
    // state[key]=Object.assign({},state[`${key}backup`]) // 重置接口获取的数据
  }
}
const initEthernet=()=>{
  queryEthernet().then(res=>{
    // console.log('initEthernet:',res);
    res.payload && res.payload.forEach((item,index) => {
      state[`form${index+1}`]=item
      state[`form${index+1}backup`]=Object.assign({},item)
    });
  })
}
const updateEthernetFn=()=>{
  const data= [state.form1,state.form2]
  // console.log('update:',data);
  updateEthernet(data).then(res=>{
    ElMessage.success('保存成功')
  })
}
const ruleFormRef = ref()
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateEthernetFn()
    } else {
      console.log('error submit!', fields)
    }
  })
}
onBeforeMount(()=>{
  initEthernet()
})
</script>
<style scoped lang="less">
.demo-ruleForm{
  padding-top: 24px ;
  .title{
    margin-left: 320px;
    font-size: 16px;
    color: #333333;
    font-weight: 700;
  }
  .form-item-box{
    width: 347px;
    margin: 0 auto 24px;
  }
  :deep(.el-form-item){
    margin-bottom: 22px;
    & .el-form-item__label{
      height: 32px;
      width: 120px;
      line-height: 32px;
    }
    & .el-input__inner{
      font-size: var(--dc-font-size);
      height: 32px;
      line-height: 32px;
    }
    &:last-of-type{
      margin-bottom: 0;
    }
  }
  .btn {
    margin: 0 auto;
  }
}
</style>