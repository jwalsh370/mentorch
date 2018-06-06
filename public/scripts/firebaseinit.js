var db = firebase.database()
var auth = firebase.auth()
var storage =  firebase.storage();
var userRef = db.ref('users');
var uid, name, userpic;
var URL = 'http://localhost:8888';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    uid = user.uid

    userRef.child(uid).once('value', function(data){
      name = data.val().first_name + ' ' + data.val().last_name;
      userpic = data.val().profile_picture;
    })

    $('.nav-username').html(name);
    $('.nav-resume').attr('href', 'http://localhost:8888/resume/' + uid);

  } else {

  }
});
