'use strict';
const express = require('express');
const app = express();
const path = require('path');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let allow = true;

app.get('/test.html', function(req, res, next){
  if(allow === false) {
    res.redirect('/index.html');
  } else {
     next();
  }
})

app.post('/fileupload', function(req, res){

    var form = new formidable.IncomingForm();
    //console.log("req = ", req)
    form.parse(req, function (err, fields, files) {

    //FIELDS ARE THE TEXT FIELDS
    //console.log("fields = ", fields)
    //FILES ARE THE UPLOADED FIELDS
    //console.log("files = ", files)
    
    var oldpath = files['0'].path;
    var newpath = './uploads/' + files['0'].name;

    fs.rename(oldpath, newpath, function (err) {
      if (err) {

        throw err;
      }
      //res.write('File uploaded and moved!');
      res.redirect('/index.html');
    });
    });
})


app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || 5000, () => console.log('listening. . . .'))
