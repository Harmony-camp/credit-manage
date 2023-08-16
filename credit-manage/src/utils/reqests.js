import axios from 'axios';
import { toast } from './utils';
import { getToken } from './auth';
import store from '~/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: 5000,
})


service.interceptors.request.use(
  config => {
    const token = getToken();
    if(!config.headers.Authorization) config.headers.Authorization = "Bearer "  + token
    return config;
  })

service.interceptors.response.use(
  response => {
    const { code, data, msg } = response.data;
    if (code === 200) {
      if(msg)  toast(msg);
      return data;
    }else if (code ===50001){
      console.log('code :>> ', code);
      toast(msg || "token认证失败，请从新登录",'error');
      store.dispatch("logout")
      return Promise.reject(new "token认证失败，请从新登录")
    }else if(code === 40001){
      toast(msg || "业务请求失败",'error');
      return Promise.reject(msg || "业务请求失败")
    }
    else{
      toast(msg || "系统异常",'error');
      return Promise.reject(msg || "系统异常")
    }
  },err=>{
    toast("服务器错误，请联系管理员",'error');
    return Promise.reject(err)
  })

function request(options) {
  options.method = options.method || 'GET';
  if (options.method.toLowerCase() === 'get') options.params = options.data
  return service(options);
}

['get', 'post', 'put', 'delete', 'patch'].forEach(item => {
  request[item] = (url, data, options) => {
    return request({
      url,
      method: item,
      data,
      ...options
    })
  }
})

export default request;