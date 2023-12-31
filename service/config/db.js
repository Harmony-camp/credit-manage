const mongoose = require('mongoose')
const log4js = require("../utils/log4j");

mongoose.connect("mongodb://localhost:27017/credits");

const db = mongoose.connection;
db.on("error",()=>{
  log4js.error("*****数据库连接失败*****")
})

db.once("open",()=>{
  log4js.info("*****数据库连接成功*****")
})