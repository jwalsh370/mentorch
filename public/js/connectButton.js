auth.onAuthStateChanged(function(user){

if(user){
  userRef.child(user.uid).child('friends').once('value', function(data){
    if(data.hasChild(resume_id) || user.uid == resume_id){
        $('#connect-btn').remove();
    }
  })

  $('#connect-btn').click(function(){
    if(user.uid != resume_id){

      userRef.child(user.uid).once('value', function(snap){
        var firstname = snap.val().first_name;
        var lastname = snap.val().last_name;

        userRef.child(resume_id).child('notifications').push({
          type: 'friend-request',
          from: user.uid,
          firstname: firstname,
          lastname: lastname
        })


      })




    $('#connect-btn').remove();
    alert("Request sent!")
    } else {
      alert("Cannot connect with self!")
    }
  })
}

})
