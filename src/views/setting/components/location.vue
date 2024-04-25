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
    <el-form-item label="站号：" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <div class="title">设置时间</div>
    <el-form-item label="1" prop="type">
      <el-segmented v-model="form.type" :options="typeOptions"></el-segmented>
    </el-form-item>
    <!-- 自动校对 -->
    <div class="auto-item" v-show="!showTime">
      <el-form-item label="1">
        <el-checkbox-group v-model="form.gps">
          <el-checkbox value="1" name="type">GPS校时</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div v-show="showNTP">
        <el-form-item label="NTP1：" prop="ntp1">
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
    <div class="time-item" v-show="showTime">
      <el-form-item label="1">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="请选择日期"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            placeholder="请选择时间"
            style="width: 100%"
          />
        </el-col>
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
import { ref, reactive, watch } from 'vue'
const typeOptions = ['自动校时', '手动校对']
const ruleFormRef = ref()
const form = reactive({
  name: 'Hello',
  type: '自动校时',
  gps: [],
  ntp4: '',
  ntp3: '',
  ntp2: '',
  ntp1: '',
  date1: '',
  date2: '',
})
const rules = reactive({
  name: [{ required: true, message: '请输入站号', trigger: 'blur' }],
})
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', ruleForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}
const showNTP = ref(true)
watch(
  () => form.gps,
  (gps) => {
    if (gps.toString()) {
      showNTP.value = false
    } else {
      showNTP.value = true
    }
    // console.log(gps.toString(),showNTP.value);
  }
)
const showTime = ref(false)
watch(
  () => form.type,
  (type) => {
    if (type == '自动校时') {
      showTime.value = false
    } else {
      showTime.value = true
    }
  }
)
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
  .time-item,.auto-item{
    margin-bottom: 16px;
  }
  .time-item {
    :deep(.el-form-item) {
      width: 384px;
      min-width: 384px;
      /* margin-left: 38%; */
      margin: 0 auto 16px;
    }
  }
  :deep(.el-form-item) {
    /* margin-left: 39%; */
    margin: 0 auto 16px;
    width: 299px;
    min-width: 299px;
    font-size: var(--dc-font-size);
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
    &:last-of-type{
      margin-bottom: 0;
    }
  }
}
</style>
