var auth = new firebase.auth();
var database = new firebase.database();
var storage = new firebase.storage();
var username;


//if(username){
//  auth.signInWithEmailAndPassword(username, password).catch(function(error){
//    alert(error);
//  });
//}


auth.onAuthStateChanged(function(){

  if(auth.currentUser != null){
    if(window.location.pathname != '/panel'){
      window.location.replace('/panel');
    }

    var currentUser = auth.currentUser.uid
    $('.navbar').slideDown(1000);
    $('.navbar-brand').delay(1000).animate({opacity: 1}, 3000);
    $('body').css('background-color', 'black');
    $('body').animate({backgroundColor : 'rgb(43, 0, 18)'}, 1500);
    $('#brand').animate({opacity: 0}, 500);
    $('#lilo').html('LOGOUT');
    $('#lilo').click(function(){
      auth.signOut();
      window.location.replace('/');
    })

    console.log("User: " + currentUser + " is signed in!");
  } else {
    console.log("User must log in!");
  }

});
