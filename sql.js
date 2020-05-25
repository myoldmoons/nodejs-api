const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'node_js'
  });
connection.connect();
  //操作数据库
    const handleSql=(sql,sqlParams)=>{
        return new Promise((resolve,reject)=>{
            connection.query(sql,sqlParams,function (err, result) {
                if(err){
                    reject(err.message)
                }else{
                    resolve(result)
                }   
            });
        })
    }
module.exports= handleSql
  