var express = require('express');
var bodyparser = require('body-parser');
var expressjwt = require('express-jwt');
var mysql = require('mysql');
var app = express();
var cors = require('cors');
const jwt = require('jsonwebtoken');
var cookieparser = require('cookie-parser');
var randomstring = require("randomstring");
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



var loginfunction = function(username,password,rolename){

 return new Promise(function(resolve,reject){
             var sqlquery = "select user_id,password from usertable where name='"+username+"' and role='"+rolename+"'";
              pool.getConnection(function(err,connection){
                    if(err)
                        return reject('Error in connection');
                      connection.query(sqlquery,function(err,result){
                            if(err)
                                return reject('Error in fetch');
                             if(!result.length){
                                     return reject('Error in fetch');
                             }

                             resolve(result);     
                      })
              });


 });


}


var createpatient = function(patientname,fathername,age,gender,telephone1,telephone2,mrno){

return new Promise(function(resolve,reject){

            var sqlquery = "insert into patient(patientname,fathername,age,gender,telephone1,telephone2) values ('"+patientname+"','"+fathername+"','"+age+"','"+gender+"','"+telephone1+"','"+telephone2+"','"+mrno+"')";
              pool.getConnection(function(err,connection){
                    if(err)
                        return reject('Error in connection');
                      connection.query(sqlquery,function(err,result){
                            if(err)
                                return reject('Error in inserting');
                             resolve(result);     
                      })
              });



})

}


var patientid = function(patientmrno){

return new Promise(function(resolve,reject){
  var sqlquery = "select patientid from patient where mr_no='"+patientmrno+"'";
  pool.getConnection(function(err,connection){
                    if(err)
                        return reject('Error in connection');
                      connection.query(sqlquery,function(err,result){
                            if(err)
                                return reject('Error in fetch');
                             if(!result.length){
                                     return reject('Error in fetch');
                             }

                             resolve(result);     
                      })
              });  


})

};


var addpatientvital = function(height,weight,bloodpressure,temperature,po2,allergiid,patientid){


return new Promise (function(resolve,reject){

  var sqlquery = "insert into patient_vitals(height,weight,bloodpressure,pulse,temperature,po2,datetimes,allergieid,patientid) values ('"+height+"','"+weight+"','"+bloodpressure+"','"+temperature+"','"+po2+"','"+allergiid+"','"+patientid+"')";
   pool.getConnection(function(err,connection){
                    if(err)
                        return reject('Error in connection');
                      connection.query(sqlquery,function(err,result){
                            if(err)
                                return reject('Error in inserting');
                             resolve(result);     
                      })
              });

})

}






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


app.post('/loginuser',function(req,res){

  var username = req.body.username;
  var password = req.body.password;
  var roles = req.body.role;




  loginfunction(username,password,roles).then(function(rows){
                     var returnpassword = rows[0].password;
                     var userid = rows[0].user_id;
  
                      if (returnpassword == password){
                            var token = jwt.sign({userid:userid,username:username,role:roles}, secret);
                            res.cookie('token', token, { httpOnly: true })
                             .sendStatus(200);
                             res.end();
                           }

                       else {
                         res.writeHead(403);
                         res.write("Invalid Password");
                         
                         res.end();
                       }     

  }).catch((err) => setImmediate(() => { res.writeHead(404);res.end();  }));


});


app.post('/addpatient',authorize(Roles.Receptionist),function(req,res){

var patientname = req.body.patientname;
var patientfather = req.body.patientfathername;
var age = req.body.age;
var gender = req.body.gender;
var telephone1 = req.body.telephone1;
var telephone2 = req.body.telephone2;
var mrnumber = req.body.mrnumber;


createpatient(patientname,patientfather,age,gender,telephone1,telephone2,mrnumber).then(function(result) {

              res.writeHead(200);
              res.write("Record Inserted")


}).catch(function(err){

       res.writeHead(404);
       res.write("Error");
});



});



app.post('/addpatientvitals',authorize(Roles.Nurse),function(req,res){

var mrno = req.body.patientmrno;
var height = req.body.heights;
var weight = req.body.weight;
var bloodpressure = req.body.bloodpressure;
var pulse = req.body.pulse;
var temperature = req.body.temperature;
var po2 = req.body.po2;
var datetimes = req.body.datetimes;
var allergiid = req.body.allergiid;



createpatient(patientname,patientfather,age,gender,telephone1,telephone2,mrnumber).then(function(result){

              res.writeHead(200);
              res.write("Record Inserted")


}).catch(function(err){
      res.writeHead(404);
      res.write("Error");
})



});



















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


app.get('/createmrnumber',function(req,res){

var mrnumber = randomstring.generate({
  length: 6,
  charset:'numeric'
});

res.send(mrnumber);



});

app.listen(port);








