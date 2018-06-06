


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('.nav-username').click(function(){
      $('.dropdown').toggleClass('hidden');
    })

    $('.nav-username').attr('href', '#')

    $('.drop-resume').attr('href', URL + '/resume/' + user.uid)

    $('.drop-logout').click(function(){
      firebase.auth().signOut();
      window.location.replace(URL)
    })

  } else {

  }
});
