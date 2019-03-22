var express = require('express');
var bodyparser = require('body-parser');
var expressjwt = require('express-jwt');
var mysql = require('mysql');
var app = express();
var cors = require('cors');
const jwt = require('jsonwebtoken');
var cookieparser = require('cookie-parser');
const secret = "HospitalRun";
const port = 3000;

app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(cookieparser());

/*  Mysql Configuration */

var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : 'localhost',
  user            : 'root',
  password        : '123456',
  database        : 'hospitalrun'
});


const Roles={

  Admin:"Admin",
  Receptionist:"Receptionist",
  Nurse:"Nurse",
  Doctor:"Doctor"

}



app.post('/createsuperadmin',function(req,res){

var name  = req.body.fullname;
var password = req.body.password;
var email = req.body.email;
var telephone = req.body.telephone;


var sqlquery = "Insert into usertable(name,password,email,telephone,role) values ('"+name+"','"+password+"','"+email+"','"+telephone+"','Admin')" ;
console.log(pool);
pool.getConnection(function(err,connection){

	if(err) 
		res.send("Problem in connecting with database . Try later");
	connection.query(sqlquery,function(err,result){
	if(err)
		res.send(err);
	res.send("User created");

	});

 });


});






app.post('/loginuser',function(req,res){

  var username = req.body.username;
  var password = req.body.password;
  var roles = req.body.role;

  var sqlquery = "select user_id,password from usertable where name='"+username+"' and role='"+roles+"'";
 

  pool.getConnection(function(err,connection){
  if(err) 
     console.log('ABC');	
  connection.query(sqlquery,function(err,result){
   		if(err)
      		res.send("Username or password are wrong");
      	if(result.length == 0)
      		res.send("abc");
      	
   		 var returnpassword = result[0].password;
   		 var userid = result[0].user_id;
  
   		 if (returnpassword == password){
   		 	 var token = jwt.sign({userid:userid,username:username,role:roles}, secret);
   		 	 res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
      
   		 }    
   		
   		
});

 });

});


app.get('/getalluser',authorize(Roles.Admin),function(req,res){



var sqlquery = "select * from superadmin";
pool.getConnection(function(err,connection){
	if(err)
      res.send("Unable to connect");
    connection.query(sqlquery,function(err,result){
    	if(!err)
    		res.send(result);

		});


	});

});



function authorize(roles = []){

	if (typeof roles === 'string') {
        roles = [roles];
    }



	return[
		expressjwt({secret}),
		(req,res,next)=>{
   			if(roles.length && !roles.includes(req.user.role)){
   				
			res.send("Unauthorized");
   		}
	next();

}
];

}


app.post('/createuser',authorize(Roles.Admin),function(req,res){

var name  = req.body.fullname;
var password = req.body.password;
var email = req.body.email;
var telephone = req.body.telephone;
var role = req.body.role;

var sqlquery = "Insert into usertable(name,password,email,telephone,role) values('"+name+"','"+password+"','"+email+"','"+telephone+"','"+role+"')";
pool.getConnection(function(err,connection){

if(err)
	res.send("Error in establishing connection");
connection.query(sqlquery,function(err,result){
   if(!err)
   	res.send("User Created");

		});

	});

});



app.get('/getalldoctors',authorize(Roles.Doctor),function(req,res){


var sqlquery = "select * from usertable where role='Doctor'";
pool.getConnection(function(err,connection){
if(err)
	res.send("Error");
connection.query(sqlquery,function(err,result){

if(!err)
	res.send(result);

});

});

});


app.listen(port);








