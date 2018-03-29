var database = firebase.database()
var auth = firebase.auth()
var userRef = database.ref("users")

var createPopup = function(type, title, message, settings){
  var soundEffect = 'bop.flac' || settings.sound;
  if(type === 'Selection'){

    var alertSound = new Audio('../sounds/' + soundEffect);
    alertSound.play()

    var newPopup = $(SELECTION_POPUP).appendTo('body');
    $(newPopup).find('#title').html(title);
    $(newPopup).find('#message').html(message);
    setTimeout(function(){
      $(newPopup).remove()

    }, settings.expire)

  } else if(type === 'Alert'){

  }
}


auth.onAuthStateChanged(function(user){
  userRef.child(user.uid).child('push_notifications').on('child_added', function(data){
    createPopup(data.val().type, data.val().title, data.val().message, data.val().settings)
    setTimeout(function(){
      userRef.child(user.uid).child('push_notifications').child(data.key).remove()
    }, data.val().settings.expire)

  })
})



var setting = {
  expire: 3000,
  sound: 'bop.flac'
}

$('#createPopup').click(function(){
  createPopup('Selection', 'NEW MESSAGE!', 'Here is the contents of this message', setting)

})


var SELECTION_POPUP =
'<popup>'+
'  <h3 id="title">Title</h3>'+
'  <p id="message">Message goes here!</p>'+
'  <button id="button1">Yes</button><button id="button2">No</button>'+
'</popup>';
