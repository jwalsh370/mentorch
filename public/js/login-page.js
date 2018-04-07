var database = firebase.database()
var auth = firebase.auth()
var userRef = database.ref("users")

$('#register-button').click(function(){
  $('#register-container').toggleClass('hidden')
  $('#login-container').toggleClass('hidden')
})

$('#logintoday-button').click(function(){
  $('#register-container').toggleClass('hidden')
  $('#login-container').toggleClass('hidden')
})

function login(username, password){
  firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error){
    if(error){
      $("#login-error").html(error.message);
      $("#login-error").removeAttr("hidden");
    } else {
      location.replace('/visionboard')
    }
  }).then(function(){
    location.replace('/visionboard')
  })
}

function register(username, password){
  if($("#register-password").val() == $("#register-password-confirm").val()){
    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error){
      $("#register-error").html(error.message);
      $("#register-error").removeAttr("hidden");
    })

    auth.onAuthStateChanged(function(user){
      var uid = user.uid;
      userRef.once('value', function(data){
        if (data.hasChild(uid)){
          alert("User already exists with the same Email!")
        }else{

          setTimeout(function(){
            //alert($('#first-name').val())
            createUser(
            $('#first-name').val(),
            $('#last-name').val(),
            $('#state').val(),
            $('#city').val(),
            $('#birthday').val(),
            '/img/userimg.png',
            1
            );
            setTimeout(function(){
              location.replace('/visionboard')
            }, 1000)
          }, 3000)

        }
      })
    })

  } else {
    $("#register-error").html("Make sure both passwords match!");
    $("#register-error").removeAttr("hidden");
  }
}


function createUser(first, last, state, city, birthdate, picture_url, index){
  //console.log('CREATE USER');
    auth.onAuthStateChanged(function(user){
      //alert(first);
      //alert(user.uid);
      var uid = user.uid;
      //userRef.child(uid).once('value', function(snap){
      //  if(snap.val().index == 0){
      //    }
    //  })
          userRef.child(uid).update({
            first_name: first,
            last_name: last,
            state: state,
            city: city,
            birthdate: birthdate,
            profile_picture: picture_url,
            email: user.email,
            user_id: user.uid,
            bio: 'Design is life!',
            profession: '',
            index: index
          })

          algoliaIndex.addObject({
            firstname: first,
            lastname: last,
            profession: '',
            bio: '',
            tags: '',
            uid: user.uid,
            pic: '/img/lal2.png',
            objectID: user.uid
          }, function(err, content) {
            console.log(content);
          });
            //alert('CREATED USER');

    })

}



$("#login-screen-button").click(function(){
  login($("#login-username").val(), $("#login-password").val());
});

$("#register-screen-button").click(function(){
  register($("#register-username").val(), $("#register-password").val());
});
