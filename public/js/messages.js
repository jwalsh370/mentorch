var active_contact = '';

auth.onAuthStateChanged(function(user){
  if(user){

    userRef.child(user.uid).child('friends').once('value', function(snap){
      snap.forEach(function(data){
        userRef.child(data.val().uid).once('value', function(userData){
          var contact = $(CONTACT).appendTo("#contact-container");
          contact.fadeIn(1000, function(){
            contact.removeClass('slide');
          });
          //alert(userData.val().profile_picture)
          contact.find('.small-profile-pic').css('background-image', 'url("' + userData.val().profile_picture + '")')
          contact.find('#contact-name').html(userData.val().first_name + " " + userData.val().last_name)

          usersRef.child(user.uid).child('messages').child(userData.val().user_id).once('value', function(snap){
            if(snap.val().unreadMessages > 0){
              contact.find('.notification-bubble').html(snap.val().unreadMessages)
            } else {
              contact.find('.notification-bubble').hide()
            }

          })

          contact.click(function(){
            $('.message-text').focus();
            $(this).find('.notification-bubble').hide()
            $(".messages-container").html("");
            $('#selected-contact').html(userData.val().first_name + " " + userData.val().last_name);
            $('#selected-contact-img').attr('src', userData.val().profile_picture);
            active_contact = userData.val().user_id;
            loadMessages(user.uid, userData.val().user_id, 'Me', userData.val().first_name + ' ' + userData.val().last_name)
          })
        })
      })
    })

    $('.send-button').click(function(){
      sendMessage($('.message-text').val(), user.uid, active_contact)
      $('.message-text').val('');
    })

    $('.message-text').keypress(function(e) {
    if(e.which == 13) {
        sendMessage($('.message-text').val(), user.uid, active_contact)
        $('.message-text').val('');
    }
});

  }
})

function loadMessages(uid, contactid, username, contact_username){

  userRef.child(uid).child("messages").child(contactid).update({
    unreadMessages: 0
  })

  userRef.child(uid).child("messages").child(contactid).limitToLast(30).orderByChild('time').on('child_added', function(snap){
    if(snap.val().uid == uid){
      var self_message = $(SELF_MESSAGE).appendTo($(".messages-container"));
      self_message.find('.message-username').html(username);
      self_message.find('.contact-message-text').html(snap.val().message)
      $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight)

    } else {

      var contact_message = $(CONTACT_MESSAGE).appendTo($(".messages-container"));
      contact_message.find('.message-username').html(contact_username)
      contact_message.find('.contact-message-text').html(snap.val().message)
      $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight)

    }

  })

}


function sendMessage(text, sender, recipent){
  usersRef.child(sender).child('messages').child(active_contact).push({
    uid: sender,
    message: text,
    time: Date.now()
  })

  usersRef.child(recipent).child('messages').child(sender).push({
    uid: sender,
    message: text,
    time: Date.now()
  })


  usersRef.child(recipent).child('messages').child(sender).once('value', function(snap){
    var unread_messages = 0;
    unread_messages = snap.val().unreadMessages || 0;
    usersRef.child(recipent).child('messages').child(sender).update({
      unreadMessages: unread_messages + 1
    })
  })



}



var CONTACT =
'<div class="contact slide">'+
'  <div class="small-profile-pic"></div>'+
'  <div id="contact-name">James Boushell</div>'+
'  <span class="notification-bubble"></span>'+
'</div>';

var CONTACT_MESSAGE =
'<div class="contact-message-container">'+
'  <div class="message-username"></div><div class="contact-message">'+
'    <div class="contact-message-text"></div>'+
'  </div>'+
'</div>';

var SELF_MESSAGE =
'<div class="self-message-container text-right">'+
'  <div class="message-username"></div><div class="self-message float-right">'+
'    <div class="contact-message-text"></div>'+
'  </div>'+
'</div>';
