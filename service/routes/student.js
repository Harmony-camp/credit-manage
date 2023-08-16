const router = require('koa-router')()
const utils = require('../utils/utils')
const Student = require("../models/studentSchema")
const Classes = require("../models/classesSchema")

router.prefix('/student')

router.get('/getlist', async (ctx, next) =>{
  console.log('"object" :>> ', "object");
  const {page,limit,keyword}  = ctx.request.query
  ctx.body  = await utils.try_catch(async () =>{
    let res = []
    if(keyword){
      res = await Student.find({Name:{$regex:keyword}}).skip((page-1)*limit).limit(limit)
    }
    else if(limit && page) { 
      res = await Student.find({}).skip((page-1)*limit).limit(limit)
    }else{ 
      const list  = await Student.find({})
      list.map((item) =>{
        let studentItem = {...item}
        delete studentItem._doc.__v
        delete studentItem._doc._id
        delete studentItem._doc.Password
        res.push(studentItem._doc);
      })
    }
    return utils.success(res)
  })
})

router.post('/delete', async (ctx, next) =>{
  const {id}  = ctx.request.body
  console.log('id :>> ', id);
  ctx.body = await utils.try_catch(async () =>{
    await Student.deleteOne({_id:id})
    return  utils.success("",`删除学生成功`)
  })
})

router.post('/create', async (ctx, next) =>{
  const student  = ctx.request.body
  ctx.body =  await utils.try_catch(async()=>{ 
    let res = await Student.findOne({ID:student.ID})
    if(res) return   utils.fail(`检测到数据库中学号"${student.ID}"已存在，请检查是否输入正确的学号`)
    let classesRes = await Classes.findOne({className:student.Classes})
    if(!classesRes) return   utils.fail(`未检测到班级"${student.Classes}"，请检查学生信息是否正确`)
    await Student.create({...student,Password:123456})
    return  utils.success("",`添加学生"${student.Name}"成功`)
  })
})

module.exports = router
