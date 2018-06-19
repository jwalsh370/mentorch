
var UID;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    UID = user.uid;

    $('.nav-username').click(function(){
      $('.dropdown').toggleClass('hidden');
    })

    $('.nav-username').attr('href', '#')

    $('.drop-resume').attr('href', URL + '/resume/' + user.uid)

    $('.drop-logout').click(function(){
      firebase.auth().signOut();
      window.location.replace(URL)
    })

    var selectedUid;

    userRef.child(UID).child('friends').on('child_added', function(data){
      userRef.child(data.val().uid).once('value', function(snap){
        var contact = $(CONTACT).appendTo('.friends-container');
        contact.find('.chat-pic').css('background-image', 'url('+ snap.val().profile_picture +')')
        contact.find('.chat-name').html(snap.val().first_name)
        contact.click(function(){
          selectedUid = data.val().uid;
          $('.chat-input').focus()
          $('.chat-container').toggleClass('slide-open');
          $('controls').toggleClass('slide-open');
          $('.backbutton').toggleClass('slide-open');
          $('.chat-container message').remove();
          userRef.child(UID).child('messages').child(data.val().uid).on('child_added', function(msg){
            if(msg.val().uid == UID){
              if(msg.val().message){
                var selfMessage = $(SELF_MESSAGE).appendTo('.chat-container');
                selfMessage.find('.message-content').html(msg.val().message);
                $('.chat-container').animate({scrollTop:$('.chat-container')[0].scrollHeight}, '1000')
              }
            } else {
              if(msg.val().message){
                var partnerMessage = $(PARTNER_MESSAGE).appendTo('.chat-container');
                partnerMessage.find('.message-content').html(msg.val().message);
                $('.chat-container').animate({scrollTop:$('.chat-container')[0].scrollHeight}, '1000')
              }
            }
          })

        })

      })
    })

    $('.chat-input').keypress(function(e){
      if(e.which == 13){
        userRef.child(UID).child('messages').child(selectedUid).push({
          message: $('.chat-input').val(),
          uid: UID
        });
        userRef.child(selectedUid).child('messages').child(UID).push({
          message: $('.chat-input').val(),
          uid: UID
        });
        $('.chat-input').val('');
      }
    })

    $('.backbutton').click(function(){
      $('.chat-container').toggleClass('slide-open');
      $('controls').toggleClass('slide-open');
      $('.backbutton').toggleClass('slide-open');
    })


  } else {

  }
});

$('chatbutton').click(function(){
  $('chatbox').toggleClass('slide-open')
})

$('.chat-container')




var CONTACT =
'<contact>'+
'  <div class="chat-pic"></div>'+
'  <div class="information-container"><h4 class="white chat-name">Full Name</h4></div>'+
'</contact>';

var PARTNER_MESSAGE = '<message><dot-img></dot-img><p class="message-content"></p></message>';

var SELF_MESSAGE = '<message class="self"><dot-img></dot-img><p class="message-content"></p></message>';
