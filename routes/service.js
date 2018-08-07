var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');
var Client = require('node-rest-client').Client;
var cookieParser = require('cookie-parser');

var FileStore = require('session-file-store')(session);
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
  //req.session.cookie.expires = false;
  //req.session.cookie.maxAge = 0;
  if(req.session.page_views){
      req.session.page_views++;
      console.log("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
     console.log("Welcome to this page for the first time!");
   }
  console.log("inside the service router");
  console.log('Cookies: ', req.cookies);
  console.log('Session: ',req.session);
  var errorMessage = {"status":"error","message":"Error while processing the request"};
  var args = {
    data: JSON.parse(req.body.json),
    headers:{"Content-Type": "application/json"}
  };
  client.post("http://localhost:8080/"+req.body.serviceId, args, function(data,response) {
    res.json(data);
    console.log(data);
  }).on('error',function(err){
      res.json(errorMessage);
  });

});

module.exports = router;