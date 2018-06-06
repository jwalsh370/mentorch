firebase.auth().onAuthStateChanged(function(user){
  if(user){

    userRef.child(user.uid).once('value', function(data){
      $('.user-img').attr('src',  data.val().profile_picture)
      $('.first-name').attr('value',  data.val().first_name);
      $('.last-name').attr('value',  data.val().last_name)
      $('.bio').val(data.val().bio)
    })


  } else {

  }
})
