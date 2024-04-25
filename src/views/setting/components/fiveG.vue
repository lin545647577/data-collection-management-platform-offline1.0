<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <div class="title">SIM1</div>
    <div class="form-item-box">
      <el-form-item label="指定接入点：">
        <el-switch v-model="form.point1"/>
      </el-form-item>
      <el-form-item label="接入点名称：" prop="pointName1">
        <el-input v-model="form.pointName1" :disabled="!form.point1"/>
      </el-form-item>
      <el-form-item label="指定接口：">
        <el-switch v-model="form.interface1"/>
      </el-form-item>
      <el-form-item label="接口名称：" prop="name1">
        <el-input v-model="form.name1" :disabled="!form.interface1"/>
      </el-form-item>
    </div>
    <div class="title">SIM2</div>
    <div class="form-item-box">
      <el-form-item label="指定接入点：">
        <el-switch v-model="form.point2" />
      </el-form-item>
      <el-form-item label="接入点名称：" prop="pointName2">
        <el-input v-model="form.pointName2" :disabled="!form.point2"/>
      </el-form-item>
      <el-form-item label="指定接入点：">
        <el-switch v-model="form.interface2" />
      </el-form-item>
      <el-form-item label="接入点名称：" prop="name2">
        <el-input v-model="form.name2" :disabled="!form.interface2"/>
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
import { ref, reactive } from 'vue'
const form =reactive({
  pointName1:'',
  pointName2:'',
  name1:'',
  name2:'',
  interface1:true,
  interface2:true,
  point1:true,
  point2:true
})
const rules = reactive({
  name1: [
    { required: true, message: '请输入接口名称', trigger: 'blur' },
  ],
  name2: [
    { required: true, message: '请输入接口名称', trigger: 'blur' },
  ],
  pointName1: [
    { required: true, message: '请输入接入点名称', trigger: 'blur' },
  ],
  pointName2: [
    { required: true, message: '请输入接入点名称', trigger: 'blur' },
  ],
})
const ruleFormRef = ref()
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
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
    &:last-of-type{
      margin-bottom: 0;
    }
  }
  
  .btn {
    margin: 0 auto;
  }
}
</style>