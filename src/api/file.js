import request from "./modules/request";
const baseUrl="/app/v1/file"

/**
 * 获取文件列表
 * @param {Object} params 
 */
export function queryFileList (params) {
    return request({
      url: `${baseUrl}`,
      method: "get",
      params
    });
}

/**
 * 下载
 * @param {String} path 路径
 */
export function download (path) {
    return request({
      url: `${baseUrl}/download`,
      method: "post",
      params:{path},
      responseType: 'blob',
    });
}

/**
 * 批量下载
 * @param {Array} path 文件名
 */
export function mulDownload (path) {
  return request({
    url: `${baseUrl}/download/batch`,
    method: "post",
    data:path,
    responseType: 'blob',
  });
}

/**
 * post 文件流 请求
 *
 * @param {string} url 请求地址
 * @param {string} params 请求参数
 * @returns {Object}
 */
export function postFileByUrl(url, params = {}) {
  const data = new FormData()
  Object.keys(params).forEach((key) => {
    data.append(key, params[key])
  })
  return request({
    url,
    method: 'post',
    data,
    responseType: 'blob',
    loadingStatusDom
  })
}