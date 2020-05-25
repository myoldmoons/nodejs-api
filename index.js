const express = require('express');
const app = express();
const path =require('path')
const cors = require('cors');
const handleSql = require('./sql')
const login =require('./login')
const userMan =require('./userMan')
app.use(cors({
    origin:['http://192.168.11.53:8085'],
    methods:['GET','POST','OPTIONS'],
    alloweHeaders:['Conten-Type', 'Authorization']
}));
app.use('/login',login)
app.use('/user',userMan)

//  get
app.get('/list',(req,res)=>{
    let  sql = 'SELECT * FROM user';
    handleSql(sql).then(response=>{
        res.json(response)
    })
});
// post
app.post('/list/add',(req,res)=>{
    var body = '';     
    req.on('data', chunk=>{    
        body+=chunk;
    });
    req.on('end', ()=>{
        body=JSON.parse(body)
        if(body.id){
            var  addSql = 'UPDATE user SET name = ?,age = ?,six = ? WHERE Id = ?';
            var  addSqlParams = [body.name ,body.age, body.six,body.id];
        }
        else{
            var  addSql = 'INSERT INTO user(name,age,six) VALUES(?,?,?)';
            var  addSqlParams = [body.name ,body.age, body.six];
        }
        handleSql(addSql,addSqlParams).then(response=>{
            res.json({message:'添加成功'})
        })
    });
})

// del
app.post('/list/del',(req,res)=>{
    var body=''
    req.on('data',chunk=>{
        body+=chunk
    })
    req.on('end', ()=>{
        body=JSON.parse(body)
        let delSql=`DELETE FROM user where id=${body.id}`
        let getSql=`SELECT * FROM user where id=${body.id}`
        handleSql(getSql).then(response=>{
            if(response.length!==0){
                handleSql(delSql).then(response=>{
                    res.json({message:'删除成功'})
                })
            }else{
                res.json({message:'数据不存在,删除失败'})
            }
        })
    });
})

var server = app.listen(3000,  ()=> {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
  })