var auth =  firebase.auth();
var database = firebase.database();
var storage =  firebase.storage();
var logged_in = 0;
var dropdown_toggle = 0;
var usersRef = firebase.database().ref('users');
var provider = new firebase.auth.GoogleAuthProvider();
var fbProvider = new firebase.auth.FacebookAuthProvider();
var userRef = database.ref("users")

var client = algoliasearch('E3R4JOR1Z6', '5cfaa73207b882d4925325869394c3e9');

var algoliaIndex = client.initIndex('contacts');

$(".email-signin").click(function(){
  firebase.auth().signInWithEmailAndPassword($('#signin-email-input').val(), $('#signin-password-input').val()).then(function(result){
    location.replace('/resume?id=' + uid)
  }).catch(function(error){
    alert(error.message);
    //$("#login-error").html(error.message);
    //$("#login-error").removeAttr("hidden");
  })
})

//function login(username, password){
//  console.log('TEST');
//  firebase.auth().signInWithEmailAndPassword(username, password).then(function(result){
//    alert('TEST');
//    alert(result.user.uid);
//  }).catch(function(error){
//    alert(error.message);
    //$("#login-error").html(error.message);
    //$("#login-error").removeAttr("hidden");
//  })

//}

$(".google-signup").click(function(){
  if(!logged_in){
    firebase.auth().signInWithPopup(provider).then(function(result){

      var token = result.credential.accessToken;
      var user = result.user;
      var uid = result.user.uid;

      userRef.once('value', function(snap){
        console.log(uid)
        if(snap.hasChild(uid)){
          console.log("Child Exists!")
          userRef.child(uid).once('value', function(snap){
            if(snap.val().index != 0){
              location.replace('/resume?id=' + uid)
            }
          })
        } else {
/////////////////////////////////////////////////////CREATE A NEW ACCOUNT/////////////////////////////////////////////////////
          createUser(
          'John',
          'Doe',
          'State',
          'City',
          '00/00/0000',
          '/img/userimg.png',
          0
          );

          $(INFO_POPUP).insertBefore('.navbar');
          //alert('create user');
          $('#info-submit').click(function(){
            createUser(
            $('#first-name-input').val(),
            $('#last-name-input').val(),
            $('#state-input').val(),
            $('#city-input').val(),
            $('#birthday-input').val(),
            user.photoURL,
            1
            );
            $('.grey-shade').remove();
            setTimeout(function(){location.replace('/resume?id=' + uid)}, 1000)
          });

/////////////////////////////////////////////////////CREATE A NEW ACCOUNT/////////////////////////////////////////////////////
        }
      })



      console.log(user.email);

    }).catch(function(error){

      var errorCode = error.code;
      var errorMessage = error.messagingSenderId;
      var email = error.email;
      var credential = error.credential;

    })
  } else {
    console.log('ALREADY SIGNED IN')
  }
})

$(".google-signin").click(function(){
  if(!logged_in){
    firebase.auth().signInWithPopup(provider).then(function(result){

      var token = result.credential.accessToken;
      var user = result.user;
      var uid = result.user.uid;

      userRef.once('value', function(snap){
        console.log(uid)
        if(snap.hasChild(uid)){
          console.log("Child Exists!")
          userRef.child(uid).once('value', function(snap){
            if(snap.val().index != 0){
              location.replace('/resume?id=' + uid)
            }
          })
        } else {
/////////////////////////////////////////////////////CREATE A NEW ACCOUNT/////////////////////////////////////////////////////
          createUser(
          'John',
          'Doe',
          'State',
          'City',
          '00/00/0000',
          '/img/userimg.png',
          0
          );

          $(INFO_POPUP).insertBefore('.navbar');
          //alert('create user');
          $('#info-submit').click(function(){
            createUser(
            $('#first-name-input').val(),
            $('#last-name-input').val(),
            $('#state-input').val(),
            $('#city-input').val(),
            $('#birthday-input').val(),
            user.photoURL,
            1
            );
            $('.grey-shade').remove();
            setTimeout(function(){location.replace('/resume?id=' + uid)}, 1000)
          });

/////////////////////////////////////////////////////CREATE A NEW ACCOUNT/////////////////////////////////////////////////////
        }
      })



      console.log(user.email);

    }).catch(function(error){

      var errorCode = error.code;
      var errorMessage = error.messagingSenderId;
      var email = error.email;
      var credential = error.credential;

    })
  } else {
    console.log('ALREADY SIGNED IN')
  }
})

$(".facebook-signin").click(function(){
  if(!logged_in){
    firebase.auth().signInWithPopup(fbProvider).then(function(result){

      var token = result.credential.accessToken;
      var user = result.user;
      var uid = result.user.uid;
      console.log(uid)

      userRef.once('value', function(snap){
        console.log(uid)
        if(snap.hasChild(uid)){
          console.log("Child Exists!")
            userRef.child(uid).once('value', function(snap){
              if(snap.val().index != 0){
                location.replace('/resume?id=' + uid)
              }
            })
        } else {
/////////////////////////////////////////////////////CREATE A NEW ACCOUNT/////////////////////////////////////////////////////


        createUser(
        'John',
        'Doe',
        'State',
        'City',
        '00/00/0000',
        '/img/userimg.png',
        0
        );

        $(INFO_POPUP).insertBefore('.navbar');
        //alert('create user');
        $('#info-submit').click(function(){
          createUser(
          $('#first-name-input').val(),
          $('#last-name-input').val(),
          $('#state-input').val(),
          $('#city-input').val(),
          $('#birthday-input').val(),
          user.photoURL,
          1
          );
          $('.grey-shade').remove();
          location.replace('/resume?id=' + uid)
        });

/////////////////////////////////////////////////////CREATE A NEW ACCOUNT/////////////////////////////////////////////////////
        }
      })

      console.log(user.email);

    }).catch(function(error){

      var errorCode = error.code;
      var errorMessage = error.messagingSenderId;
      var email = error.email;
      var credential = error.credential;

    })
  } else {
    console.log('ALREADY SIGNED IN')
  }
})

$(".facebook-signup").click(function(){
  if(!logged_in){
    firebase.auth().signInWithPopup(fbProvider).then(function(result){

      var token = result.credential.accessToken;
      var user = result.user;
      var uid = result.user.uid;
      console.log(uid)

      userRef.once('value', function(snap){
        console.log(uid)
        if(snap.hasChild(uid)){
          console.log("Child Exists!")
            userRef.child(uid).once('value', function(snap){
              if(snap.val().index != 0){
                location.replace('/resume?id=' + uid)
              }
            })
        } else {
/////////////////////////////////////////////////////CREATE A NEW ACCOUNT/////////////////////////////////////////////////////


        createUser(
        'John',
        'Doe',
        'State',
        'City',
        '00/00/0000',
        '/img/userimg.png',
        0
        );

        $(INFO_POPUP).insertBefore('.navbar');
        //alert('create user');
        $('#info-submit').click(function(){
          createUser(
          $('#first-name-input').val(),
          $('#last-name-input').val(),
          $('#state-input').val(),
          $('#city-input').val(),
          $('#birthday-input').val(),
          user.photoURL,
          1
          );
          $('.grey-shade').remove();
          location.replace('/resume?id=' + uid)
        });

/////////////////////////////////////////////////////CREATE A NEW ACCOUNT/////////////////////////////////////////////////////
        }
      })

      console.log(user.email);

    }).catch(function(error){

      var errorCode = error.code;
      var errorMessage = error.messagingSenderId;
      var email = error.email;
      var credential = error.credential;

    })
  } else {
    console.log('ALREADY SIGNED IN')
  }
})

$(".email-signup").click(function(){
  $(EMAIL_POPUP).insertBefore('.navbar')
  $('#info-submit').click(function(){
    auth.createUserWithEmailAndPassword($('#username-input').val(), $('#password-input').val())
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
      //alert('2342')
      $('.grey-shade').remove();
    }, 2000)



  });

})

$("#username").click(function(){
  if(!logged_in){

  } else {
    if(!dropdown_toggle){
      $(".dropdown").removeAttr("hidden")
      $(".dropdown").css("opacity", 1)
      dropdown_toggle = 1
    }  else {
      $(".dropdown").attr("hidden", "")
      $(".dropdown").css("opacity", 0)
      dropdown_toggle = 0
    }
  }
})

$("#logout-button").click(function(){
  auth.signOut();
  location.reload();
})

function login(username, password){
  firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error){
    $("#login-error").html(error.message);
    $("#login-error").removeAttr("hidden");
  })
}



auth.onAuthStateChanged(function(user){
  console.log("AUTH STATE CHANGED")
  if(user){
    $('.grey-shade-login').remove();
    $('#signup-button').attr('style', 'display: none;');
    $('#signin-button').attr('style', 'display: none;');
    $('.usercontrol').removeAttr('hidden');
    $('#username').html(user.email)

    setTimeout(function(){
      usersRef.child(user.uid).once('value', function(snap){
        if(snap.val().index == 0 || null){
          $(INFO_POPUP).insertBefore('.navbar');
          $('#info-submit').click(function(){
            createUser(
            $('#first-name-input').val(),
            $('#last-name-input').val(),
            $('#state-input').val(),
            $('#city-input').val(),
            $('#birthday-input').val(),
            "/img/userimg.png",
            1
            );
            $('.grey-shade').remove();
          });

        }else{

        }
      })
      logged_in = 1;
    }, 3000)





  } else {
    $("#login-button").attr("href", "../login.php")
    $("#login-button").html('<span class="glyphicon glyphicon-log-in"></span>'+" login");
    $("#profile-picture-image").attr('src', '/img/logo.svg');
    $(".dropdown").attr("hidden", "");
    logged_in = 0;
  }

})


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
            pic: '/img/userimg.png',
            objectID: user.uid
          }, function(err, content) {
            console.log(content);
          });
            //alert('CREATED USER');

    })

}



var INFO_POPUP =
'<div class="grey-shade">'+
'<div class="popup-container">'+
'<div class="popup-container" style="z-index: 100000;">'+
'  <div class="popup">'+
'    <div class="container-fluid popup-header"><img class="center-img" src="./img/signInHeader.png"></div>'+
'    <div class="container-fluid popup-body">'+
'      <span class="medium-text grey-text">Lets get your account setup!</span>'+
'      <input type="text" id="first-name-input" placeholder="First name" class="signup-input"></input>'+
'      <input type="text" id="last-name-input" placeholder="Last name" class="signup-input"></input>'+
'      <input type="text" id="state-input" placeholder="State" class="signup-input"></input>'+
'      <input type="text" id="city-input" placeholder="City" class="signup-input"></input>'+
'      <input type="date" id="birthday-input" placeholder="Birthdate" class="signup-input"></input>'+
'      <input type="button" id="info-submit" placeholder="Create account!" class="signup-submit" value="Create account!"></input>'+
'    </div>'+
'  </div>'+
'</div>'+
'</div>'

var EMAIL_POPUP =
'<div class="grey-shade">'+
'<div class="popup-container">'+
'<div class="popup-container" style="z-index: 100000;">'+
'  <div class="popup">'+
'    <div class="container-fluid popup-header"><img class="center-img" src="./img/signInHeader.png"></div>'+
'    <div class="container-fluid popup-body">'+
'      <span class="medium-text grey-text">Lets get your account setup!</span>'+
'      <input type="text" id="username-input" placeholder="E-mail" class="signup-input"></input>'+
'      <input type="password" id="password-input" placeholder="Password" class="signup-input"></input>'+
'      <input type="password" id="password-match-input" placeholder="Re-enter Password" class="signup-input"></input>'+
'      <input type="text" id="first-name" placeholder="First name" class="signup-input"></input>'+
'      <input type="text" id="last-name" placeholder="Last name" class="signup-input"></input>'+
'      <input type="text" id="state" placeholder="State" class="signup-input"></input>'+
'      <input type="text" id="city" placeholder="City" class="signup-input"></input>'+
'      <input type="date" id="birthday" placeholder="Birthdate" class="signup-input"></input>'+
'      <input type="button" id="info-submit" placeholder="Create account!" class="signup-submit" value="Create account!"></input>'+
'    </div>'+
'  </div>'+
'</div>'+
'</div>'
