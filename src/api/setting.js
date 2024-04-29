import request from "./modules/request";
const baseUrl="/app/v1/system/config"

/**
 * 获取系统时间
 */
export function querySysTime () {
  return request({
    url: `${baseUrl}/system_time`,
    method: "get"
  });
}

/**
 * 修改系统时间
 * @param {String} localDateTime  
 */
export function updateSysTime (localDateTime ) {
  return request({
    url: `${baseUrl}/system_time`,
    method: "put",
    params:{localDateTime }
  });
}

/**
 * 获取站点信息
 */
export function queryStation () {
  return request({
    url: `${baseUrl}/station`,
    method: "get"
  });
}

/**
 * 修改站点信息
 * @param {String} number 
 */
export function updateStation (number) {
  return request({
    url: `${baseUrl}/station`,
    method: "put",
    params:{number}
  });
}

/**
 * 获取阈值信息
 */
export function queryThreshold () {
  return request({
    url: `${baseUrl}/threshold`,
    method: "get"
  });
}

/**
 * 修改站点信息
 * @param {Object} data 
 */
export function updateThreshold (data) {
  return request({
    url: `${baseUrl}/threshold`,
    method: "put",
    data
  });
}

/**
 * 获取NTP信息
 */
export function queryNTP () {
  return request({
    url: `${baseUrl}/ntp`,
    method: "get"
  });
}

/**
 * 修改NTP信息
 * @param {Array} address  
 */
export function updateNTPOld (address) {
  return request({
    url: `${baseUrl}/ntp`,
    method: "put",
    data:address
  });
}

/**
 * 修改NTP信息（新）
 * @param {Object} data  
 */
export function updateNTP (data) {
  return request({
    url: `${baseUrl}`,
    method: "put",
    data
  });
}

/**
 * 获取蜂窝网络信息
 */
export function queryCellular () {
  return request({
    url: `${baseUrl}/cellular`,
    method: "get"
  });
}

/**
 * 修改蜂窝网络信息
 * @param {Object} data  
 */
export function updateCellular (data) {
  return request({
    url: `${baseUrl}/cellular`,
    method: "put",
    data
  });
}

/**
 * 获取以太网信息
 */
export function queryEthernet () {
  return request({
    url: `${baseUrl}/ethernet`,
    method: "get"
  });
}

/**
 * 修改以太网信息
 * @param {Object} data  
 */
export function updateEthernet (data) {
  return request({
    url: `${baseUrl}/ethernet`,
    method: "put",
    data
  });
}