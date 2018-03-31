var toggle = 1;
$('.notifications-icon').click(function(){
  if(toggle == 1){
    $('.notifications-box').animate({
      top: '40px',
      opacity: '1'
    }, 600, 'easeOutElastic')
    toggle = 0
  } else {
    $('.notifications-box').animate({
      top: '-200px',
      opacity: '0'
    }, 600, 'easeInOutBack')
    toggle = 1
  }

})

var USERID;

auth.onAuthStateChanged(function(user){

  USERID = user.uid;

  var count = 0;
  $('#notification-count').hide()

  userRef.child(user.uid).child('notifications').on('child_added', function(snap){
    $('#notification-count').show()
    count ++;
    $('#notification-count').html(count);
    if(snap.val().type == 'friend-request'){
      var newNotification = $(NOTIFICATION).appendTo($('.notifications-box'));
      newNotification.html('<span class="glyphicon glyphicon-user"></span> ' + snap.val().firstname + " " + snap.val().lastname + ' <span id="accept" class="notification-icon glyphicon glyphicon-ok"></span> <span id="decline" class=" notification-icon glyphicon glyphicon-remove"></span>')
      newNotification.find('#accept').click(function(){
        userRef.child(user.uid).child('friends').child(snap.val().from).update({
          uid: snap.val().from
        })
        userRef.child(snap.val().from).child('friends').child(user.uid).update({
          uid: user.uid
        })
        userRef.child(user.uid).child('notifications').child(snap.key).remove()
        newNotification.remove()
      })
      newNotification.find('#decline').click(function(){
        userRef.child(user.uid).child('notifications').child(snap.key).remove()
        newNotification.remove()
      })
    }
  })

  userRef.child(user.uid).child('notifications').on('child_removed', function(snap){
    count --;
    if(count <= 0){
      $('#notification-count').hide()
    }
    $('#notification-count').html(count);

  })


})


var NOTIFICATION = '<div class="notification">Friend Request!</div>'
