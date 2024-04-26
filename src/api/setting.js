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
 * 获取阈值信息
 */
export function queryThreshold () {
  return request({
    url: `${baseUrl}/threshold`,
    method: "get"
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
