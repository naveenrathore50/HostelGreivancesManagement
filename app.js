const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT||3000;
var db= require('./connection.js');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
var Smessage='';
var Amessage='';
app.get("/",function(req,res){
       res.render("index");
});
app.get("/StudentLoginSignup",function(req,res){
  res.render("StudentLogin",{message: Smessage});
});
app.get("/AdminLoginSignup",function(req,res){
  res.render("adminLogin",{message:Amessage});
});
app.post("/StudentLoginSignup",function(req,res){
     res.render("StudentLogin",{message:Smessage});
});
app.post("/AdminLoginSignup",function(req,res){
   res.render("adminLogin",{message:Amessage});
});
app.post("/StudentLogin",function(req,res){
  var name= req.body.EnterName;
  var email=req.body.EnterEmail;
  var room=req.body.EnterRoom;
  var usn=req.body.EnterUSN;
  var phone=req.body.EnterPh;
  var password= req.body.EnterPass;
  console.log(name);
  var sql1=`INSERT INTO student VALUES ('${usn}','${name}','${room}','${email}','${phone}','${password}')`;
  db.query(sql1,function(error,result){
    if(error)
    {
      console.log(error);

    }else {
      console.log(result);
    }  
  });
  res.render("StudentLogin",{message:Smessage});
 });
 app.post("/StudentPortal",function(req,res){
      var Email= req.body.LoginEmail;
      var pass = req.body.LoginPass;
      var sql1="SELECT Email, Password FROM student WHERE Email='"+Email+"' and Password = '"+pass+"'";
      db.query(sql1,function(err,result){
        if(!result.length){
          Smessage="Wrong Credentials"
           res.redirect("/StudentLoginSignup");
        }
        else{
          Smessage='';
          var sql2 = "SELECT * from student WHERE Email='"+Email+"' and Password = '"+pass+"'";
          db.query(sql2,function(err,results){
           var name=results[0].S_Name;
           var usn=results[0].USN;
           var room=results[0].Room_No;
           var ph=results[0].Phone_No;
           res.render("StudentPortal",{name:name,Email:Email,Room:room,Usn:usn,phone:ph});
          });  
        }
      })

 });
 app.post("/AdminLogin",function(req,res){
  var code= req.body.EnterCcode;
  var cname=req.body.EnterCname;
  var wname=req.body.EnterWname;
  var email=req.body.EnterCemail;
  var phone=req.body.EnterCphone;
  var password= req.body.EnterCpass;
  var sql1=`INSERT INTO Admin VALUES ('${code}','${cname}','${wname}','${email}','${phone}','${password}')`;
  db.query(sql1,function(error,result){
    if(error)
    {
      console.log(error);

    }else {
      console.log(result);
    }  
  });
  res.render("adminLogin",{message:Amessage});
 });
 app.post("/AdminPortal",function(req,res){
  var Email= req.body.LoginAEmail;
  var pass = req.body.LoginAPass;
  var sql1="SELECT email_id, Password FROM Admin WHERE email_id='"+Email+"' and Password = '"+pass+"'";
  db.query(sql1,function(err,result){
    if(!result.length){
      Amessage="Wrong Credentials";
      res.redirect("/AdminLoginSignup");
    }
    else{
       Amessage='';
          var sql2 = "SELECT * from Admin WHERE email_id='"+Email+"' and Password = '"+pass+"'";
          db.query(sql2,function(err,results){
           var Cname=results[0].College_name;
            var Ccode=results[0].College_code;
           var Wname=results[0].Grievance_Manager;
           var Cph=results[0].Phone_no;
           var Cemail=results[0].email_id;
           res.render("AdminPortal",{Cname:Cname,Ccode:Ccode,Wname:Wname,Cph:Cph,Cemail:Cemail});
          });  
    }
  })
 });
app.post("/newGrievance",function(req,res){
  var name= req.body.Comname;
  var room=req.body.Comroom;
  var G_id=name+room;
  var cate=req.body.Comcategory;
  var usn=req.body.Comusn;
  var sql1=`INSERT INTO Grievances VALUES ('${G_id}','${cate}','01','${usn}','${room}','12/28/2021')`;
  db.query(sql1,function(error,result){
    if(error)
    {
      console.log(error);

    }else {
      console.log(result);
    }  
  });
  res.redirect("/status");
});
app.listen(port, function(){
  console.log("Server started on port 3000");
});
