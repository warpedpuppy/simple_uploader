'use strict';
const express = require('express');
const app = express();
const path = require('path');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');


app.post('/fileupload', function(req, res){
    var form = new formidable.IncomingForm();
     form.parse(req, function (err, fields, files) {
         var oldpath = files.filetoupload.path;
         var newpath = './uploads/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write('File uploaded and moved!');
          res.end();
        });
    });
})


app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || 5000, () => console.log('listening. . . .'))
