var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

//url encoed parser using body parser
var urlencodedParser = bodyParser.urlencoded({ extended: false});

//fire express
var app = express();

//set view engine as ejs
app.set('view engine', 'ejs');

//setting the connection to the database
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"dynamo10",
    database:"bookdb"
  });

//fetching the static data
app.use('/assets', express.static('assets'));
app.use('/book/assets',express.static('assets'));

//routing handeled
con.connect(function(err){
    if(err) throw err;
})

app.get('/',function(req,res){
    res.render('main');
})

app.get('/a1',function(req,res){
    res.render('a1',{data:0});
})
app.post('/a1', urlencodedParser, function(req,res){
    let sql = "INSERT INTO divinedb (compname, clientname,  reference, contact, email, standard, certno, issuedate, surv1, surv2, certexp, country, cb) values ('" + req.body.compname + "','" + req.body.clientname + "','" + req.body.reference + "','" + req.body.contact + "','" + req.body.email + "','" + req.body.standard + "','" + req.body.certno + "','" + req.body.issuedate + "','" + req.body.surv1 + "','" + req.body.surv2 + "','" + req.body.certexp + "','" + req.body.country + "','" +req.body.cb + "');";
    con.query(sql, function(err){
        if(err) 
        res.render('a1',{data:1});
        else
        res.render('a1',{data:2});
    })
})

app.get('/a2', function(req,res){
    con.query("select srno,compname,clientname,contact,date_format(issuedate, '%d-%m-%Y') as issuedate,date_format(certexp, '%d-%m-%Y') as certexp from divinedb",function(err,result){
        res.render('a2',{data:result});
    })
})
app.get('/a2/:srno', function(req,res){
    con.query("select srno,compname,clientname,reference,contact,email,standard,certno,date_format(issuedate, '%d-%m-%Y') as issuedate, date_format(surv1, '%d-%m-%Y') as surv1, date_format(surv2, '%d-%m-%Y') as surv2, date_format(certexp, '%d-%m-%Y') as certexp,country,cb from divinedb where srno="+ req.params.srno, function(err,result){
        res.render('a2main',{data:result[0]});
    })
})

app.get('/a4',function(req,res){
    con.query("select srno,compname,clientname,contact,date_format(issuedate, '%d-%m-%Y') as issuedate,date_format(certexp, '%d-%m-%Y') as certexp from divinedb",function(err,result){
            if(err){
                throw error;
            }
            res.render('a4',{data:result,data2:false});
    })
})
app.post('/a4', urlencodedParser, function(req,res){
    let dates = req.body.datec
    let sql="select srno,compname,clientname,contact,date_format(issuedate, '%d-%m-%Y') as issuedate,date_format(certexp, '%d-%m-%Y') as certexp from divinedb where date_format(certexp, '%Y-%m-%d') < date '" + req.body.datec + "'";
    con.query(sql, function(err,result){
        if(err){
            res.send("It seems that you entered a wrong value or an error occurred!");
        } else{
            res.render('a4',{data: result,data1:dates,data2:true});
        }
    })
})

app.get('/a3', function(req,res){
    res.render('a3', {data: 0});
})
app.post('/a3', urlencodedParser, function(req,res){
    let sql = "delete from divinedb where srno=" + req.body.srno;
    console.log(sql);
    con.query(sql, function(err){
        if(err){
            res.render('a3',{data:1});
        } else{
            res.render('a3',{data:2});
        }
    })
})

app.listen(3000,function(){
    console.log("listening to port 3000");
});