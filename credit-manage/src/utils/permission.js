import {router} from '../router';
import { getToken } from './auth';
import { toast,showFullLoading,hideFullLoading } from './utils';
import store from '~/store';


router.beforeEach(async (to,form,next)=> {
  showFullLoading();
  const token = getToken();
  if(!token && to.path != '/login'){
    toast("请先登录",'error')
    return next({path: '/login'});
  }
  if(token && to.path == '/login'){
    toast("请勿从新登录",'error')
    return next({path:form.path ? form.path : '/'});
  }

  let title = (to.meta.title ? to.meta.title :"") + "-系统后台"
  document.title = title;
  next();
})

router.afterEach(()=>{
  hideFullLoading();
})