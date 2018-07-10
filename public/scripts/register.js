$('.register-submit').click(function(){

  if($('#password-input').val() == $('#re-password-input').val()){
    firebase.auth().createUserWithEmailAndPassword($('#email-input').val(), $('#password-input').val()).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorMessage);
      // ...
    });
    triggerPopup()

  } else {

    alert('Passwords must match!')
  }

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
      'first_name':$('#firstname').val(),
      'last_name': $('#lastname').val(),
      'email' : user.email,
      'index' : 0
    }).then(function(){

      userRef.child(user.uid).child('resume').update({
        about_me: "test text",
      })

      userRef.child(user.uid).once('value', function(data){

        if(data.val().index == 0){
          $("select#proffesion").change(function(){
            var selectedProffesion = $("#proffesion option:selected").val();
            console.log(selectedProffesion);
          });


          $('popup').toggleClass('transparent')
          $('.content1').toggleClass('transparent')
          $('.popup-button1').click(function(){
            if($('#city').val() &&
            $('#state').val() &&
            $('#birthday').val() &&
            $("#proffesion option:selected").val() &&
            $('#firstname').val() &&
            $('#lastname').val() &&
            $('.mentorType').val() &&
            $("#mentorTeach option:selected").val() &&
            $('#mentorLearn option:selected').val() &&
            $('#contactFrequency option:selected').val() &&
             $("contactTime option:selected").val() && $("contactMethod option:selected").val()) {
              userRef.child(user.uid).update({
                'first_name': $('#firstname').val(),
                'last_name': $('#lastname').val(),
                'city': $('#city').val(),
                'state': $('#state').val(),
                'birthdate': $('#birthday').val(),
                'profession': $("#proffesion option:selected").val(),
                'mentorType': $('.mentorType').val(),
                'mentorTeach': $("#mentorTeach option:selected").val(),
                'mentorLearn': $('#mentorLearn option:selected').val(),
                'contactFrequency': $('#contactFrequency option:selected').val(),
                'contactTime': $("contactTime option:selected").val(),
                'contactMethod': $("contactMethod option:selected").val()

              }).then(function(){
                $('.content1').toggleClass('transparent');
                $('.content2').toggleClass('transparent');
                $('.popup-button2').click(function(){
                  window.location.replace('http://localhost:5000/resume/' + user.uid)
                });
              })
            } else { alert('Please enter all fields!') }
          })
        }
      })
    })
  })
})


function triggerPopup(){

  firebase.auth().onAuthStateChanged(function(user){
    userRef.child(user.uid).set({
      'first_name' : $('#firstname').val(),
      'last_name' : $('#lastname').val(),
      'email' : $('#email-input').val(),
      'index' : 0
    }).then(function(){

      userRef.child(user.uid).child('resume').update({
        about_me: "test text",
      })

      userRef.child(user.uid).once('value', function(data){
        if(data.val().index == 0){
          $("select#proffesion").change(function(){
            var selectedProffesion = $("#proffesion option:selected").val();
            console.log(selectedProffesion);
          });
          $("select#mentorTeach").change(function(){
            var selectedTeach = $('#mentorTeach option:selected').val();
            console.log(selectedTeach);
          });
          $("select.mentorType").change(function(){
            var selectedMentor = $('.mentorType').val();
            console.log(selectedMentor);
          });
          $('popup').toggleClass('transparent')
          $('.content1').toggleClass('transparent')
          $('.popup-button1').click(function(){
            if(
              $('#city').val() &&
              $('#state').val() &&
              $('#birthday').val() &&
              $("#proffesion option:selected").val() &&
              $('#firstname').val() &&
              $('#lastname').val() &&
              $('.mentorType').val() &&
              $("#mentorTeach option:selected").val() &&
              $('#mentorLearn option:selected').val() &&
              $('#contactFrequency option:selected').val() &&
               $("contactTime option:selected").val() && $("contactMethod option:selected").val()){
              userRef.child(user.uid).update({
                'first_name': $('#firstname').val(),
                'last_name': $('#lastname').val(),
                'city': $('#city').val(),
                'state': $('#state').val(),
                'birthdate': $('#birthday').val(),
                'profession': $("#proffesion option:selected").val(),
                'mentorType': $('.mentorType').val(),
                'mentorTeach': $("#mentorTeach option:selected").val(),
                'mentorLearn': $('#mentorLearn option:selected').val(),
                'contactFrequency': $('#contactFrequency option:selected').val(),
                'contactTime': $("contactTime option:selected").val(),
                'contactMethod': $("contactMethod option:selected").val()
              }).then(function(){
                $('.content1').toggleClass('transparent');
                $('.content2').toggleClass('transparent');
                $('.popup-button2').click(function(){
                  window.location.replace('http://localhost:5000/resume/' + user.uid)
                });
              })
            } else { alert('Please enter all fields!') }
          })
        }
      })
    })
  })

}
