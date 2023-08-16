const jwt = require("jsonwebtoken");
const log4j = require("./log4j");
// const nodemail = require("nodemailer");


const CODE = {
  SUCCESS: 200,
  PARAM_ERROR: 10001, //参数错误
  USER_ACCOUNT_ERROR: 20001, //账号或密码错误
  USER_LOGIN_ERROR: 30001, // 用户未登录
  BUSINESS_ERROR: 40001, //业务请求失败
  AUTH_ERROR: 50001, //认证失败或TOKEN过期
}

module.exports = {
  success(data = null, msg = null, code = CODE.SUCCESS) {
    return { data, msg, code }
  },
  fail(msg = "", code = CODE.BUSINESS_ERROR) {
    return { code, msg }
  },
  decoded(authorization) {
    if (authorization) {
      let token = authorization.split(" ")[1]
      return jwt.verify(token, "key")
    }
    return ""
  },
  CODE,

  /**
   * 解密函数
   * @param str 待解密字符串
   * @returns {string}
   */
  str_decrypt(str) {
    str = decodeURIComponent(str);
    var c = String.fromCharCode(str.charCodeAt(0) - str.length);

    for (var i = 1; i < str.length; i++) {
      c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
  },
  try_catch(fn) {
    try {
      return fn()
    } catch (e) {
      log4j.error(e)
      return  this.fail("发生未知错误，请联系管理员")
    }
  }
}