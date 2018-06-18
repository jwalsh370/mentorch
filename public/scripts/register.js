$('.register-submit').click(function(){

  if($('#password-input').val() == $('#re-password-input').val()){
    firebase.auth().createUserWithEmailAndPassword($('#email-input').val(), $('#password-input').val()).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    alert(errorMessage);
    // ...
    });
  } else {
    alert('Passwords must match!')
  }

  triggerPopup()
})



$('.google-login').click(function(){

  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  var user = result.user;





  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  firebase.auth().onAuthStateChanged(function(user){
    userRef.child(user.uid).set({
      'first_name' : "john",
      'last_name' : "doe",
      'email' : user.email,
      'index' : 0
    }).then(function(){

      userRef.child(user.uid).child('resume').update({
        about_me: "test text",
      })

      userRef.child(user.uid).once('value', function(data){
        if(data.val().index == 0){
          $('popup').toggleClass('transparent')
          $('.content1').toggleClass('transparent')
          $('.popup-button1').click(function(){
            if($('#city').val() && $('#state').val() && $('#birthday').val() && $('#profession').val() && $('#firstname').val() && $('#lastname').val()){
              userRef.child(user.uid).update({
                'first_name': $('#firstname').val(),
                'last_name': $('#lastname').val(),
                'city': $('#city').val(),
                'state': $('#state').val(),
                'birthdate': $('#birthday').val(),
                'profession': $('#profession').val()
              }).then(function(){
                $('.content1').toggleClass('transparent');
                $('.content2').toggleClass('transparent');
                $('.popup-button2').click(function(){
                  window.location.replace('http://localhost:8888/resume/' + user.uid)
                });
              })
            } else { alert('Please enter all fields!') }
          })
        } else { }
      })
    })
  })
})


function triggerPopup(){

  firebase.auth().onAuthStateChanged(function(user){
    userRef.child(user.uid).set({
      'first_name' : 'John',
      'last_name' : 'Doe',
      'email' : $('#email-input').val(),
      'index' : 0
    }).then(function(){

      userRef.child(user.uid).child('resume').update({
        about_me: "test text",
      })

      userRef.child(user.uid).once('value', function(data){
        if(data.val().index == 0){
          $('popup').toggleClass('transparent')
          $('.content1').toggleClass('transparent')
          $('.popup-button1').click(function(){
            if($('#city').val() && $('#state').val() && $('#birthday').val() && $('#profession').val() && $('#firstname').val() && $('#lastname').val()){
              userRef.child(user.uid).update({
                'first_name': $('#firstname').val(),
                'last_name': $('#lastname').val(),
                'city': $('#city').val(),
                'state': $('#state').val(),
                'birthdate': $('#birthday').val(),
                'profession': $('#profession').val()
              }).then(function(){
                $('.content1').toggleClass('transparent');
                $('.content2').toggleClass('transparent');
                $('.popup-button2').click(function(){
                  window.location.replace('http://localhost:8888/resume/' + user.uid)
                });
              })
            } else { alert('Please enter all fields!') }
          })
        } else { }
      })
    })
  })

}
