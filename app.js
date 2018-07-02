
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var Peer = require('simple-peer');
var firebase = require("firebase");
var admin = require("firebase-admin");


var serviceAccount = {
  "type": "service_account",
  "project_id": "mentorch-84acd",
  "private_key_id": "177081d2f1541380e7a48e492f71d1460e3cd607",
  "private_key": "AIzaSyBefMYLqq4oZYvha0yl2ViJ5nv3EDqEEL8",
  "client_email": "firebase-adminsdk-tetsn@mentorch-95b8c.iam.gserviceaccount.com",
  "client_id": "114905696071145638915",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tetsn%40mentorch-95b8c.iam.gserviceaccount.com"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mentorch-84acd.firebaseio.com"
});

var db = admin.database();
var userRef = db.ref("users");

var config = {
    apiKey: "AIzaSyBWIONF4XycZDshaiAwttY9kwX1hzyNxlY",
    authDomain: "mentorch-95b8c.firebaseapp.com",
    databaseURL: "https://mentorch-95b8c.firebaseio.com",
    projectId: "mentorch-95b8c",
    storageBucket: "mentorch-95b8c.appspot.com",
    messagingSenderId: "141190493048"
  };
firebase.initializeApp(config);

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
  res.render('index', {

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



app.get('/login', function(req, res){
  res.render('login', {
  });
})

app.post('/login', function(req, res){

})

app.get('/register', function(req, res){
  res.render('register', {
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

app.get('/resume/:id', function(req, res){
  var id = req.params.id;
  var firstname = "First";
  var lastname = "Last";
  var education = "test";


    userRef.once('value', function(snap){
      if(snap.hasChild(id)){
        userRef.child(id).once('value', function(snap){
          name = snap.val().first_name + " " + snap.val().last_name;
          //education = snap.val().resume.education;
          res.render('resume', {
            'uid' : id,
            'name' : name,
            'profession' : snap.val().profession,
            'pic' : snap.val().profile_picture || '/img/userimg.png',
            'bio' : snap.val().resume.about_me || 'About me!',
            'education' : education || 'test'
          });
        });
      } else {
        res.render('index')
      }
    })





})

app.get('/discover', function(req, res){
  res.render('discover', {
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

app.get('/settings', function(req, res){
  res.render('settings', {
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
