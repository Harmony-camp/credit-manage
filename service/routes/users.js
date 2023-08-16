const router = require('koa-router')()
const utils = require('../utils/utils')
const jwt = require("jsonwebtoken")

const ClassesSchema = require("../models/classesSchema")
const DepartmentSchema = require("../models/departmentSchema")
const Student = require("../models/studentSchema")

router.prefix('/users')


router.post('/login', async (ctx) =>{
  const {username,password,role} = ctx.request.body
  const decodePassword = utils.str_decrypt(password)
  ctx.body = await utils.try_catch(async() =>{
    let res
    switch (role){
      case 1:
        res = await Student.findOne({ID: username, Password: decodePassword})
        break;
      case 2:
        
        break;
      case 3:
        res =  true
        break;
    }
    if (res){
      const token = jwt.sign({userid:res._id,role},"key",{expiresIn:"10h"})
      
      const userinfo = {...res._doc,token:token,role}
      delete userinfo.Password
      return utils.success(userinfo,"登录成功")
    }
    else return  utils.fail("用户名或密码错误")
  })
})



router.post('/logout',  (ctx) =>{
  const { userid } = ctx.request.body

  ctx.body = utils.success("","退出成功")
})

router.get("/classes",async ctx =>{
  ctx.body = await utils.try_catch(async()=>{
    let classes = await ClassesSchema.find()
    return utils.success(classes)
  })
})

router.get("/department",async ctx =>{
  ctx.body = await utils.try_catch(async()=>{
    let department = await DepartmentSchema.find()
    return utils.success(department)
  })
})


router.post("/addClasses",async ctx =>{
  const {className,role}  = ctx.request.body
  
  ctx.body = await utils.try_catch(async()=>{
    if(role !== 3) return utils.fail("当前用户没有权限添加")
    await ClassesSchema.create({className})
    return utils.success("",`添加班级"${className}"成功`)
  })
})


module.exports = router
