import request from "./modules/request";
const baseUrl="/app/v1/dashboard"

/**
 * 获取报文信息
 */
export function queryMessage () {
  return request({
    url: `${baseUrl}/message`,
    method: "get",
  });
}

/**
 * 获取实时数据
 * @param {Array} elements 要素id
 */
export function queryTableData (elements) {
  return request({
    url: `${baseUrl}/data/realtime`,
    method: "get",
    params:{elements}
  });
}

/**
 * 获取历史数据
 * @param {Object} params 
 */
export function queryHistoryList (params) {
  return request({
    url: `${baseUrl}/data/history`,
    method: "get",
    params
  });
}

/**
 * 获取激活配置文件树形要素列表
 */
export function queryElements () {
  return request({
    url: `/app/v1/configs/activate/element/tree`,
    method: "get",
    params:{excludeGlobal:true}
  });
}