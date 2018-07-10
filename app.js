
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var Peer = require('simple-peer');
var firebase = require("firebase");
var admin = require("firebase-admin");
var serviceAccount = require('./mentorch-84acd-firebase-adminsdk-rv8ny-9520ca82cb.json');
var zoom_key = 'ooHs4258TzCbPuGkmb2Z3Q';
var zoom_sec = 'i3X2uAURQH9UK5vXk36cxVm7KtGUOUZydYoL';
var thenrequest = require('then-request');
var async = require('async');
var jwt = require('jsonwebtoken');








admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mentorch-84acd.firebaseio.com"
});

var db = admin.database();
var userRef = db.ref("users");

var config = {
    apiKey: "AIzaSyBefMYLqq4oZYvha0yl2ViJ5nv3EDqEEL8",
    authDomain: "mentorch-84acd.firebaseapp.com",
    databaseURL: "https://mentorch-84acd.firebaseio.com",
    projectId: "mentorch-84acd",
    storageBucket: "mentorch-84acd.appspot.com",
    messagingSenderId: "237332840910"
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
// ZOOM CODE START

app.get('/zoomView', function(req, res) {
  res.render('zoomView', {title: 'Connect with Zoom'});
});

app.get('/createUser', function(req, res) {
  res.render('users', {title: 'User Management'});
});

app.post('/createUser', function(req, res) {

  var options = {
    qs: {api_key: 'fDbkPuxiQtW4o00abilt4Q', api_secret: 'ixWlMEb18wD5gzHJCnqxDJPLN2uUswcsLRUY', data_type: "JSON", email: req.body.email , type: 2}
  };

  // make an asynchronous request to zoom to create a User
  var asyncres = thenrequest('POST',"https://dev.zoom.us/v1/user/create",options).done(function (res) {
    console.log(res.getBody('utf8'));
    });
  res.redirect('/zoomView');
});

app.get('/autoUser', function(req, res) {
  res.render('autoUsers', {title: 'User Management'});
});

app.post('/autoUser', function(req, res) {
  console.log(req.body);
  console.log("email:", req.body.email);
  var options = {
    qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON", email: req.body.email , password: req.body.pwd, type: 2}
  };

  // make an asynchronous request to zoom to create a user without email verification
  var asyncres = thenrequest('POST',"https://dev.zoom.us/v1/user/autocreate2",options).done(function (res) {
    console.log(res.getBody('utf8'));
    });
  res.redirect('/');
});

app.get('/updateUser', function(req, res) {
  res.render('upUsers', {title: 'User Management'});
});

app.post('/updateUser', function(req, res) {
  console.log(req.body);
  console.log("email:", req.body.id);

  var options = {
    qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON", id: req.body.id , type: req.body.type}
  };

  // make an asynchronous request to zoom to update a user
  var asyncres = thenrequest('POST',"https://dev.zoom.us/v1/user/update",options).done(function (res) {
    console.log(res.getBody('utf8'));
    });
  res.redirect('/');
});

app.get('/createMeeting', function(req, res) {
  res.render('Meetings', {title: 'Manage Meetings'});
});

app.post('/createMeeting', function(req, res) {
  console.log(req.body);
  console.log("id:", req.body.id);

  console.log("topic:", req.body.topic);
   var Moptions = {
    qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON", host_id: req.body.id , topic: req.body.topic, type: 3}
  };

  // make an asynchronous request to zoom to create a meeting
  var asyncres = thenrequest('POST',"https://dev.zoom.us/v1/meeting/create",Moptions).done(function (res) {
    console.log(res.getBody('utf8'));
    });
  res.redirect('/');
});



app.get('/listMeeting', function(req, res) {
  res.render('listMeetings', {title: 'Manage Meetings'});
});

app.post('/listMeeting', function(req, res) {
  console.log(req.body);
  console.log("id:", req.body.id);

  var Moptions = {
    qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON", host_id: req.body.id }
  };
  // make an asynchronous request to zoom to list all meetings
  var asyncres = thenrequest('POST',"https://dev.zoom.us/v1/meeting/list",Moptions).done(function (res) {
    console.log(res.getBody('utf8'));
    });
  res.redirect('/');
});

app.get('/updateMeeting', function(req, res) {
  res.render('upMeetings', {title: 'Manage Meetings'});
});

app.post('/updateMeeting', function(req, res) {
  console.log(req.body);
  console.log("id:", req.body.id);

  console.log("topic:", req.body.topic);
  var Moptions = {
    qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON", host_id: req.body.id , id: req.body.mId, type: req.body.type}
  };
  // make an asynchronous request to zoom to update a meeting
  var asyncres = thenrequest('POST',"https://dev.zoom.us/v1/meeting/update",Moptions).done(function (res) {
    console.log(res.getBody('utf8'));
    });
  res.redirect('/');
});

// ZOOM END

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

var port = process.env.PORT || 5000;

app.set('port', (process.env.PORT || 5000))

http.listen(port, function(){
  console.log("Server is up and running on port " + port);
})
