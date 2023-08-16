import {createStore} from 'vuex'
import { setToken,removeToken } from '../utils/auth'
import {login,logout} from '~/api/user'
import { useCookies } from "@vueuse/integrations/useCookies";
import {menus} from '~/constants/menus'
import storage from '~/utils/storage';
import {router} from '~/router'

const cookies = useCookies()
const store = createStore({
  state(){
    return {
      asideWidth: '250px',
      role:0,
      userinfo:{},
      pathActive:"/index"
    }
  },
  mutations:{
    handleAsideWidth(state){ //展开/收起侧边
      state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
    },
    SET_USERINFO_STATE(state,userinfo){
      state.userinfo = userinfo
    },
    SET_PATH_ACTIVE_STATE(state,path){
      state.pathActive = path
    }
  },
  actions:{
    login({commit},params){
      return new Promise((resolve, reject) => {
        login(params).then(res=>{
          setToken(res.token)
          storage.setItem("menus",menus.filter((item)=>item.role.includes(res.role)))
          storage.setItem("userinfo",res)
          commit('SET_USERINFO_STATE',res)
          resolve(res)
        }).catch(err=>{
          console.log('err :>> ', err);
          reject(err)
        })
      })
    },
    logout({commit}){
      removeToken()
      commit('SET_USERINFO_STATE',{})
      storage.clearAll()
      cookies.remove("tabList")
      cookies.remove("TokenKey")
      router.push('/login')
    }
  }
})

export default store;