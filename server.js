'use strict';
const express = require('express');
const app = express();
const path = require('path');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

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
     form.parse(req, function (err, fields, files) {
    console.log('err = ', err)
      var oldpath = files['0'].path;
     var newpath = './uploads/' + files['0'].name;
     console.log(oldpath+" "+newpath)
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        console.log('err = ', err)
        throw err;
      }
      //res.write('File uploaded and moved!');
      res.redirect('/index.html');
    });
    });
})


app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || 5000, () => console.log('listening. . . .'))
