import request from "./modules/request";
const baseUrl="/uaa/oauth"
import cryptoJs from 'crypto-js'

/**
 * 登录
 * @param {Object} requestData
 */
export function login (requestData) {
  const {VITE_APP_SECRET,VITE_APP_KEY,VITE_PWD_KEY} = import.meta.env
  const passwordAes = cryptoJs.AES.encrypt(cryptoJs.enc.Utf8.parse(requestData.password), cryptoJs.enc.Utf8.parse(VITE_PWD_KEY), {
    mode: cryptoJs.mode.ECB,
    padding: cryptoJs.pad.Pkcs7
  }).toString()
  const appSecretAes = cryptoJs.AES.encrypt(cryptoJs.enc.Utf8.parse(VITE_APP_SECRET), cryptoJs.enc.Utf8.parse(VITE_PWD_KEY), {
    mode: cryptoJs.mode.ECB,
    padding: cryptoJs.pad.Pkcs7
  }).toString()
  const data={
    appKey:VITE_APP_KEY,
    appSecret: appSecretAes,
    password: passwordAes,
    username: requestData.username
  }
  return request({
    url: `${baseUrl}/username/token`,
    method: "post",
    data:data,
  });
}