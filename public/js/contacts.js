auth.onAuthStateChanged(function(user){
  if(user){
    var myName;
    var myImg;
    userRef.child(user.uid).once('value', function(snap){
      myName = snap.val().first_name + ' ' + snap.val().last_name;
      myImg = snap.val().profile_picture;
    })
    userRef.child(user.uid).child('friends').once('value', function(snap){
      var selectedUser;
      var selectedName;
      var selectedImg;
      snap.forEach(function(data){
        userRef.child(data.val().uid).once('value', function(userData){
          var contact = $(CONTACT).appendTo("#contact-container");
          //alert(userData.val().profile_picture)
          contact.fadeIn(1000, function(){
            contact.removeClass('slide');
          });
          contact.find('.small-profile-pic').css('background-image', 'url("' + userData.val().profile_picture + '")')
          contact.find('#contact-name').html(userData.val().first_name + " " + userData.val().last_name)
          contact.find('#uid').html(userData.val().user_id)
          contact.click(function(){
            selectedUser = data.val().uid;
            selectedName = data.val().first_name + ' ' + userData.val().last_name;
            $('#contact-controls-container').fadeIn(500, function(){
              $(this).removeClass('slide');
            });
            $('.center-div').fadeIn(1000, function(){
              $(this).toggleClass('slide');
            })
            $('.profile-pic-big').attr('src', userData.val().profile_picture)
            $('#resume-button').attr('href', 'resume?id=' + userData.val().user_id )
            $('#selected-contact-name').html(userData.val().first_name + " " + userData.val().last_name)
            $('#selected-contact-bio').html(userData.val().bio)
          })
        })
      })
        $('#call-button').click(function(){
          userRef.child(selectedUser).child('push_notifications').push({
            type: 'Selection',
            title: myName + ' is calling you!',
            uid: user.uid,
            message: 'You are recieving a video chat call. You can accept or decline below!',
            settings: {
              sound: 'bop.flac',
              expire: 6000,
              button1: 'call',
              button2: '#decline'

            }
          })
          userRef.child(selectedUser).child('call').update({
            partner: user.uid
          })
          userRef.child(user.uid).child('call').update({
            partner: selectedUser
          })
          location.replace('call?uid=' + user.uid + '&partner=' + selectedUser);
        })
    })

    $('.searchbar').keyup(function(){

      $("#contact-container").html("");
      userRef.child(user.uid).child('friends').once('value', function(snap){
        snap.forEach(function(data){
          userRef.child(data.val().uid).once('value', function(userData){
            var name = userData.val().first_name + " " + userData.val().last_name + " " + userData.val().bio + " " + userData.val().profession;
            if(name.match(new RegExp($('.searchbar').val(), 'i'))){
              var contact = $(CONTACT).appendTo("#contact-container");
              //alert(userData.val().profile_picture)
              contact.fadeIn(1000, function(){
                contact.removeClass('slide');
              });
              contact.find('.small-profile-pic').css('background-image', 'url("' + userData.val().profile_picture + '")')
              contact.find('#contact-name').html(userData.val().first_name + " " + userData.val().last_name)
              contact.find('#uid').html(userData.val().user_id)
              contact.click(function(){
                $('#contact-controls-container').fadeIn(500, function(){
                  $(this).removeClass('slide');
                });
                $('.center-div').fadeIn(500, function(){
                  $(this).toggleClass('slide');
                })
                $('.profile-pic-big').attr('src', userData.val().profile_picture)
                $('#resume-button').attr('href', 'resume?id=' + userData.val().user_id )
                $('#selected-contact-name').html(userData.val().first_name + " " + userData.val().last_name)
                $('#selected-contact-bio').html(userData.val().bio)

              })

            }
          })
        })

      })

    })

  }
  $(".exit-button").click(function(){
    $('#contact-controls-container').fadeIn(500, function(){
      $(this).toggle('slide');
    });
    $('.center-div').fadeIn(1000, function(){
      $(this).toggleClass('slide');
    })
  })


})


var CONTACT =
'<div class="contact slide">'+
'  <div class="small-profile-pic"></div>'+
'  <div id="contact-name">James Boushell</div>'+
'<secret id="uid" class="hidden"></secret>'
'</div>'
