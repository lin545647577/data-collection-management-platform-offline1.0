<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    class="demo-ruleForm"
    label-position="left"
  >
    <el-form-item label="WIFI模式：" prop="type">
      <el-radio-group v-model="form.type">
        <el-radio value="ap">
          <span>
            AP
          </span>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="数采器作为热点，其他设备连接数采器"
            placement="top-start"
          >
            <svg class="svg-mark">
              <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
              <use xlink:href="#icon-questionMark"></use>
            </svg>
          </el-tooltip>
        </el-radio>
        <el-radio value="station">
          Station
          <el-tooltip
            effect="dark"
            content="数采器连接其他WIFI设备"
            placement="top-start"
          >
            <svg class="svg-mark">
              <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
              <use xlink:href="#icon-questionMark"></use>
            </svg>
          </el-tooltip>
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="WIFI名称：" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="WIFI密码：" prop="name">
      <el-input v-model="form.name" show-password type="password"/>
    </el-form-item>
    <el-form-item label="网关：" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="主DNS服务器：" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="备DNS服务器：" prop="name">
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
const form =reactive({
  type:'ap',
  name:'',
})
const rules = reactive({
  name: [
    { required: true, message: '请输入WIFI名称', trigger: 'blur' },
  ]
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
  margin: 62px auto 0;
  width: 347px;
  .svg-mark{
    margin-left: 7px;
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
  }
  .btn{
    margin: 0 auto;
  }
  :deep(.el-form-item){
    margin-bottom: 16px;
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
    & .el-radio__label{
      display: flex;
      align-items: center;
    }
  }
}
</style>
