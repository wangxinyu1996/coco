//引入mysql
const mysql=require('mysql');
//创建连接池对象
var pool=mysql.createPool({
   host:'127.0.0.1',
   pory:'3306',
   user:'root',
   password:'',
   database:'xz',
   connnectionLimit:20
});
//导出连接池对象
module.exports=pool;

















