'use strict'

// C library API
const ffi = require('ffi');
const ref = require("ref");

let Card = ref.types.void;
let CardPtr = ref.refType(Card);

let parserLib = ffi.Library('./libVCardParser.so', {
  "fnNameVal": ["string", ["string"]],
  "numAdditionalProps": ['int', ["string"]],
  "cardCheck": ['int', ["string"]],
  "printError": ["string", ['int']],
  "CardToJSON": ["string", ["string"]]
});

// Express App (Routes)
const express = require("express");
const app     = express();
const path    = require("path");
const fileUpload = require('express-fileupload');

app.use(fileUpload());

// Minimization
const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Important, pass in port as in `npm run dev 1234`, do not change
const portNum = process.argv[2];

// Send HTML at root, do not change
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Send Style, do not change
app.get('/style.css',function(req,res){
  //Feel free to change the contents of style.css to prettify your Web app
  res.sendFile(path.join(__dirname+'/public/style.css'));
});

// Send obfuscated JS, do not change
app.get('/index.js',function(req,res){
  fs.readFile(path.join(__dirname+'/public/index.js'), 'utf8', function(err, contents) {
    const minimizedContents = JavaScriptObfuscator.obfuscate(contents, {compact: true, controlFlowFlattening: true});
    res.contentType('application/javascript');
    res.send(minimizedContents._obfuscatedCode);
  });
});

//Respond to POST requests that upload files to uploads/ directory
app.post('/uploads', function(req, res) {
  if(!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  
  let uploadFile = req.files.uploadFile;
 
  // Use the mv() method to place the file somewhere on your server
  uploadFile.mv('uploads/' + uploadFile.name, function(err) {
    if(err) {
      return res.status(500).send(err);
    }

    res.redirect('/');
  });
});

//Respond to GET requests for files in the uploads/ directory
app.get('/uploads/:name', function(req , res){
  fs.stat('uploads/' + req.params.name, function(err, stat) {
    console.log(err);
    if(err == null) {
      res.sendFile(path.join(__dirname+'/uploads/' + req.params.name));
    } else {
      res.send('');
    }
  });
});

//******************** Your code goes here ******************** 
app.get('/uploads', function(req, res) {
  if(req.query.listOfFiles == 1) {
    fs.readdir('./uploads', function(err, files) {
      let jsonObj = {
        fileName: "",
        name: "",
        numProps: 0,
        errMessage: ""
      };
      let toReturn = [];
      for(let i in files) {
        jsonObj[i] = new Object();
        let retVal = parserLib.cardCheck("./uploads/" + files[i]);
        if(retVal != 0) {
          jsonObj[i].fileName = files[i];
          jsonObj[i].name = "invalid";
          jsonObj[i].numProps = retVal;
          jsonObj[i].errMessage = parserLib.printError(retVal);
          fs.unlink("./uploads/" + files[i], (err) => {
            if (err) throw err;
          });
        }
        else {
          jsonObj[i].fileName = files[i];
          jsonObj[i].name = JSON.parse(parserLib.fnNameVal("./uploads/" + files[i]));
          jsonObj[i].numProps = JSON.parse(parserLib.numAdditionalProps("./uploads/" + files[i]));
          jsonObj[i].errMessage = "Ok.";
        }
        toReturn.push(jsonObj[i]);
      }
      res.send(toReturn);
    });
  }
  if(req.query.displayCard == 1) {
    let parsedObj = parserLib.CardToJSON("./uploads/" + req.query.fileName);
    res.send(parsedObj);
  }
});

//Sample endpoint
app.get('/someendpoint', function(req , res){
  res.send({
    foo: "bar"
  });
});

app.listen(portNum);
console.log('Running app at localhost: ' + portNum);