/**
 * @description Blob 文件转 Json
 * @param {Blob} blob 传入Blob文件流
 * @returns 如果文件流能解析成 Json，就返回 Json，否则则认定为文件，返回 false
 */
export function blobToText(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsText(blob)
    fileReader.onload = function () {
      try {
        const result = JSON.parse(this.result)
        if (result && result['code'] === 500) {
          resolve(result)
        } else {
          resolve(false)
        }
      } catch (e) {
        resolve(false)
      }
    }
  })
}

// 防抖
let timer = null
export function debounce (fn, delay = 1000){
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(this, arguments)
    }, delay)
  }
}