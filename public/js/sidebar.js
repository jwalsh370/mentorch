$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
});

$('.grey-shade').mouseenter(function(){
  $('#sidebar-wrapper').removeClass("active");
  $('.grey-shade').addClass("hidden");
  //$('.search-bar').toggleClass("move");
  //$('.resume-wrapper').toggleClass("move-wrapper");
  //$('.hub-wrapper').toggleClass("move-wrapper");
})

$("#sidebar-wrapper").mouseenter(function(){
  $('#sidebar-wrapper').toggleClass("active");
  $('.grey-shade').toggleClass("hidden");
  $('.user-img').toggleClass("invisible");
  $('.side-logo').toggleClass("invisible");
  //$('.resume-wrapper').toggleClass("move-wrapper");
  //$('.hub-wrapper').toggleClass("move-wrapper");
})

$("#sidebar-wrapper").mouseleave(function(){
  $('#sidebar-wrapper').toggleClass("active");
  $('.grey-shade').toggleClass("hidden");
  $('.user-img').toggleClass("invisible");
  $('.side-logo').toggleClass("invisible");
  //$('.search-bar').toggleClass("move");
  //$('.resume-wrapper').toggleClass("move-wrapper");
  //$('.hub-wrapper').toggleClass("move-wrapper");
})

var auth =  firebase.auth();
var database = firebase.database();
var storage =  firebase.storage();

auth.onAuthStateChanged(function(user){
  console.log("AUTH STATE CHANGED")
  if(user){
    userRef.child(user.uid).once('value', function(data){
      $('.username').html(data.val().first_name + " " + data.val().last_name)
      $(".user-img").attr('src', data.val().profile_picture)
    })

    $("#resume-link").attr('href', '/resume?id=' + user.uid);
    $(".logout").click(function(){
      firebase.auth().signOut();
      location.replace('/')
    })
    $(".user-button").click(function(){
      $("#user-controls").toggleClass('hidden');
    })
    logged_in = 1;
  } else {

    logged_in = 0;
  }

})

//$(".paper").draggable()
