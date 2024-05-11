import request from "./modules/request";
const baseUrl="/app/v1/system"

/**
 * 获取系统资源使用情况
 */
export function querySystemInfo () {
  return request({
    url: `${baseUrl}`,
    method: "get",
  });
}

/**
 * 获取WiFi AP配置
 */
export function queryAPInfo() {
  return request({
    url: `${baseUrl}/config/wifi/ap/config`,
    method: "get",
  });
}

/**
 * WiFi_AP 开启AP模式
 * @param {Object} data 
 */
export function turnOnWifiAp(data) {
  return request({
    url: `${baseUrl}/wifi/ap/start`,
    method: "post",
    data
  });
}

/**
 * WiFi_AP 关闭AP模式
 */
export function closeWifiAp() {
  return request({
    url: `${baseUrl}/wifi/ap/stop`,
    method: "post",
  });
}

/**
 * 查询WiFi_AP 状态
 * @param {Object}  
 */
export function checkWifiApStatus() {
  return request({
    url: `${baseUrl}/wifi/ap/status`,
    method: "get",
  });
}

/**
 * 获取WiFi_Station 已连接的网络列表
 */
export function queryWifiLinked() {
  return request({
    url: `${baseUrl}/wifi/sta/network`,
    method: "get",
  });
}

/**
 * 扫描可用wifi网络
 */
export function queryWifiList() {
  return request({
    url: `${baseUrl}/wifi/sta/scan`,
    method: "get",
  });
}

/**
 * 连接wifi
 * @param {Object} data 
 */
export function connectWifi(params) {
  return request({
    url: `${baseUrl}/wifi/sta/network`,
    method: "post",
    params
  });
}

/**
 * 切换已保存的wifi(WiFi_Station 选择已连接网络（会禁用其他已连接网络）)
 * @param {String} networkId  
 */
export function changeWifi(networkId ) {
  return request({
    url: `${baseUrl}/wifi/sta/network`,
    method: "put",
    params:{networkId}
  });
}

/**
 * WiFi 关闭station模式
 */
export function closeWifiStation() {
  return request({
    url: `${baseUrl}/wifi/sta/stop`,
    method: "post",
  });
}

/**
 * WiFi 开启station模式
 */
export function turnOnWifiStation() {
  return request({
    url: `${baseUrl}/wifi/sta/start`,
    method: "post",
  });
}

/**
 * 查看WiFiStation状态
 */
export function checkStationStatus() {
  return request({
    url: `${baseUrl}/wifi/sta/status`,
    method: "get",
  });
}