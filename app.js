var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var Peer = require('simple-peer');
var _ = require('lodash');


var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));






// Express Validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res){
  res.render('mentorchindex', {

  });
})

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/logintest', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  res.render('logintest', {
    'username' : username,
    'password' : password
  });
})

app.get('/panel', function(req, res){
  res.render('panel', {
  });
})

app.get('/mentorchindex', function(req, res){
  res.render('mentorchindex', {
  });
})

app.get('/login', function(req, res){
  res.render('login', {
  });
})

app.get('/visionboard', function(req, res){
  res.render('visionboard', {
  });
})

app.get('/resume', function(req, res){
  var id = req.query.id;
  res.render('resume', {
    'uid' : id
  });
})

app.get('/contacts', function(req, res){
  res.render('contacts', {
  });
})

app.get('/messages', function(req, res){
  res.render('messages', {
  });
})

app.get('/discover', function(req, res){
  res.render('discover', {
  });
})

app.get('/user-settings', function(req, res){
  res.render('user-settings', {
  });
})



app.all('/call', function(req, res){

  var localId = req.query.uid;
  var partnerId = req.query.partner;

  io.on('connection', function(socket){
    //socket.id = localId;
    var peersToAdvertise = _.chain(io.sockets.connected).values().without(socket).sample(5).value();
    console.log('advertising peers' + _.map(peersToAdvertise, 'id'));


    console.log(Object.keys(peersToAdvertise));


    peersToAdvertise.forEach(function(socket2) {
      socket2.emit('peer', {
        peerId: socket.id,
        initiator: false
      });
      socket.emit('peer', {
        peerId: socket2.id,
        initiator: true
      });
    });

    socket.on('signal', function(data) {
        var socket2 = io.sockets.connected[data.peerId];
        if (!socket2) { return; }

        socket2.emit('signal', {
          signal: data.signal,
          peerId: socket.id
        });
      });


    console.log(socket.id + ' Has Connected!')
  })



  res.render('call', {
  });

})

var port = process.env.PORT || 8888;

app.set('port', (process.env.PORT || 8888))

http.listen(port, function(){
  console.log("Server is up and running on port " + port);
})
