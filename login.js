const express =require('express')
const router=express.Router()
const bodyParser = require('body-parser')
const handleSql=require('./sql')
// 创建application/json 解析器
var jsonParser = bodyParser.json()

// 创建 application/x-www-form-urlencoded 解析器
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/',jsonParser,(req,res,next)=>{
    let account =req.body.account
    let password=req.body.password
    let _sql=`SELECT * FROM user where account="${account}" and password="${password}"`
    handleSql(_sql).then(response=>{
        if(response.length>0){
            res.json({code:0,message:'登录成功',data:response[0]})
        }else{
            res.json({code:-1,message:'账号或密码错误'})
        }
    })
    // res.json(req.body)
})
module.exports=router