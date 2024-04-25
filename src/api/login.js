import request from "./modules/request";
const baseUrl="/app/v1/auth"

/**
 * 登录
 * @param {Object} data
 */
export function login (data) {
  return request({
    url: `${baseUrl}/login`,
    method: "post",
    params:data,
  });
}

/**
 * 登录注销
 */
export function logout () {
  return request({
    url: `${baseUrl}/logout`,
    method: "post"
  });
}