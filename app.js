var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var Peer = require('simple-peer');
var firebase = require("firebase");
var admin = require("firebase-admin");

var serviceAccount = {
  "type": "service_account",
  "project_id": "mentorch-95b8c",
  "private_key_id": "177081d2f1541380e7a48e492f71d1460e3cd607",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCzSrCbKEVI9buF\ng5wlvM2pxjkXXcFSydcOt7n55RbG3eCpLY6w59Qh1daQ8Y8axMkX4t+23TywSi3h\n2A1qmsQsEJxjvOU3kLh+E296XX2sJfDyRgSslyjRWUZfpcV41TennCbpQHwxXdN7\ngLk4sW+3prpcGo7ypEZ3+v1MvncpsUYan/5agKFqn8iYstv4X6nFVNUIP3OXiO+O\nWC6RiEQ8WxySiqcZtzXlGmdsJMTDxUPPZD1Y5fLChpr97Yfn/QFxIHvbdWTkVval\nJ9KzDkl0kp47YyXIpNStojcHHcVzKmKBdVB0NaaOwOkddYoAmJ8b2NGFZdhM0jfY\nUFPFmZ0dAgMBAAECggEABbF5Qp5T9p3tRh0D+4zK6RTb8/XsjLWGOqV8L5BT0Hjz\n7P/ss64cU5C6HyoCOmLhLUYR9GbwgOjf0kDkSnVjhcJnRg86b0Mx12+f2BnQVShy\n/L+kTMi4TgYZ7DF4m3VO9+eisq4qB/5rzq/0qJnaYj8xwi/4SDjpWDokLx9TNPFz\ncaUyhbzyTTJh9IclrucQkFJdA3ip6w8u7MQsSfo09Nf438v8tllLsi0+TXMYZGTs\nm4kvLvJna+YZrxLznBGLvihdkUMsG7Z3gZSibAyT7u1kvIj9A/YPq4Vg1lRQrLqA\nhb609YqHLRrGDjIK6CGevPrjKv29m7zK+nV33H/jLwKBgQD65MWExIXTKBJ74+SJ\n0GA485v0S+1Rl/JkBkAzC0lRFThUVusVBJYV+EOyfJIasXZA9dFkLLCdhpVfh+oa\nl7MCLPY2ZOM1Fvw9S5yngxbGZC04VWvnt1YeBemtTamu7593fm3zr7C5q5vJDTXb\nbgYbrwj1zIdGLBObggL7nEiaYwKBgQC28NoPFOX8NJo3BeB5fzOVw3zpVO63XvR8\nRD1asSkbAMgw5uSQAvCiYCme1wbVwFw54IOsUW9/2PLovUG4NXY1ZMAZu9MVYI6n\nGlCfaaAELwe6u9UVF70aHnwIYqGO+5CHN6r9PlSiI+Z3He9k6zNF42ztq7Nc/R4x\nKU2lzfLCfwKBgQDrJd+6QDbtYXFxjHZ2dEa7GhfhMAiNoMwd0334WWuuAyV4Zr6O\nRG4myTkp4HdPbWRYHgzSxtAB1FHL56cSpXuxXlKlSIlrCNAA4w1AMyz1ZI69bdJk\nqwCbww7wzwlqXEwpwuVqsBAC9URde3Qu5T/0Umkjdz6SFl2KMqB5ElE54QKBgCkK\nEwD7ITTY4Bej292lqX7ZYfY+NWcxiAswi8sCn0QNgttlkLS11CG5DN0zQ7dD9eyN\n7zwC8M5vbt7DRjD63U/RED81oX7UMGxQPPHmEh2eJ0++v2iB8MwhNpXy+mdHC/8p\nf9Rb3USaZSMntgKfuNre0BrpP82GgvVoXKDreKAlAoGBAKQMMl7W8r+tns3VQgJy\nNold/0TiY5EjQrooqg2+SCNoMb9pCUAb4jqPm7GRHZzmf8ocm0Atzxh8stv/7PB3\nfJXIG/huuRMwSRrNhCuGxaosCEAabPLA2ONL+MylYRI0vYObgQgwQkd4hJitnb5c\nD367WScczRhHFmCK/8BTtsNe\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-tetsn@mentorch-95b8c.iam.gserviceaccount.com",
  "client_id": "114905696071145638915",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tetsn%40mentorch-95b8c.iam.gserviceaccount.com"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mentorch-95b8c.firebaseio.com"
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
