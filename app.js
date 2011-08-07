
/**
 * Module dependencies.
 */

var express = require('express');
var nowjs = require('now');
var app = module.exports = express.createServer();
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Split'
  });
});

app.listen(3000);
var everyone = require('now').initialize(app);

// Now.js stuff that handles all extension connections

// Connect allows a client to enter a group
// this is exposed to everyone
everyone.now.connect = function(key,callback){
    // a group consists of 2 people (for now)
    console.log('connect called with key: '+key);
    console.log('clientid is: '+this.user.clientId);
    var clientId = this.user.clientId;
    var maxUsers = 2;
    var group = nowjs.getGroup(key);
    group.count(function(userNum){
        console.log('group count fetched: '+userNum);
        
        // attach handlers if this is a new group
        if(userNum===0){
            attachGroupHandlers(group);
        }

        if(userNum<maxUsers){
            console.log('group approves, adding user with clientId: '+clientId);
            group.addUser(clientId);
            callback({"status":"1"});
        }
        else{
            console.log('group rejects, returning fail');
            callback({"status":"0"});
        }
    });
}


// attaches necessary handlers to new groups
function attachGroupHandlers(group){
   
    console.log('attaching group handlers to group '+group.groupName);
    
    // Message distribution method
    group.now.distributeMessage = function(msg){
        // send message to everybody except whoever sent it
        group.exclude([this.user.clientId]).now.receiveMessage(msg);
    }
}


console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
