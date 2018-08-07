var express = require('express');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var FileStore = require('session-file-store')(session);
var enUtil = require('./encryption');
router.use(cookieParser());
router.use(session({
  name: 'grobuck-session-id',
  secret: 'GroBuckSecretKey',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("session::"+req.session.user);
  //
  if(req.session.user){
    console.log(enUtil.decrypt(req.session.user));
     res.render('index', { userid: 'sreehari',"show":"hide"});
  }else{
    res.render('index', { userid: 'sreehari',show:"show" });
  } 
});

module.exports = router;