/**
 * @file 请求方法封装
 */

import axios from 'axios'
import { ElMessage  } from 'element-plus'
import { getAuthToken, removeAuthToken } from "@/cookie/auth";
import { blobToText } from '@/utils/util.js'

let timer = null

const debounce = (fn, delay = 1000) => {
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(this, arguments)
    }, delay)
  }
}

const err = (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
    const errData = {
      code: err.response.status,
      message: err.message
    }
    // 统一错误处理可以放这，例如页面提示错误...
    console.log('统一错误处理: ', errData)
    ElMessage.error(err.message || 'Error')
  }

  return Promise.reject(err)
}

const request = axios.create({
  // 请求接口的baseUrl
  baseURL: import.meta.env.VITE_BASE_API,
  // 超时时间，单位毫秒
  timeout: 30000,
})

request.interceptors.request.use(async (config) => {
  // Authorization
  if (getAuthToken()) {
    config.headers.Authorization = `Bearer ${getAuthToken()}` ;
  }
  return config
}, err)

request.interceptors.response.use(async (response) => {
  const {
    status,
    data: { message, code }
  } = response
  if (status === 200 && code === 200) {
    return response.data
  } else if (status === 200 && response.config.responseType === 'blob') {
    // 文件流特殊处理
    const blobJson = await blobToText(response.data)
    if (blobJson) {
      debounce(() => {
        ElMessage.error(message || 'Error')
      })()
    } else {
      return response
    }
  } else {
    if (code === 401) {
      // 登录状态失效
      setTimeout(() => {
        // store.dispatch('user/clearLocalCache')
        removeAuthToken();
      }, 1000)
    }
    debounce(() => {
      ElMessage.error(message || 'Error')
    })()

    return Promise.reject(new Error(message || 'Error'))
  }
}, err)

export default request
