<template>
  <el-form
    ref="ruleFormRef"
    :model="state"
    class="demo-ruleForm"
    label-position="left"
  >
    <div class="title">SIM1</div>
    <div class="form-item-box">
      <el-form-item label="指定接入点：">
        <el-switch v-model="state.form1.apnPoint" @change="changeBtn({val:state.form1.apnPoint,form:'form1',key:'apn'})"/>
      </el-form-item>
      <el-form-item label="接入点名称：" prop="form1.apn" :rules="setRule(state.form1.apnPoint,'接入点名称')">
        <el-input v-model="state.form1.apn" :disabled="!state.form1.apnPoint"/>
      </el-form-item>
      <el-form-item label="指定接口：">
        <el-switch v-model="state.form1.interfaceBtn" @change="changeBtn({val:state.form1.interfaceBtn,form:'form1',key:'interfac'})"/>
      </el-form-item>
      <el-form-item label="接口名称：" prop="form1.interfac" :rules="setRule(state.form1.interfaceBtn,'接口名称')">
        <el-input v-model="state.form1.interfac" :disabled="!state.form1.interfaceBtn"/>
      </el-form-item>
    </div>
    <div class="title">SIM2</div>
    <div class="form-item-box">
      <el-form-item label="指定接入点：">
        <el-switch v-model="state.form2.apnPoint" @change="changeBtn({val:state.form2.apnPoint,form:'form2',key:'apn'})"/>
      </el-form-item>
      <el-form-item label="接入点名称：" prop="form2.apn" :rules="setRule(state.form2.apnPoint,'接入点名称')">
        <el-input v-model="state.form2.apn" :disabled="!state.form2.apnPoint"/>
      </el-form-item>
      <el-form-item label="指定接口：">
        <el-switch v-model="state.form2.interfaceBtn" @change="changeBtn({val:state.form2.interfaceBtn,form:'form2',key:'interfac'})"/>
      </el-form-item>
      <el-form-item label="接口名称：" prop="form2.interfac" :rules="setRule(state.form2.interfaceBtn,'接口名称')">
        <el-input v-model="state.form2.interfac" :disabled="!state.form2.interfaceBtn"/>
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
import { ref, reactive, onBeforeMount } from 'vue'
import { queryCellular,updateCellular } from '@/api/setting';
import { ElMessage } from 'element-plus'
const state =reactive({
  form1:{
    apn:'',
    interfac:'',
    apnPoint:true,
    interfaceBtn:true,
  },
  form2:{
    apn:'',
    interfac:'',
    apnPoint:true,
    interfaceBtn:true,
  },
  form1backup:{},
  form2backup:{}
})
const initCellular=()=>{
  queryCellular().then(res=>{
    // console.log(res);
    res.payload && res.payload.forEach((item,index) => {
      let apnPoint=true,interfaceBtn=true
      if(!item.apn) apnPoint=false
      if(!item.interfac) interfaceBtn=false
      state[`form${index+1}`]={...item,apnPoint,interfaceBtn}
      state[`form${index+1}backup`]={...item,apnPoint,interfaceBtn}
    });
  })
}
const setRule=(val,msg)=>{
  const rule={ required: true, message:`请输入${msg}`, trigger: 'blur' }
  return val?rule:{}
}
const changeBtn=({val,form,key})=>{
  if(val){
    // state[form][key]=state[`${form}backup`][key] // 重置接口获取的数据
  }else{
    state[form][key]=''
    ruleFormRef.value.clearValidate([`${form}.${key}`])
  }
}
const ruleFormRef = ref()
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!',state)
      const data=[state.form1,state.form2]
      updateCellular(data).then(res=>{
        ElMessage.success('保存成功')
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
onBeforeMount(()=>{
  initCellular()
})
</script>
<style scoped lang="less">
.demo-ruleForm{
  padding-top: 24px;
  .title{
    margin-left: 323px;
    font-size: 16px;
    color: #333333;
    font-weight: 700;
  }
  .form-item-box{
    width: 332px;
    margin: 0 auto 22px;
  }
  :deep(.el-form-item){
    margin-bottom: 22px;
    & .el-form-item__content{
      justify-content: flex-end;
      & .el-input__inner{
        font-size: var(--dc-font-size);
        height: 32px;
        line-height: 32px;
      }
    }
    & .el-form-item__label{
      height: 32px;
      width: 105px;
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