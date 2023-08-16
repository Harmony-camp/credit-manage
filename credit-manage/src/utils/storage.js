/**
 * Storage二次封装
 * @author yyy
 */
import {creditManagment} from "~/constants/namespace"

export default{
  setItem(key,val){
    let storage = this.getStorage()
    storage[key] = val
    window.localStorage.setItem(creditManagment,JSON.stringify(storage))
  },
  getItem(key){
    return this.getStorage()[key]
  },
  getStorage(){
    return JSON.parse( window.localStorage.getItem(creditManagment )|| "{}")
  },
  clearItem(key){
    let storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(creditManagment,JSON.stringify(storage))
  },
  clearAll(){
    window.localStorage.clear()
  },
}