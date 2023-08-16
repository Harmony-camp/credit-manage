const router = require('koa-router')()
const utils = require('../utils/utils')
const Teachers = require("../models/teachersSchema")
const Department = require("../models/departmentSchema")

router.prefix('/teachers')

router.get('/list', async (ctx, next) =>{
  const {page,limit,keyword}  = ctx.request.query
  ctx.body  = await utils.try_catch(async () =>{
    let res
    if(keyword){
      res = await Teachers.find({Name:{$regex:keyword}}).skip((page-1)*limit).limit(limit)
    }
    else if(limit && page) { 
      res = await Teachers.find({}).skip((page-1)*limit).limit(limit)
    }else res = await Teachers.find({})
    return utils.success(res)
  })
})

router.post('/create', async (ctx,next) => {
  const teacher =  ctx.request.body
  ctx.body = await utils.try_catch(async()=>{
    let ID = await Teachers.findOne({ID:teacher.ID})
    if(ID) return utils.fail(`检测到工号"${teacher.ID}"已存在，创建失败`)
    let department = await Department.findOne({Department:teacher.Department})
    if(!department) return utils.fail(`检测到"${teacher.Department}"不存在，创建失败`)
    await Teachers.create(teacher)
    return utils.success("", `创建"${teacher.Name}"成功,职称为"${teacher.Title}"`)
  })
})


module.exports = router