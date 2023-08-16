const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const log4js = require('./utils/log4j')
const cors = require('koa2-cors')
const jwt = require('koa-jwt')
const utils = require('./utils/utils')

//路由
const index = require('./routes/index')
const users = require('./routes/users')
const student = require('./routes/student')
const teachers = require('./routes/teachers')

// error handler
onerror(app)

require("./config/db")

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(cors());

app.use(require('koa-static')(__dirname + '/public'))
app.use(async (ctx, next) => {
  
  log4js.info(`get params:${JSON.stringify(ctx.request.query)}`)
  log4js.info(`post params:${JSON.stringify( ctx.request.body)}`)
  
  await next().catch(err=>{
    if(err.status == '401'){
      ctx.status = 200
      ctx.body = utils.fail("Token认证失败,请从新登录",utils.CODE.AUTH_ERROR)
    }else throw err
  })
})

app.use(jwt({secret:"key"}).unless({
  path:[/^\/users\/login/]
}))


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(student.routes(), student.allowedMethods())
app.use(teachers.routes(), teachers.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  log4js.error(err.stack)
});

module.exports = app
