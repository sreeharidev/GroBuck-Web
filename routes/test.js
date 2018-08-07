var enUtil = require('./encryption');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');
const MY_NAMESPACE = uuidv4();  // 

uuidv5('hello', MY_NAMESPACE);
var t = uuidv5('world', MY_NAMESPACE);

console.log(t);
console.log(enUtil.encrypt("sreehari-01022017"));
console.log(enUtil.decrypt("774a3db8fa1db600d1c3902f90c49608:0752d9e158d5ecffec73bc9f3a7847beda134ec4744d8312047416c52c3e2641"));//"f1e1b0bbde34282478e9fb43c26f71be:21f0406281ffe77a7551dadf912bd1cb88874cbaca529b7d0ff5aeb5491a0e95"))
