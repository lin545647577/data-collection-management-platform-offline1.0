<template>
  <div class="content-box">
    <el-form
      ref="ruleFormRef"
      :model="form"
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
                <use xlink:href="#icon-questionMark"></use>
              </svg>
            </el-tooltip>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-show="form.type=='ap'">
        <el-form-item label="WIFI名称：" prop="name" :rules="{
          required: true,
          message: '请输入WIFI名称',
          trigger: 'blur',
        }">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="WIFI密码：">
          <el-input v-model="form.name" show-password type="password" autocomplete="new-password"/>
        </el-form-item>
        <el-form-item label="网关：">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="主DNS服务器：">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="备DNS服务器：">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="submitForm(ruleFormRef)">
            保存
          </el-button>
        </el-form-item>
      </div>
      <div class="station-box" v-show="form.type=='station'">
        <el-form-item label="已连接WIFI：">
          <div class="wifi-box">
            <svg class="svg-wifi">
              <use xlink:href="#icon-wifi-active"></use>
            </svg>
            <span class="active">
              Cloudtech_5G
            </span>
            <span class="status">
              加密
            </span>
          </div>
        </el-form-item>
        <el-form-item label="可用WIFI：" class="usable">
          <div class="wifi-box">
            <svg class="svg-wifi">
              <use xlink:href="#icon-wifi-strong"></use>
            </svg>
            <span class="name">
              Cloudtech_5G
            </span>
            <span class="status">
              加密
            </span>
          </div>
        </el-form-item>
        <el-form-item label=" ">
          <div class="wifi-box">
            <svg class="svg-wifi">
              <use xlink:href="#icon-wifi-nomal"></use>
            </svg>
            <span class="name">
              Cloudtech_5G
            </span>
            <span class="status">
              加密
            </span>
          </div>
        </el-form-item>
        <el-form-item label=" ">
          <span class="link-wifi" @click="centerDialogVisible=true">
            手动连接WiFi
          </span>
        </el-form-item>
      </div>
    </el-form>
    <el-dialog v-model="centerDialogVisible" title="手动连接WIFI" center :before-close="handleClose">
      <div>
        <el-form
          ref="wifiFormRef"
          :model="wifiForm"
          :rules="wifiRules"
          label-width="auto"
        >
          <el-form-item label="WIFI名称" prop="name">
            <el-input v-model="wifiForm.name" />
          </el-form-item>
          <el-form-item label="WIFI密码" prop="pwd">
            <el-input v-model="wifiForm.pwd" show-password type="password" autocomplete="new-password"/>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleConfirm(wifiFormRef)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const centerDialogVisible=ref(false)
const wifiFormRef=ref()
const wifiRules={
  name: [
    { required: true, message: '请输入wifi名称', trigger: 'blur' },
  ],
  pwd: [
    { required: true, message: '请输入wifi密码', trigger: 'blur' },
  ],
}
const wifiForm=reactive({
  name:'',
  pwd:''
})
const handleClose=()=>{
  centerDialogVisible.value=false
  wifiForm.name='',
  wifiForm.pwd=''
}
const handleConfirm= async (formEl)=>{
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('wifiForm:',wifiForm);
      centerDialogVisible.value=false
    } else {
      console.log('error submit!', fields)
    }
  })
}

const form =reactive({
  type:'ap',
  name:'',
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
.content-box{
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
    .station-box{
      .usable{
        margin-top: 75px;
      }
      .link-wifi{
        color: var(--dc-theme-blue);
        text-decoration: underline;
        font-size: var(--dc-font-size);
        cursor: pointer;
      }
      .wifi-box{
        display: flex;
        align-items: center;
        .svg-wifi{
          height: 24px;
          width: 24px;
          margin-right: 12px;
        }
        .active{
          font-size: var(--dc-font-size);
          color: var(--dc-theme-blue);
        }
        .name{
          font-size: var(--dc-font-size);
        }
        .status{
          margin-left: 8px;
          color: #C9C9C9;
          border: 1px solid #C9C9C9;
          line-height: 16px;
          padding: 1px 4px;
          border-radius: 2px;
        }
      }
    }
  }
  :deep(.el-dialog){
    width: 408px;
    padding: 24px 40px;
    .el-dialog__headerbtn{
      font-size: 20px;
      right: 15px;
      top: 15px;
      .el-dialog__close{
        color:#323233 ;
      }
    }
  }
}

</style>
