


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userRef.child(uid).child('friends').on('child_added', function(data){

      userRef.child(data.val().uid).once('value', function(data){
        var friend = $(FRIEND).appendTo('.main-panel');
        friend.find('.friend-img').attr('src', data.val().profile_picture)
        friend.find('.friend-name').html(data.val().first_name + ' ' + data.val().last_name)
        friend.find('.resume a').attr('href', URL + '/resume/' + data.val().user_id)
      })

    })

  } else {

  }
});


var FRIEND = '<div class="friend">'+
'<div class="friend-content"><img class="friend-img"></img></div>'+
'<div class="friend-content"><h3 class="friend-name">Friend Name</h3></div>'+
'<div class="friend-content"><h3 class="resume contactico"><a><i class="fas fa-file-alt"></i></a></h3></div>'+
'<div class="friend-content"><h3 class="resume contactico"><a><i class="fas fa-comment-alt"></i></a></h3></div>'+
'<div class="friend-content"><h3 class="resume contactico"><a><i class="fas fa-phone"></i></a></h3></div>'+
'</div>'
