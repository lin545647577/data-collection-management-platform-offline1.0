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
 */
export function queryTableData () {
  return request({
    url: `${baseUrl}/data/realtime`,
    method: "get",
  });
}