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