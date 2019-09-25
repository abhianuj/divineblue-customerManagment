var express = require('express');
var mysql = require('mysql');
var router = express.Router();

//connecting to the database.
var con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"dynamo10",
    database:"bookdb"
});
con.connect(function(err){
    if(err) throw err;
});

router.route('/')
    .get(function(req,res){
        //declaring the data to be used
        let data=[{},{}];
        //query the database for books
        con.query("select title,rating,price,image,id from book order by rand() limit 4", function(err, result){
            if(err) throw err;
            data[0] = result;
            con.query("select title,rating,price,image,id from book where genre='Fiction' order by rand() limit 4", function(err, result){
                if(err) throw err;
                data[1] = result;
                res.render('index',{data1:data[0],data2:data[1]});
            })
        })
    })
    .post(function(req,res){
        res.send("Submited!")
    })

router.get('/book', function(req,res){
    res.render('book');
});

router.get('/book/:id', function(req,res){
    let data =[{},{}];
    let query = "select * from book where id=" + req.params.id ;
    con.query(query, function(err,result){
        if(err) throw err;
        data[0] = result;
        query="select title,rating,price,image,id from book where genre= " + result.genre + " order by rand() limit 4"
        con.query("select title,rating,price,image,id from book where genre='Fiction' order by rand() limit 4", function(err, result){
            if(err) throw err;
            data[1] = result;
            res.render('book',{data1:data[0],data2:data[1]});
        })
    })
});

module.exports = router;