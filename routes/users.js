var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');
var Client = require('node-rest-client').Client;
var cookieParser = require('cookie-parser');
var FileStore = require('session-file-store')(session);
var moment = require('moment');
var enUtil = require('./encryption');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');
//var app = express();
router.use(cookieParser());
router.use(session({
  name: 'grobuck-session-id',
  secret: 'GroBuckSecretKey',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));
var client = new Client();
/* GET home page. */
router.post('/', function(req, res)  {
   
  var date = moment().format('DDMMYYYY-HH:MM');
  var jsonReq = JSON.parse(req.body.json);
  console.log(date);
  console.log("User Id::"+jsonReq.userId);
   
   
  var session = null;
  if(jsonReq.src && jsonReq.src == "register"){
    session = enUtil.encrypt(jsonReq.userId+"-"+date);
  }else if(jsonReq.src && jsonReq.src == "guest"){
    const MY_NAMESPACE = uuidv4(); 
    var guest = uuidv5('guest', MY_NAMESPACE);
    jsonReq.userId = guest;
    jsonReq.userName = 'Guest';
    session = enUtil.encrypt(guest+"-"+date);
  }else if(jsonReq.src && jsonReq.src == "facebook"){
    session = enUtil.encrypt(jsonReq.userId+"-"+date);
  }
  
  jsonReq.session = session;
  console.log(session);
  var errorMessage = {"status":"error","message":"Error while processing the request"};
  var args = {
    data: jsonReq,
    headers:{"Content-Type": "application/json"}
  };
  client.post("http://localhost:8080/"+req.body.serviceId, args, function(data,response) {
    req.session.user=data.data.session;
    console.log("session set....");
    console.log(req.session.user);
    res.json(data);
    console.log(data);
    console.log(data.status);
    
    
  }).on('error',function(err){
      res.json(errorMessage);
  });

});

module.exports = router;
