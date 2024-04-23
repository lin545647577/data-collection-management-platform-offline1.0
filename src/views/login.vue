<template>
  <div class="login-box">
    <div class="title">数据采集管理平台</div>
    <el-card class="my-card">
      <template #header>
        <div class="card-header">
          <span class="card-title">用户登录</span>
        </div>
      </template>
      <div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item label="" prop="username">
            <el-input
              v-model="ruleForm.username"
              placeholder="用户名"
            >
              <template #prepend>
                <svg class="svg-inp">
                  <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
                  <!-- use标签fill属性可以设置图标的颜色 -->
                  <use xlink:href="#icon-login-user"></use>
                </svg>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="密码"
              type="password"
              show-password
            >
              <template #prepend>
                <svg class="svg-inp">
                  <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
                  <!-- use标签fill属性可以设置图标的颜色 -->
                  <use xlink:href="#icon-login-lock"></use>
                </svg>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-loading="loading" :disabled="loading" class="login-btn" @click="submitForm(ruleFormRef)">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import {login} from "@/api/login.js"
import {setAuthToken,getAuthToken} from '@/cookie/auth'
import { useRouter } from 'vue-router';
const router=useRouter()
onBeforeMount(()=>{
  if(getAuthToken()) router.push('/')
})

const ruleForm = reactive({
  username: '',
  password: ''
})
const rules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password:[
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})
const ruleFormRef = ref()
const loading = ref(false)
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value=true
      try {
        const res = await login(ruleForm)
        console.log(res.payload);
        setAuthToken(res.payload.accessToken)
        loading.value=false
        router.push('/')
      } catch (error) {
        loading.value=false
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped lang="less">
.login-box {
  background-color: var(--dc-theme-blue);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  .title {
    font-family: 'YouYuan';
    font-size: 24px;
    color: #ffffff;
    margin-bottom: 24px;
  }
  .card-title {
    font-size: 16px;
    color: #666666;
  }
  .my-card {
    width: 376px;
    min-width: 376px;
    :deep(.el-input-group__prepend) {
      padding: 11px;
    }
    .svg-inp{
      width: 18px;
      height: 18px;
    }
    .login-btn{
      width: 100%;
      background-color: #0070B8;
      color:#ffffff;
      font-size: 16px;
    }
    :deep(.el-card__body){
      padding: 24px;
    }
    .el-form-item:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
