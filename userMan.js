const express =require('express')
const router=express.Router()
const bodyParser = require('body-parser')
const handleSql=require('./sql')
// 创建application/json 解析器
var jsonParser = bodyParser.json()

router.get('/list',(req,res,next)=>{
    let sql='SELECT * FROM user'
    handleSql(sql).then(response=>{
        res.json(response)
    })
})
router.post('/add',jsonParser,(req,res,next)=>{
    
})
module.exports=router