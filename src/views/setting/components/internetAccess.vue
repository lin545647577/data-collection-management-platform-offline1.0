<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    class="demo-ruleForm"
    label-position="left"
  >
    <div class="title">网口1</div>
    <div class="form-item-box">
      <el-form-item label="IP获取方式：" prop="type1">
        <el-radio-group v-model="form.type1">
          <el-radio :value="1">自动获取</el-radio>
          <el-radio :value="2">手动设置</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="IP地址：" prop="name1">
        <el-input v-model="form.name1" :disabled="form.type1==1"/>
      </el-form-item>
      <el-form-item label="子网掩码：" prop="name1">
        <el-input v-model="form.name1" :disabled="form.type1==1"/>
      </el-form-item>
      <el-form-item label="网关：" prop="name1">
        <el-input v-model="form.name1" :disabled="form.type1==1"/>
      </el-form-item>
      <el-form-item label="主DNS服务器：" prop="name1">
        <el-input v-model="form.name1" :disabled="form.type1==1"/>
      </el-form-item>
      <el-form-item label="备DNS服务器：" prop="name1">
        <el-input v-model="form.name1" :disabled="form.type1==1"/>
      </el-form-item>
    </div>
    <div class="title">网口2</div>
    <div class="form-item-box">
      <el-form-item label="IP获取方式：" prop="type1">
        <el-radio-group v-model="form.type2">
          <el-radio :value="1">自动获取</el-radio>
          <el-radio :value="2">手动设置</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="IP地址：" prop="name1">
        <el-input v-model="form.name1" :disabled="form.type2==1"/>
      </el-form-item>
      <el-form-item label="子网掩码：" prop="name1">
        <el-input v-model="form.name1" :disabled="form.type2==1"/>
      </el-form-item>
      <el-form-item label="网关：" prop="name1">
        <el-input v-model="form.name1" :disabled="form.type2==1"/>
      </el-form-item>
      <el-form-item label="主DNS服务器：" prop="name1">
        <el-input v-model="form.name1" :disabled="form.type2==1"/>
      </el-form-item>
      <el-form-item label="备DNS服务器：" prop="name1">
        <el-input v-model="form.name1" :disabled="form.type2==1"/>
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
  type1:1,
  type2:2,
  name1:'',
  name2:'',
})
const rules = reactive({
  name1: [
    { required: true, message: '请输入接口名称', trigger: 'blur' },
  ],
  name2: [
    { required: true, message: '请输入接口名称', trigger: 'blur' },
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