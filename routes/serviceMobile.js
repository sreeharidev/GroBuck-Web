var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');
var Client = require('node-rest-client').Client;
var cookieParser = require('cookie-parser');
var FileStore = require('session-file-store')(session);
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');
var enUtil = require('./encryption');
var moment = require('moment');
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
  console.log("Request came");
   
   
  console.log("inside the service router");
  console.log('Cookies: ', req.cookies);
  console.log('Session: ',req.session);
  var errorMessage = {"status":"error","message":"Error while processing the request"};
  console.log(req.body);
  console.log(req.query.serviceId);
  if(req.query.serviceId === "getProductsByShopHomeForMobile"){
    if(!req.session ){
      console.log("No Session found");
    }else if(!req.session.user){
      console.log("User not found");
      const MY_NAMESPACE = uuidv4(); 
      var guest = uuidv5('guest', MY_NAMESPACE);
      req.body.user = guest;
      req.body.userName = 'Guest';
      console.log("Gust");
       var date = moment().format('DDMMYYYY-HH:MM');
       console.log("Gust1");
      req.body.session = enUtil.encrypt(guest+"-"+date);
      console.log("Gust1");
      req.session.user =  guest;
      req.session.userName = 'Guest';
      req.session.session = req.body.session;
      req.session.loggedIn = false;
      req.session.cookie.maxAge= Date.now() + (30 * 86400 * 1000)

    } 
  }

      req.body.user = req.session.user;
      req.body.userId = req.session.user;
      req.body.userName = req.session.userName;
      req.body.session = req.session.session;
      req.body.loggedIn = true;
  console.log(req.body);
  var args = {
    data: req.body,
    headers:{"Content-Type": "application/json"}
  };
  console.log("Posting to server");
  client.post("http://localhost:8080/"+req.query.serviceId, args, function(data,response) {
    res.json(data);
    console.log(data);
  }).on('error',function(err){
      res.json(errorMessage);
  });

});

module.exports = router;