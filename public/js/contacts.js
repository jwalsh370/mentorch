auth.onAuthStateChanged(function(user){
  if(user){

    userRef.child(user.uid).child('friends').once('value', function(snap){
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
