const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.用户注册
router.get('/reg',function(req,res){
    //获取get请求的数据
	var obj=req.query;
	//检测值是否为空
	if(!obj.uname){
	   res.send({code:401,msg:'uname require'});
	   return;
	}
	if(!obj.upwd){
	   res.send({code:402,msg:'upwd require'});
	   return;
	}
	if(!obj.phone){
	   res.send({code:403,msg:'phone require'});
	   return;
	}
	if(!obj.email){
	   res.send({code:404,msg:'email require'});
	   return;
	}
	//console.log(obj);
	//执行sql语句
	pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result){
	   if(err)throw err;
		   console.log(result);
		   //判断是否成功
	   if(result.affectedRows>0){
	      res.send({
		     code:200,msg:'regsuc'
		  });
	   }
	})
});
//2.用户登录
//post /login
router.post('/login',function(req,res){
	var obj=req.body;
	console.log(obj);
	//验证数据是否为空401  402
    if(!obj.uname){
	   res.send({code:401,msg:'uname require'});
	   return;
	}
	if(!obj.upwd){
	   res.send({code:402,msg:'upwd require'});
	   return;
	}
	//执行SQL语句
	//查询用户表中是否含有用户名和密码同时匹配的
	//数据
	pool.query('SELECT*FROM xz_user WHERE uname=?AND upwd=?'
	,[obj.uname,obj.upwd],function(err,result){
	   if(err)throw err;
	   //console.log(result);
	   //判断数组的长度是否大于0
	   if(result.length>0){
	       res.send({
		      code:200,msg:'login suc'
		   });
	   }else{
	      res.send({
		      code:301,msg:'login err'
		  })
	   }
	});
});
//3.修改用户
//get  /update
router.get('/update',function(req,res){
   //获取get请求数据
   //验证数据是否为空
   //执行SQL语句，修改数据
   var obj=req.query;
   var n=400;
  //遍历对象属性，获取所有属性
  for(var key in obj){
	  n++;
     //console.log(key,obj[key]);
	 //判断属性值是否为空
	 if(!obj[key]){
	    res.send({
		   code:n,msg:key+'required'
		});
		return;
	 }
  }
	pool.query('UPDATE xz_user SET phone=?,email=?,user_name=?,gender=? WHERE uid=?',
		[obj.phone,obj.email,obj.user_name,obj.gender,obj.uid],function(err,result){
	     if(err)throw err;
		 //console.log(result);
		 //判断是否修改成功
		 if(result.affectedRows>0){
		    res.send({
			  code:200,msg:'update suc'
			})
		 }else{
			   res.send({
			      code:301,msg:'update err'
			   })
			}
	});
});
//4.用户检索
//获取数据；验证是否为空；执行SQL语句，把result响应到浏览器
router.get('/detail',function(req,res){
  var obj=req.query;
  if(!obj.uid){
    res.send({
	  code:401,msg:'uid required' 
	});
	  return;
  }
  pool.query('SELECT * FROM	xz_user	WHERE uid=?',
	  [obj.uid],function(err,result){
      if(err) throw err;
	  res.send(result);
  });
});
//5.用户列表
//获取get数据；如页码为空，设置默认值1；如大小为空，设置默认值3
router.get('/list',function(req,res){
   var obj=req.query;
   if(!obj.pno) obj.pno=1;
   if(!obj.count) obj.count=3;
   //将传递的值转为整型
   obj.pno=parseInt(obj.pno);
   obj.count=parseInt(obj.count);
   //计算开始查询的值
   var start=(obj.pno-1)*obj.count;
   //执行SQL语句
   pool.query('SELECT * FROM xz_user LIMIT ?,?',
	   [start,obj.count],function(err,result){
       if(err) throw err;
	   res.send(result);
   })
});
//6.删除用户
router.get('/delete',function(req,res){
	//获取get数据
    var obj=req.query;
    if(!obj.uid){
	  res.send({code:401,msg:'uid required'});
	  return;
	}
	//执行SQL语句
	pool.query('DELETE FROM xz_user WHERE uid=?',
		[obj.uid],function(err,result){
	     if(err) throw err;
		 //console.log(result);
		 if(result.affectedRows>0){
		   res.send({code:200,msg:'delete suc'});
		 }else{
		   res.send({code:301,msg:'delete err'});
		 }
	});
});
//7.




//导出路由器对象
module.exports=router;





