import request from "./modules/request";
const baseUrl="/app/v1/alert/page"

/**
 * 预警信息列表
 * @param {Object} params 
 */
export function queryWarningList (params) {
  return request({
    url: `${baseUrl}`,
    method: "get",
    params
  });
}