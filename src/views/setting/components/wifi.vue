<template>
  <div class="content-box">
    <el-form
      ref="ruleFormRef"
      :model="form"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-form-item label="WIFI模式：" prop="type">
        <el-radio-group v-model="form.type" @change="handleChangeType">
          <el-radio :value="1">
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
          <el-radio :value="2">
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
      <div v-show="form.type==1">
        <el-form-item label="WIFI名称：" prop="name" :rules="{
          required: true,
          message: '请输入WIFI名称',
          trigger: 'blur',
        }">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="WIFI密码：" prop="password" :rules="[{required: true,message: '请输入WIFI密码',trigger: 'blur'},
          { min: 8, message: '密码长度不能小于8', trigger: 'blur' }
        ]">
          <el-input v-model="form.password" show-password type="password" autocomplete="new-password"/>
        </el-form-item>
        <el-form-item label="网关：" prop="gateway" :rules="{
          required: true,
          message: '请输入网关IP地址',
          trigger: 'blur',
        }">
          <el-input v-model="form.gateway"/>
        </el-form-item>
        <el-form-item label="主DNS服务器：">
          <el-input v-model="form.preferredDns"/>
        </el-form-item>
        <el-form-item label="备DNS服务器：">
          <el-input v-model="form.alternateDns"/>
        </el-form-item>
        <el-form-item v-if="!wifiStation.isAPMode">
          <el-button v-loading="saveLoading" :disabled="saveLoading" type="primary" class="btn" @click="submitForm(ruleFormRef)">
            保存
          </el-button>
        </el-form-item>
      </div>
      <div class="station-box" v-show="form.type==2">
        <el-form-item label="已连接WIFI：">
          <div class="wifi-box" v-if="wifiStation.stationInfo.ssid">
            <svg class="svg-wifi">
              <use xlink:href="#icon-wifi-active"></use>
            </svg>
            <span class="active">
              {{wifiStation.stationInfo.ssid}}
            </span>
            <span class="status">
              加密
            </span>
          </div>
        </el-form-item>
        <el-form-item :label="index==0?'可用WIFI：':' '" :class="index==0?'usable':''" v-for="(item,index) in wifiStation.linkedList" :key="item.bssid">
          <div class="wifi-box" style="cursor: pointer;" @click="handleChangeWifi(item.id)">
            <svg class="svg-wifi">
              <!-- <use :xlink:href="setSignalIcon(item.signal)"></use> -->
              <use xlink:href="#icon-wifi-strong"></use>
            </svg>
            <span class="name">
              {{ item.ssid }}
            </span>
            <span class="status">
              加密
            </span>
          </div>
        </el-form-item>
        <el-form-item label=" ">
          <span class="link-wifi" @click="handleLink">
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
          <el-form-item label="WIFI名称" prop="ssid">
            <el-select
              v-model="wifiForm.ssid"
              filterable
              placeholder="请输入或选择WIFI名称"
            >
              <el-option
                v-for="item in wifiStation.scanList"
                @click="handleChoosed(item)"
                :key="item.bssid"
                :label="item.ssid"
                :value="item.ssid"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="WIFI密码" prop="passphrase">
            <el-input v-model="wifiForm.passphrase" show-password type="password" autocomplete="new-password" placeholder="请输入WIFI密码"/>
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
import { ref, reactive, onBeforeMount, watchEffect } from 'vue'
import {queryWifiLinked,queryWifiList,turnOnWifiStation,checkStationStatus,
  checkWifiApStatus,closeWifiStation,changeWifi,closeWifiAp,turnOnWifiAp,queryAPInfo,connectWifi } from '@/api/system'
import { ElMessage } from 'element-plus'
const props=defineProps(['type'])
const wifiStation=reactive({
  linkedList:[],  //已连接过
  scanList:[],     //附近可连wifi
  stationInfo:{},  //当前wifi信息
  isStationMode:false, //当前是否为station模式
  isAPMode:false //当前是否为ap模式
})
const setSignalIcon=(val)=>{
  let str='#icon-wifi-nomal'
  if(val) val=Math.abs(val)
  if(val>66){
    str='#icon-wifi-strong'
  }else if(val>33){
    str='#icon-wifi-nomal'
  }else{
    str='#icon-wifi-weak'
  }
  return str
}
const handleChangeWifi=(id)=>{
  changeWifi(id).then(res=>{
    ElMessage.success('连接成功')
    initWifiLinked()
  })
}
const handleLink=()=>{
  centerDialogVisible.value=true
  initWifiList()
}
const initWifiLinked=()=>{
  queryWifiLinked().then(res=>{
    const tempList=res.payload||[]
    wifiStation.linkedList=(tempList).filter(item=>item.disabled==1)
    if(tempList.length) {
      wifiStation.stationInfo=(tempList).filter(item=>item.disabled==0)[0]
      wifiStation.stationInfo.ssid=wifiStation.stationInfo.ssid.replaceAll('\"','')
    }
  })
}
const initWifiList=()=>{
  queryWifiList().then(res=>{
    // console.log('initWifiList',res.payload);
    wifiStation.scanList=(res.payload||[]).filter(item=>item.bssid)
  })
}
const turnOnstationWifi=()=>{
  turnOnWifiStation().then(res=>{
    ElMessage.success('wifi开启station模式成功')
    wifiStation.isStationMode=true
    checkStation()
  })
}
const closeStationWifi=()=>{
  closeWifiStation().then(res=>{
    // console.log(res);
    wifiStation.linkedList=[]   //重置已连接过
    wifiStation.scanList=[]     //重置可用连接
    wifiStation.stationInfo={}  //重置当前wifi信息
    wifiStation.isStationMode=false
    ElMessage.success('wifi已关闭station模式')
  })
}
// 手动开启WiFi后获取当前wifi信息并初始化可用WiFilist
const checkStation=()=>{
  checkStationStatus().then(res=>{
    if(res.payload && res.payload.runState){
      initWifiLinked()
    }
  })
}
const turnOffAp=()=>{
  closeWifiAp().then(res=>{
    // console.log('turnOffAp',res);
    wifiStation.isAPMode=false
    ElMessage.success('wifi已关闭AP模式')
  })
}
const initApInfo=()=>{
  queryAPInfo().then(res=>{
    // console.log('initApInfo',res);
    const data=res.payload
    form.alternateDns=data.alternateDns
    form.gateway=data.gateway
    form.name=data.name
    form.password=data.password
    form.preferredDns=data.preferredDns
  })
}
const handleChangeType=async (val)=>{
  // console.log('handleChangeType',val);
  if(val==2 && !wifiStation.isStationMode){
    wifiStation.isAPMode && await turnOffAp()
    await turnOnstationWifi()
  }
}
const initWifiType=async ()=>{
  const apRes = await checkWifiApStatus()
  if(apRes.payload && apRes.payload.runState){
    form.type=1
    wifiStation.isStationMode=false
    wifiStation.isAPMode=true
    initApInfo()
    return
  }
  const stationRes= await checkStationStatus()
  if(stationRes.payload && stationRes.payload.runState){
    form.type=2
    wifiStation.isStationMode=true
    wifiStation.isAPMode=false
    initWifiLinked()
  }
}
const centerDialogVisible=ref(false)
const wifiFormRef=ref()
const wifiRules={
  ssid: [
    { required: true, message: '请输入或选择wifi名称', trigger: 'blur' },
  ],
  passphrase: [
    { required: true, message: '请输入wifi密码', trigger: 'blur' },
  ],
}
const wifiForm=reactive({
  ssid:'',
  passphrase:'',
  bssid:''
})
const handleClose=()=>{
  centerDialogVisible.value=false
  wifiForm.name='',
  wifiForm.pwd=''
  wifiStation.scanList=[]
}
const handleChoosed=(item)=>{
  // console.log('handleChoosed',item);
  wifiForm.bssid=item.bssid
}
const handleConfirm= async (formEl)=>{
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log('wifiForm:',wifiForm);
      connectWifi(wifiForm).then(res=>{
        if(res.payload){
          ElMessage.success('连接成功')
          wifiForm.bssid=''
          wifiForm.ssid=''
          wifiForm.passphrase=''
          initWifiLinked()
          centerDialogVisible.value=false
        }else{
          ElMessage.error('密码不正确')
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const form =reactive({
  type:'',
  name:'',
  password:'',
  alternateDns:'',
  gateway:'',
  preferredDns:''
})
const ruleFormRef = ref()
const saveLoading=ref(false)
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        saveLoading.value=true
        if(wifiStation.isStationMode) await closeStationWifi()
        const res= await turnOnWifiAp(form)
        // console.log('turnOnAp',res);
        ElMessage.success('wifi开启AP模式成功')
        saveLoading.value=false
        wifiStation.isAPMode=true
      } catch (error) {
        console.log(error.message);
        // ElMessage.success('wifi开启AP模式失败',error.message)
        saveLoading.value=false
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
onBeforeMount(()=>{
  initWifiType()
})
// watchEffect(()=>{
//   form.type=props.type
// })
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
          display: inline-block;
          font-size: var(--dc-font-size);
          width: 45px;
          text-align: center;
          box-sizing: border-box;
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
