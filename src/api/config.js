import request from "./modules/request";
const baseUrl="/app/v1/configs"

/**
 * 获取配置文件列表
 * @param {Object} params 
 */
export function queryConfigList (params) {
  return request({
    url: `${baseUrl}/page`,
    method: "get",
    params
  });
}

/**
 * 查询数采模块状态
 */
export function queryStatus () {
  return request({
    url: `/app/v1/system/logger/status`,
    method: "get",
  });
}

/**
 * 启动数采模块
 */
export function turnOn () {
  return request({
    url: `/app/v1/system/logger/start`,
    method: "post",
  });
}

/**
 * 停止数采模块
 */
export function turnOff () {
  return request({
    url: `/app/v1/system/logger/stop`,
    method: "post",
  });
}

/**
 * 激活配置文件
 * @param {String} id  
 */
export function activateConfig (id) {
  return request({
    url: `${baseUrl}/activate`,
    method: "post",
    params:{id}
  });
}

/**
 * 下载配置文件
 * @param {String} id  
 */
export function downloadConfig (id) {
  return request({
    url: `${baseUrl}/download/${id}`,
    method: "post",
    responseType: 'blob',
  });
}

/**
 * 删除配置文件
 * @param {String} id  
 */
export function deleteConfig (id) {
  return request({
    url: `${baseUrl}/${id}`,
    method: "delete",
  });
}

/**
 * 导入配置文件
 * @param {Object} data  
 */
export function uploadConfig (data) {
  return request({
    url: `${baseUrl}/upload`,
    method: "post",
    params:{activate:false},
    data,
    responseType: 'blob',
  });
}