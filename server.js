var express = require('express');
var bodyparser = require('body-parser');
var expressjwt = require('express-jwt');
var mysql = require('mysql');
var app = express();
var cors = require('cors');
const jwt = require('jsonwebtoken');
var cookieparser = require('cookie-parser');
var randomstring = require("randomstring");
var morgan  = require("morgan");
var winston = require('./winston');
const secret = "HospitalRun";
const port = 3000;
var currentTime = new Date();


app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(morgan('combined', { stream: winston.stream }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
  next();
});

app.use(cookieparser());

/*  Mysql Configuration */

var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : 'localhost',
  user            : 'root',
  password        : '123456',
  database        : 'primesp1'
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
                             winston.log(result);  
                             resolve(result);     
                      })
              });


 });


}


var createpatient = function(patientname,fathername,age,gender,telephone1,telephone2,mrno,patientlastname){

return new Promise(function(resolve,reject){

            var sqlquery = "CALL insertpatientprocedure ('"+patientname+"','"+patientlastname+"','"+fathername+"','"+age+"','"+gender+"','"+telephone1+"','"+telephone2+"','"+mrno+"')";
              pool.getConnection(function(err,connection){
                    if(err)
                        return reject('Error in connection');
                      connection.query(sqlquery,function(err,result){
                            if(err)
				{		
                                return reject('Error in inserting');
                            }
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


var addpatientvital = function(height,weight,bloodpressure,pulse,temperature,po2,datetimes,allergiid,patientid){


return new Promise (function(resolve,reject){

  var sqlquery = "insert into patient_vitals(height,weight,bloodpressure,pulse,temperature,po2,datetimes,allergie,patientid) values ('"+height+"','"+weight+"','"+bloodpressure+"','"+pulse+"','"+temperature+"','"+po2+"','"+datetimes+"','"+allergiid+"','"+patientid+"')";
   pool.getConnection(function(err,connection){
                    if(err)
                        return reject('Error in connection');
                      connection.query(sqlquery,function(err,result){
                            if(err){
                                winston.error(err);   
                                return reject('Error in inserting');
}     
                        resolve(result);     
                      })
              });

})

}



var addallergie = function(allergiename){

  return new Promise(function(resolve,reject){

    var sqlquery = "insert into allergies(allergiename) values ('"+allergiename+"')";
    pool.getConnection(function(err,connection){
                    if(err)
                        return reject('Error in connection');
                      connection.query(sqlquery,function(err,result){
                            if(err)
                                return reject('Error in inserting');
                             resolve(result);     
                      })
              });


  });

}



var getpatientdetails = function(patientmrnumber){

  return new Promise(function(resolve,reject){

    var sqlquery = "select * from patient where mr_no='"+patientmrnumber+"'";
    pool.getConnection(function(err,connection){
                    if(err)
                        return reject('Error in connection');
                      connection.query(sqlquery,function(err,result){
                            if(err){
                                console.log(err);
                                return reject('Error in inserting');
                                          

                          }

   resolve(result);     
                      })
              });


  });


}

var createquery = function(query){

 return new Promise(function(resolve,reject){

    pool.getConnection(function(err,connection){
                    if(err)
                        return reject('Error in connection');
                      connection.query(query,function(err,result){
                            if(err){
                               winston.error(err); 
                                return reject('Error');
                             }
                         if(!result.length){
				return reject('Error');			
}
resolve(result);     
                      })
              });


  });

}







var createqueryforinsert = function(query){

 return new Promise(function(resolve,reject){

    pool.getConnection(function(err,connection){
                    if(err)
                        return reject('Error in connection');
                      connection.query(query,function(err,result){
                            if(err){
                               console.log(err);  
                                return reject('Error');
                             }
                       

resolve(result);     
                      })
              });


  });

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


app.get('/',function(req,res){

	res.send("Hello World");

})




app.post('/loginuser',function(req,res){

  var username = req.body.username;
  var password = req.body.password;
  var roles = req.body.role;




  loginfunction(username,password,roles).then(function(rows){
                     var returnpassword = rows[0].password;
                     var userid = rows[0].user_id;
  
                      if (returnpassword == password){
                            var token = jwt.sign({userid:userid,username:username,role:roles}, secret,{ expiresIn: '24h' });
                            var obj = {
                              'token':token,
                              'username': username,
                              'roles':roles
                            }
                            
                            res.writeHead(200);
                            res.write(JSON.stringify(obj));
                            res.end();
                           }

                       else {
                         res.writeHead(403);
                         res.write("Invalid Password");
                         
                         res.end();
                       }     

  }).catch(function(err){
    winston.error(err);
    res.writeHead(404);
    res.write('Error');
    res.end();
  })


});


app.post('/addpatient',authorize(Roles.Receptionist),function(req,res){

var patientname = req.body.patientname;
var patientlastname = req.body.patientlastname;
var patientfather = req.body.patientfathername;
var age = req.body.age;
var gender = req.body.gender;
var telephone1 = req.body.telephone1;
var telephone2 = req.body.telephone2;
var mrnumber = req.body.mrnumber;


createpatient(patientname,patientfather,age,gender,telephone1,telephone2,mrnumber,patientlastname).then(function(result) {

              res.writeHead(200);
              res.write("Record Inserted")
              res.end();

}).catch(function(err){
       winston.error(err);
       res.writeHead(404);
       res.write("Error");
       res.end();
});



});



app.post('/addpatientvitals',authorize(Roles.Nurse),function(req,res){


var height = req.body.heights;
var weight = req.body.weight;
var bloodpressure = req.body.bloodpressure;
var pulse = req.body.pulse;
var temperature = req.body.temperature;
var po2 = req.body.po2;
var datetimes = req.body.datetimes;
var allergie = req.body.allergie;
var patientid = req.body.patientid;


  var sqlquery = "insert into patient_vitals(height,weight,bloodpressure,pulse,temperature,po2,datetimes,patientid,allergie) values ('"+height+"','"+weight+"','"+bloodpressure+"','"+pulse+"','"+temperature+"','"+po2+"','"+datetimes+"','"+patientid+"','"+allergie+"')";
createqueryforinsert(sqlquery).then(function(result){
  res.send(result);

}).catch(function(err){
  winston.error(err);
  res.writeHead(404);
  res.write("Error");  

});



});




app.post('/createallergi',function(req,res){

  var allergiename = req.body.allergiename;
  addallergie(allergiename).then(function(result){
              res.writeHead(200);
              res.write("Record Inserted");
              res.end();

  }).catch(function(error){
    winston.error(err);
     res.writeHead(404);
      res.write("Error");
      res.end();


  });




});






app.post('/getpatientdetails',authorize(Roles.Doctor),function(req,res){

var patientmrnumber = req.body.patientmrnumber;
var sqlquery = "select * from patient inner join patient_vitals on  patient.patientid = patient_vitals.patientid where patient.mr_no='"+patientmrnumber+"' or telephone1='"+patientmrnumber+"' or telephone2='"+patientmrnumber+"';";


createquery(sqlquery).then(function(result){
    res.send(result);

}).catch(function(err){
    winston.error(err);
    res.writeHead(404);
    res.write("Error");
    res.end();


});





});

app.post('/addnote',authorize(Roles.Doctor),function(req,res){

var note = req.body.note;
var date = req.body.date;
var patientid = req.body.patientid;

var sqlquery = "insert into notes(notetext,notedate,patientid) values ('"+note+"','"+date+"','"+patientid+"')";
createqueryforinsert(sqlquery).then(function(result){
     console.log("result",result);		
     res.send(result);

}).catch(function(err){
    winston.error(err);
    res.writeHead(404);
    res.write("Error");
    res.end();

});



});








app.post('/createuser',authorize(Roles.Admin),function(req,res){

var name  = req.body.fullname;
var password = req.body.password;
var role = req.body.role;



var sqlquery = "CALL adduserprocedures('"+name+"','"+password+"','"+role+"')" ;

createqueryforinsert(sqlquery).then(function(result){
  res.send(result);

}).catch(function(err){
  winston.error(err);
  res.writeHead(404);
  res.write("Error");  

});


});









app.get('/getalluser',authorize(Roles.Admin),function(req,res){



var sqlquery = "select * from usertable";
createquery(sqlquery).then(function(result){
  res.send(result);

}).catch(function(err){
  winston.error(err);
  res.writeHead(404);
  res.write("Error");  

});


});


app.post('/searchmrnumber',function(req,res){

var searchmrnumber = req.body.searchmrnumber;
var sqlquery = "select * from patient where mr_no='"+searchmrnumber+"' or telephone1='"+searchmrnumber+"' or telephone2='"+searchmrnumber+"'";
createquery(sqlquery).then(function(result){
    res.send(result);

}).catch(function(err){
    winston.error(err);
    res.writeHead(404);
    res.write("Error");
    res.end();


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

var year = currentTime.getFullYear().toString().substr(-2);
var month = currentTime.getMonth() + 1 ; 


var mrnumber = randomstring.generate({
  length: 4,
  charset:'numeric'
});

var patientmrnumber = year+'-'+month+"-"+mrnumber;

res.send(patientmrnumber);



});




app.get('/getallergi',function(req,res){

var sqlquery = "select * from allergies";
createquery(sqlquery).then(function(result){
    res.send(result);

}).catch(function(err){
    winston.error(err);
    res.writeHead(404);
    res.write("Error");
    res.end();


});




})



app.post('/deleteuser',function(req,res){

var username = req.body.username;
var adminpassword = req.body.password;
var adminusername = req.body.adminusername

var sqlquery = "CALL deleteuserprocedures('"+username+"','"+adminpassword+"','"+adminusername+"')";

createqueryforinsert(sqlquery).then(function(result){
    res.send(result);

}).catch(function(err){
    winston.error(err);
    res.writeHead(404);
    res.write("Error");
    res.end();


});



});


app.post('/updateuserpassword',function(req,res){

var password = req.body.password;
var username= req.body.username;

var sqlquery = "update usertable set password='"+password +"' where name='"+username+"'";
createqueryforinsert(sqlquery).then(function(result){
	res.send(result);

}).catch(function(err){

	res.writeHead(404);
	res.write("Error");	

});

})



app.post('/getnotes',authorize(Roles.Doctor),function(req,res){

var date = req.body.dates;
var patientid = req.body.patientid;
console.log("date",date);
var sqlquery = "select * from notes where notedate='"+date+"' and patientid='"+patientid+"'";
createquery(sqlquery).then(function(result){
        console.log(result);
        res.send(result);

}).catch(function(err){
        winston.error(err); 
        res.writeHead(404);
        res.write("Error");     

});


})



app.get('/viewsearchpatient',authorize(Roles.Doctor),function(req,res){


var sqlquery = "select * from patient";
createquery(sqlquery).then(function(result){
        console.log(result);
        res.send(result);

}).catch(function(err){
        winston.error(err);
        res.writeHead(404);
        res.write("Error");     

});



});


app.listen(port);








