<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    label-position="left"
  >
    <el-form-item label="低电压阈值：" prop="name">
      <el-input v-model="form.name"/><span class="tail">伏</span>
    </el-form-item>
    <el-form-item label="CPU阈值：" prop="name">
      <el-input v-model="form.name"/><span class="tail">%</span>
    </el-form-item>
    <el-form-item label="CPU阈值时间：" prop="name">
      <el-input v-model="form.name"/><span class="tail">秒</span>
    </el-form-item>
    <el-form-item label="内存阈值：" prop="name">
      <el-input v-model="form.name"/><span class="tail">%</span>
    </el-form-item>
    <el-form-item label="内存阈值时间：" prop="name">
      <el-input v-model="form.name"/><span class="tail">秒</span>
    </el-form-item>
    <el-form-item label="闪存阈值：" prop="name">
      <el-input v-model="form.name"/><span class="tail">%</span>
    </el-form-item>
    <el-form-item label="SD卡阈值：" prop="name">
      <el-input v-model="form.name"/><span class="tail">%</span>
    </el-form-item>
    <el-form-item label="SIM卡1信号阈值：" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="SIM卡2信号阈值：" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="btn" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive } from 'vue'
const ruleFormRef = ref()
const form = reactive({
  name: '',
})
const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ]
})
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